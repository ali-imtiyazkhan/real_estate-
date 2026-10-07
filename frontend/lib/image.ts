const MAX_UPLOAD_BYTES = 4.3 * 1024 * 1024;
const MAX_EDGE = 2560;
const QUALITIES = [0.85, 0.75, 0.65, 0.55, 0.45, 0.35];
const PASSTHROUGH_TYPES = new Set(["image/gif"]);

function formatSize(bytes: number): string {
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function passthrough(file: File): File {
  if (file.size > MAX_UPLOAD_BYTES) {
    throw new Error(
      `File is ${formatSize(file.size)}. Maximum upload size is 4.5 MB (this file type cannot be compressed).`
    );
  }
  return file;
}

function encodeTypes(type: string): string[] {
  if (type === "image/png") return ["image/png", "image/webp", "image/jpeg"];
  if (type === "image/jpeg" || type === "image/webp") return [type];
  return ["image/webp", "image/jpeg"];
}

function loadImage(file: File): Promise<ImageBitmap> {
  const options: ImageBitmapOptions = { imageOrientation: "from-image" };
  return createImageBitmap(file, options).catch(() => createImageBitmap(file));
}

function canvasToBlob(canvas: HTMLCanvasElement, type: string, quality: number): Promise<Blob | null> {
  return new Promise((resolve) => canvas.toBlob(resolve, type, quality));
}

function blobToType(blob: Blob, type: string, name: string): File {
  const dot = name.lastIndexOf(".");
  const base = dot > 0 ? name.slice(0, dot) : name;
  const ext = type === "image/jpeg" ? ".jpg" : type === "image/webp" ? ".webp" : ".png";
  return new File([blob], `${base}${ext}`, { type, lastModified: Date.now() });
}

export async function compressImage(file: File): Promise<File> {
  if (!file.type.startsWith("image/") || PASSTHROUGH_TYPES.has(file.type)) {
    return passthrough(file);
  }

  let source: ImageBitmap;
  try {
    source = await loadImage(file);
  } catch {
    return passthrough(file);
  }

  const width = source.width;
  const height = source.height;
  const scale = Math.min(1, MAX_EDGE / Math.max(width, height));

  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(width * scale));
  canvas.height = Math.max(1, Math.round(height * scale));
  const ctx = canvas.getContext("2d");
  if (!ctx) return file;
  ctx.drawImage(source, 0, 0, canvas.width, canvas.height);
  source.close();

  if (file.size <= MAX_UPLOAD_BYTES && scale === 1) return file;

  const types = encodeTypes(file.type);
  let smallest: Blob | null = null;

  for (const type of types) {
    for (const quality of QUALITIES) {
      const blob = await canvasToBlob(canvas, type, quality);
      if (!blob || blob.size === 0) break;
      if (!smallest || blob.size < smallest.size) smallest = blob;
      if (blob.size <= MAX_UPLOAD_BYTES) {
        return blobToType(blob, type, file.name);
      }
    }
  }

  if (smallest && smallest.size <= MAX_UPLOAD_BYTES) {
    return blobToType(smallest, smallest.type || "image/jpeg", file.name);
  }

  throw new Error(
    `Image is too large even after compression (${formatSize(smallest?.size ?? file.size)}). Please pick a smaller image (max 4.5 MB).`
  );
}
