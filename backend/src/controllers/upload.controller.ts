import type { Request } from "express";
import { extname } from "node:path";
import { uploadImage } from "../lib/cloudflare";

const MIME_EXTENSIONS: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/gif": ".gif",
  "image/avif": ".avif",
};

export async function uploadImageFile(req: Request) {
  const file = req.file;

  if (!file) {
    return { status: 400 as const, body: { error: { message: "No file provided" } } };
  }

  const extension = (MIME_EXTENSIONS[file.mimetype] ?? extname(file.originalname).toLowerCase()) || ".bin";

  const { url, key } = await uploadImage({
    buffer: file.buffer,
    contentType: file.mimetype,
    extension,
  });

  const publicUrl = url.startsWith("/") ? `${req.protocol}://${req.get("host")}${url}` : url;

  return { status: 201 as const, body: { data: { url: publicUrl, key } } };
}
