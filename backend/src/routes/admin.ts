import { Router } from "express";
import multer from "multer";
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
import { uploadImageFile } from "../controllers/upload.controller";

const ALLOWED_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/avif",
]);

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024, files: 1 },
  fileFilter: (_req, file, cb) => {
    if (!ALLOWED_MIME_TYPES.has(file.mimetype)) {
      cb(new Error("Unsupported file type. Allowed: jpg, png, webp, gif, avif"));
      return;
    }
    cb(null, true);
  },
});

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

router.post("/upload", upload.single("file"), async (req, res, next) => {
  try {
    const { status, body } = await uploadImageFile(req);
    res.status(status).json(body);
  } catch (err) {
    if (err instanceof multer.MulterError || (err instanceof Error && err.message.startsWith("Unsupported file type"))) {
      res.status(400).json({ error: { message: err.message } });
      return;
    }
    next(err);
  }
});

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
