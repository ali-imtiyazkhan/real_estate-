import { Router } from "express";
import { listFeatures } from "../controllers/feature.controller";

const router = Router();

router.get("/", async (_req, res, next) => {
  try {
    const { status, body } = await listFeatures();
    res.status(status).json(body);
  } catch (err) {
    next(err);
  }
});

export default router;
