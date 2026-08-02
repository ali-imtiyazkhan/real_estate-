import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { randomUUID } from "node:crypto";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { env } from "../config/env";

export const LOCAL_UPLOADS_DIR = join(import.meta.dir, "../../uploads");

let s3Client: S3Client | null = null;

function getS3Client(): S3Client | null {
  if (!env.R2_ACCOUNT_ID || !env.R2_ACCESS_KEY_ID || !env.R2_SECRET_ACCESS_KEY || !env.R2_BUCKET_NAME) {
    return null;
  }
  if (!s3Client) {
    s3Client = new S3Client({
      region: "auto",
      endpoint: `https://${env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: env.R2_ACCESS_KEY_ID,
        secretAccessKey: env.R2_SECRET_ACCESS_KEY,
      },
    });
  }
  return s3Client;
}

export function isR2Configured(): boolean {
  return Boolean(getS3Client() && env.R2_PUBLIC_URL);
}

export async function uploadImage(options: {
  buffer: Buffer;
  contentType: string;
  extension: string;
}): Promise<{ url: string; key: string }> {
  const key = `properties/${randomUUID()}${options.extension}`;
  const client = getS3Client();

  if (client) {
    await client.send(
      new PutObjectCommand({
        Bucket: env.R2_BUCKET_NAME,
        Key: key,
        Body: options.buffer,
        ContentType: options.contentType,
      })
    );
    if (env.R2_PUBLIC_URL) {
      return { url: `${env.R2_PUBLIC_URL}/${key}`, key };
    }
  }

  await mkdir(join(LOCAL_UPLOADS_DIR, "properties"), { recursive: true });
  await writeFile(join(LOCAL_UPLOADS_DIR, key), options.buffer);
  return { url: `/uploads/${key}`, key };
}
