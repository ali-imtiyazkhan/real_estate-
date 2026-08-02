import { Router } from "express";
import { getPropertyByIdOrSlug, listProperties } from "../controllers/property.controller";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const { status, body } = await listProperties(req.query);
    res.status(status).json(body);
  } catch (err) {
    next(err);
  }
});

router.get("/:idOrSlug", async (req, res, next) => {
  try {
    const { status, body } = await getPropertyByIdOrSlug(req.params.idOrSlug);
    res.status(status).json(body);
  } catch (err) {
    next(err);
  }
});

export default router;
