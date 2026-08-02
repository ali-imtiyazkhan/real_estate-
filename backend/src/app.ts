import cors from "cors";
import express from "express";
import { errorHandler, notFound } from "./middleware/error";
import propertiesRouter from "./routes/properties";
import featuresRouter from "./routes/features";
import inquiriesRouter from "./routes/inquiries";
import adminRouter from "./routes/admin";
import { LOCAL_UPLOADS_DIR } from "./lib/cloudflare";

export const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(LOCAL_UPLOADS_DIR));

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/properties", propertiesRouter);
app.use("/api/features", featuresRouter);
app.use("/api/inquiries", inquiriesRouter);
app.use("/api/admin", adminRouter);

app.use(notFound);
app.use(errorHandler);
