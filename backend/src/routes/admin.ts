import { Router } from "express";
import { requireAdmin } from "../middleware/auth";
import {
  adminLogin,
  createProperty,
  deleteInquiry,
  deleteProperty,
  getInquiryById,
  listInquiries,
  updateProperty,
} from "../controllers/admin.controller";

const router = Router();

router.post("/login", async (req, res, next) => {
  try {
    const { status, body } = await adminLogin(req.body);
    res.status(status).json(body);
  } catch (err) {
    next(err);
  }
});

router.use(requireAdmin);

router.get("/inquiries", async (req, res, next) => {
  try {
    const { status, body } = await listInquiries(req.query);
    res.status(status).json(body);
  } catch (err) {
    next(err);
  }
});

router.get("/inquiries/:id", async (req, res, next) => {
  try {
    const { status, body } = await getInquiryById(req.params.id);
    res.status(status).json(body);
  } catch (err) {
    next(err);
  }
});

router.delete("/inquiries/:id", async (req, res, next) => {
  try {
    const { status, body } = await deleteInquiry(req.params.id);
    res.status(status);
    if (body) res.json(body);
    else res.end();
  } catch (err) {
    next(err);
  }
});

router.post("/properties", async (req, res, next) => {
  try {
    const { status, body } = await createProperty(req.body);
    res.status(status).json(body);
  } catch (err) {
    next(err);
  }
});

router.put("/properties/:id", async (req, res, next) => {
  try {
    const { status, body } = await updateProperty(req.params.id, req.body);
    res.status(status).json(body);
  } catch (err) {
    next(err);
  }
});

router.delete("/properties/:id", async (req, res, next) => {
  try {
    const { status, body } = await deleteProperty(req.params.id);
    res.status(status);
    if (body) res.json(body);
    else res.end();
  } catch (err) {
    next(err);
  }
});

export default router;
