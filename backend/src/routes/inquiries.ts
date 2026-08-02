import { Router } from "express";
import { createInquiry } from "../controllers/inquiry.controller";

const router = Router();

router.post("/", async (req, res, next) => {
  try {
    const { status, body } = await createInquiry(req.body);
    res.status(status).json(body);
  } catch (err) {
    next(err);
  }
});

export default router;
