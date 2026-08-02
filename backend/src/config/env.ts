import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().min(1).default(3001),
  DATABASE_URL: z.string().url(),
  SUPABASE_S3_ENDPOINT: z.string().optional().default(""),
  SUPABASE_S3_REGION: z.string().optional().default("us-east-1"),
  SUPABASE_S3_ACCESS_KEY_ID: z.string().optional().default(""),
  SUPABASE_S3_SECRET_ACCESS_KEY: z.string().optional().default(""),
  SUPABASE_BUCKET: z.string().optional().default(""),
  SUPABASE_PUBLIC_URL: z.string().optional().default(""),
  R2_ACCOUNT_ID: z.string().optional().default(""),
  R2_ACCESS_KEY_ID: z.string().optional().default(""),
  R2_SECRET_ACCESS_KEY: z.string().optional().default(""),
  R2_BUCKET_NAME: z.string().optional().default(""),
  R2_PUBLIC_URL: z.string().optional().default(""),
  CF_IMAGES_ACCOUNT_ID: z.string().optional().default(""),
  CF_IMAGES_API_TOKEN: z.string().optional().default(""),
  ADMIN_PASSWORD: z.string().optional().default("admin123"),
  ADMIN_SECRET: z.string().optional().default("change-me-in-production"),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("Invalid environment variables:", parsed.error.issues);
  process.exit(1);
}

export const env = parsed.data;
