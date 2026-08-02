import type { NextFunction, Request, Response } from "express";
import { verifyAdminToken } from "../lib/auth";

export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    return res.status(401).json({ error: { message: "Unauthorized" } });
  }

  const token = header.slice("Bearer ".length);
  if (!verifyAdminToken(token)) {
    return res.status(401).json({ error: { message: "Invalid or expired token" } });
  }

  next();
}
