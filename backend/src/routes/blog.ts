import { Router } from "express";
import { getBlogPostById, listBlogPosts } from "../controllers/blog.controller";

const router = Router();

router.get("/", async (_req, res, next) => {
  try {
    const { status, body } = await listBlogPosts();
    res.status(status).json(body);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { status, body } = await getBlogPostById(req.params.id);
    res.status(status).json(body);
  } catch (err) {
    next(err);
  }
});

export default router;
