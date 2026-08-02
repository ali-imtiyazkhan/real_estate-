import cors from "cors";
import express from "express";
import { errorHandler, notFound } from "./middleware/error";
import propertiesRouter from "./routes/properties";
import blogRouter from "./routes/blog";
import featuresRouter from "./routes/features";
import inquiriesRouter from "./routes/inquiries";

export const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/properties", propertiesRouter);
app.use("/api/blog", blogRouter);
app.use("/api/features", featuresRouter);
app.use("/api/inquiries", inquiriesRouter);

app.use(notFound);
app.use(errorHandler);
