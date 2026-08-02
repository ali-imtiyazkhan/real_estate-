import type { Request } from "express";
import { extname } from "node:path";
import { uploadFile } from "../lib/cloudflare";

const MIME_EXTENSIONS: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/gif": ".gif",
  "image/avif": ".avif",
  "video/mp4": ".mp4",
  "video/webm": ".webm",
  "video/quicktime": ".mov",
  "video/ogg": ".ogv",
};

export async function uploadFileController(req: Request) {
  const file = req.file;

  if (!file) {
    return { status: 400 as const, body: { error: { message: "No file provided" } } };
  }

  const extension = (MIME_EXTENSIONS[file.mimetype] ?? extname(file.originalname).toLowerCase()) || ".bin";

  const { url, key } = await uploadFile({
    buffer: file.buffer,
    contentType: file.mimetype,
    extension,
  });

  const publicUrl = url.startsWith("/") ? `${req.protocol}://${req.get("host")}${url}` : url;

  return { status: 201 as const, body: { data: { url: publicUrl, key } } };
}
