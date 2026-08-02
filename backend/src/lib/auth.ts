import { createHmac, timingSafeEqual } from "node:crypto";
import { env } from "../config/env";

const TOKEN_TTL_MS = 24 * 60 * 60 * 1000;

function sign(payload: string): string {
  return createHmac("sha256", env.ADMIN_SECRET).update(payload).digest("hex");
}

export function createAdminToken(): string {
  const expiry = String(Date.now() + TOKEN_TTL_MS);
  const payload = `${expiry}.${sign(expiry)}`;
  return Buffer.from(payload).toString("base64url");
}

export function verifyAdminToken(token: string): boolean {
  try {
    const decoded = Buffer.from(token, "base64url").toString();
    const [expiry, sig] = decoded.split(".");
    if (!expiry || !sig) return false;

    const expected = sign(expiry);
    const a = Buffer.from(sig);
    const b = Buffer.from(expected);
    if (a.length !== b.length || !timingSafeEqual(a, b)) return false;

    return Number(expiry) > Date.now();
  } catch {
    return false;
  }
}

export function isAdminPassword(password: string): boolean {
  if (!env.ADMIN_PASSWORD) return false;
  const a = Buffer.from(password);
  const b = Buffer.from(env.ADMIN_PASSWORD);
  return a.length === b.length && timingSafeEqual(a, b);
}
