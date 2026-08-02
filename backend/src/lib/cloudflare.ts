import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { randomUUID } from "node:crypto";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { env } from "../config/env";

export const LOCAL_UPLOADS_DIR = join(import.meta.dir, "../../uploads");

let s3Client: S3Client | null = null;
let s3Bucket: string | null = null;
let s3PublicBase: string | null = null;

function getS3Client(): { client: S3Client; bucket: string; publicBase: string | null } | null {
  if (
    env.SUPABASE_S3_ENDPOINT &&
    env.SUPABASE_S3_ACCESS_KEY_ID &&
    env.SUPABASE_S3_SECRET_ACCESS_KEY &&
    env.SUPABASE_BUCKET
  ) {
    if (!s3Client) {
      s3Client = new S3Client({
        region: env.SUPABASE_S3_REGION,
        endpoint: env.SUPABASE_S3_ENDPOINT,
        forcePathStyle: true,
        credentials: {
          accessKeyId: env.SUPABASE_S3_ACCESS_KEY_ID,
          secretAccessKey: env.SUPABASE_S3_SECRET_ACCESS_KEY,
        },
      });
    }
    const publicBase =
      env.SUPABASE_PUBLIC_URL ||
      `${env.SUPABASE_S3_ENDPOINT.replace(/\/s3$/, "/object/public")}/${env.SUPABASE_BUCKET}`;
    return { client: s3Client, bucket: env.SUPABASE_BUCKET, publicBase };
  }

  if (env.R2_ACCOUNT_ID && env.R2_ACCESS_KEY_ID && env.R2_SECRET_ACCESS_KEY && env.R2_BUCKET_NAME) {
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
    return {
      client: s3Client,
      bucket: env.R2_BUCKET_NAME,
      publicBase: env.R2_PUBLIC_URL || null,
    };
  }

  return null;
}

export function isS3Configured(): boolean {
  return Boolean(getS3Client());
}

export async function uploadFile(options: {
  buffer: Buffer;
  contentType: string;
  extension: string;
}): Promise<{ url: string; key: string }> {
  const key = `properties/${randomUUID()}${options.extension}`;
  const s3 = getS3Client();

  if (s3) {
    await s3.client.send(
      new PutObjectCommand({
        Bucket: s3.bucket,
        Key: key,
        Body: options.buffer,
        ContentType: options.contentType,
      })
    );
    if (s3.publicBase) {
      return { url: `${s3.publicBase}/${key}`, key };
    }
  }

  await mkdir(join(LOCAL_UPLOADS_DIR, "properties"), { recursive: true });
  await writeFile(join(LOCAL_UPLOADS_DIR, key), options.buffer);
  return { url: `/uploads/${key}`, key };
}
