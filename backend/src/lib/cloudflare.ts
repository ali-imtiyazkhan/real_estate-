import { env } from "../config/env";

export function isR2Configured(): boolean {
  return Boolean(
    env.R2_ACCOUNT_ID &&
      env.R2_ACCESS_KEY_ID &&
      env.R2_SECRET_ACCESS_KEY &&
      env.R2_BUCKET_NAME
  );
}

export function r2ObjectUrl(key: string): string | null {
  if (!env.R2_PUBLIC_URL || !env.R2_BUCKET_NAME) return null;
  return `${env.R2_PUBLIC_URL}/${key}`;
}

export function cloudflareImageUrl(imageId: string, variant = "public"): string | null {
  if (!env.CF_IMAGES_ACCOUNT_ID) return null;
  return `https://imagedelivery.net/${env.CF_IMAGES_ACCOUNT_ID}/${imageId}/${variant}`;
}
