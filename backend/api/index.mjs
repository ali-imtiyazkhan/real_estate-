// src/app.ts
import cors from "cors";
import express from "express";

// src/middleware/error.ts
function notFound(_req, res) {
  res.status(404).json({ error: { message: "Not found" } });
}
function errorHandler(err, _req, res, _next) {
  console.error(err);
  res.status(500).json({ error: { message: "Internal server error" } });
}

// src/routes/properties.ts
import { Router } from "express";

// src/db.ts
import { PrismaNeon } from "@prisma/adapter-neon";

// src/generated/prisma/client.ts
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import "@prisma/client/runtime/client";

// src/generated/prisma/internal/class.ts
import * as runtime from "@prisma/client/runtime/client";
var config = {
  "previewFeatures": [],
  "clientVersion": "7.9.1",
  "engineVersion": "e922089b7d7502aff4249d5da3420f6fa55fc6ad",
  "activeProvider": "postgresql",
  "inlineSchema": 'generator client {\n  provider = "prisma-client"\n  output   = "../src/generated/prisma"\n  runtime  = "bun"\n}\n\ndatasource db {\n  provider = "postgresql"\n}\n\nenum ListingType {\n  SALE\n  RENT\n  COMING_SOON\n}\n\nenum InquiryKind {\n  CONTACT\n  SELL\n  AGENT\n}\n\nmodel Property {\n  id          String      @id @default(cuid())\n  slug        String      @unique\n  title       String\n  projectName String\n  address     String\n  location    String\n  sqft        String\n  floor       String\n  rooms       String\n  price       String\n  image       String\n  gallery     String[]\n  map         String?\n  brochure    String?\n  listingType ListingType @default(SALE)\n  createdAt   DateTime    @default(now())\n  updatedAt   DateTime    @updatedAt\n\n  inquiries Inquiry[]\n}\n\nmodel Feature {\n  id          String   @id @default(cuid())\n  title       String\n  description String\n  createdAt   DateTime @default(now())\n}\n\nmodel Inquiry {\n  id          String      @id @default(cuid())\n  kind        InquiryKind\n  firstName   String?\n  lastName    String?\n  email       String?\n  phone       String?\n  country     String?\n  state       String?\n  city        String?\n  date        String?\n  concernType String?\n  office      String?\n  description String?\n  totalCost   String?\n  propertyId  String?\n  property    Property?   @relation(fields: [propertyId], references: [id], onDelete: SetNull)\n  createdAt   DateTime    @default(now())\n\n  @@index([kind])\n  @@index([propertyId])\n}\n',
  "runtimeDataModel": {
    "models": {},
    "enums": {},
    "types": {}
  },
  "parameterizationSchema": {
    "strings": [],
    "graph": ""
  }
};
config.runtimeDataModel = JSON.parse('{"models":{"Property":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"slug","kind":"scalar","type":"String"},{"name":"title","kind":"scalar","type":"String"},{"name":"projectName","kind":"scalar","type":"String"},{"name":"address","kind":"scalar","type":"String"},{"name":"location","kind":"scalar","type":"String"},{"name":"sqft","kind":"scalar","type":"String"},{"name":"floor","kind":"scalar","type":"String"},{"name":"rooms","kind":"scalar","type":"String"},{"name":"price","kind":"scalar","type":"String"},{"name":"image","kind":"scalar","type":"String"},{"name":"gallery","kind":"scalar","type":"String"},{"name":"map","kind":"scalar","type":"String"},{"name":"brochure","kind":"scalar","type":"String"},{"name":"listingType","kind":"enum","type":"ListingType"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"inquiries","kind":"object","type":"Inquiry","relationName":"InquiryToProperty"}],"dbName":null},"Feature":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"title","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"}],"dbName":null},"Inquiry":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"kind","kind":"enum","type":"InquiryKind"},{"name":"firstName","kind":"scalar","type":"String"},{"name":"lastName","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"phone","kind":"scalar","type":"String"},{"name":"country","kind":"scalar","type":"String"},{"name":"state","kind":"scalar","type":"String"},{"name":"city","kind":"scalar","type":"String"},{"name":"date","kind":"scalar","type":"String"},{"name":"concernType","kind":"scalar","type":"String"},{"name":"office","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"totalCost","kind":"scalar","type":"String"},{"name":"propertyId","kind":"scalar","type":"String"},{"name":"property","kind":"object","type":"Property","relationName":"InquiryToProperty"},{"name":"createdAt","kind":"scalar","type":"DateTime"}],"dbName":null}},"enums":{},"types":{}}');
config.parameterizationSchema = {
  strings: JSON.parse('["where","orderBy","cursor","property","inquiries","_count","Property.findUnique","Property.findUniqueOrThrow","Property.findFirst","Property.findFirstOrThrow","Property.findMany","data","Property.createOne","Property.createMany","Property.createManyAndReturn","Property.updateOne","Property.updateMany","Property.updateManyAndReturn","create","update","Property.upsertOne","Property.deleteOne","Property.deleteMany","having","_min","_max","Property.groupBy","Property.aggregate","Feature.findUnique","Feature.findUniqueOrThrow","Feature.findFirst","Feature.findFirstOrThrow","Feature.findMany","Feature.createOne","Feature.createMany","Feature.createManyAndReturn","Feature.updateOne","Feature.updateMany","Feature.updateManyAndReturn","Feature.upsertOne","Feature.deleteOne","Feature.deleteMany","Feature.groupBy","Feature.aggregate","Inquiry.findUnique","Inquiry.findUniqueOrThrow","Inquiry.findFirst","Inquiry.findFirstOrThrow","Inquiry.findMany","Inquiry.createOne","Inquiry.createMany","Inquiry.createManyAndReturn","Inquiry.updateOne","Inquiry.updateMany","Inquiry.updateManyAndReturn","Inquiry.upsertOne","Inquiry.deleteOne","Inquiry.deleteMany","Inquiry.groupBy","Inquiry.aggregate","AND","OR","NOT","id","InquiryKind","kind","firstName","lastName","email","phone","country","state","city","date","concernType","office","description","totalCost","propertyId","createdAt","equals","in","notIn","lt","lte","gt","gte","not","contains","startsWith","endsWith","title","slug","projectName","address","location","sqft","floor","rooms","price","image","gallery","map","brochure","ListingType","listingType","updatedAt","has","hasEvery","hasSome","every","some","none","is","isNot","connectOrCreate","upsert","createMany","set","disconnect","delete","connect","updateMany","deleteMany","push"]'),
  graph: "mAEaMBUEAABsACA8AABpADA9AAAHABA-AABpADA_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_AQAAAAFMAQAAAAFPQAAAAAFbAQAAAAEBCwAAKgAwAQsAACoAMAQ_AQB0ACFMAQB0ACFPQAB3ACFbAQB0ACECAAAAIAAgCwAALQAgBD8BAHQAIUwBAHQAIU9AAHcAIVsBAHQAIQIAAAAjACALAAAvACACAAAAIwAgCwAALwAgAwAAACAAIBIAACgAIBMAAC0AIAEAAAAgACABAAAAIwAgAwUAAHoAIBgAAHwAIBkAAHsAIAc8AABgADA9AAA2ABA-AABgADA_AQBSACFMAQBSACFPQABVACFbAQBSACEDAAAAIwAgAQAANQAwFwAANgAgAwAAACMAIAEAACQAMAIAACAAIAEAAAAFACABAAAABQAgAwAAAAMAIAEAAAQAMAIAAAUAIAMAAAADACABAAAEADACAAAFACADAAAAAwAgAQAABAAwAgAABQAgEQMAAHkAID8BAAAAAUEAAABBAkIBAAAAAUMBAAAAAUQBAAAAAUUBAAAAAUYBAAAAAUcBAAAAAUgBAAAAAUkBAAAAAUoBAAAAAUsBAAAAAUwBAAAAAU0BAAAAAU4BAAAAAU9AAAAAAQELAAA-ACAQPwEAAAABQQAAAEECQgEAAAABQwEAAAABRAEAAAABRQEAAAABRgEAAAABRwEAAAABSAEAAAABSQEAAAABSgEAAAABSwEAAAABTAEAAAABTQEAAAABTgEAAAABT0AAAAABAQsAAEAAMAELAABAADABAAAABwAgEQMAAHgAID8BAHQAIUEAAHVBIkIBAHYAIUMBAHYAIUQBAHYAIUUBAHYAIUYBAHYAIUcBAHYAIUgBAHYAIUkBAHYAIUoBAHYAIUsBAHYAIUwBAHYAIU0BAHYAIU4BAHYAIU9AAHcAIQIAAAAFACALAABEACAQPwEAdAAhQQAAdUEiQgEAdgAhQwEAdgAhRAEAdgAhRQEAdgAhRgEAdgAhRwEAdgAhSAEAdgAhSQEAdgAhSgEAdgAhSwEAdgAhTAEAdgAhTQEAdgAhTgEAdgAhT0AAdwAhAgAAAAMAIAsAAEYAIAIAAAADACALAABGACABAAAABwAgAwAAAAUAIBIAAD4AIBMAAEQAIAEAAAAFACABAAAAAwAgEAUAAHEAIBgAAHMAIBkAAHIAIEIAAHAAIEMAAHAAIEQAAHAAIEUAAHAAIEYAAHAAIEcAAHAAIEgAAHAAIEkAAHAAIEoAAHAAIEsAAHAAIEwAAHAAIE0AAHAAIE4AAHAAIBM8AABRADA9AABOABA-AABRADA_AQBSACFBAABTQSJCAQBUACFDAQBUACFEAQBUACFFAQBUACFGAQBUACFHAQBUACFIAQBUACFJAQBUACFKAQBUACFLAQBUACFMAQBUACFNAQBUACFOAQBUACFPQABVACEDAAAAAwAgAQAATQAwFwAATgAgAwAAAAMAIAEAAAQAMAIAAAUAIBM8AABRADA9AABOABA-AABRADA_AQBSACFBAABTQSJCAQBUACFDAQBUACFEAQBUACFFAQBUACFGAQBUACFHAQBUACFIAQBUACFJAQBUACFKAQBUACFLAQBUACFMAQBUACFNAQBUACFOAQBUACFPQABVACEOBQAAVwAgGAAAXwAgGQAAXwAgUAEAAAABUQEAAAAEUgEAAAAEUwEAAAABVAEAAAABVQEAAAABVgEAAAABVwEAXgAhWAEAAAABWQEAAAABWgEAAAABBwUAAFcAIBgAAF0AIBkAAF0AIFAAAABBAlEAAABBCFIAAABBCFcAAFxBIg4FAABaACAYAABbACAZAABbACBQAQAAAAFRAQAAAAVSAQAAAAVTAQAAAAFUAQAAAAFVAQAAAAFWAQAAAAFXAQBZACFYAQAAAAFZAQAAAAFaAQAAAAELBQAAVwAgGAAAWAAgGQAAWAAgUEAAAAABUUAAAAAEUkAAAAAEU0AAAAABVEAAAAABVUAAAAABVkAAAAABV0AAVgAhCwUAAFcAIBgAAFgAIBkAAFgAIFBAAAAAAVFAAAAABFJAAAAABFNAAAAAAVRAAAAAAVVAAAAAAVZAAAAAAVdAAFYAIQhQAgAAAAFRAgAAAARSAgAAAARTAgAAAAFUAgAAAAFVAgAAAAFWAgAAAAFXAgBXACEIUEAAAAABUUAAAAAEUkAAAAAEU0AAAAABVEAAAAABVUAAAAABVkAAAAABV0AAWAAhDgUAAFoAIBgAAFsAIBkAAFsAIFABAAAAAVEBAAAABVIBAAAABVMBAAAAAVQBAAAAAVUBAAAAAVYBAAAAAVcBAFkAIVgBAAAAAVkBAAAAAVoBAAAAAQhQAgAAAAFRAgAAAAVSAgAAAAVTAgAAAAFUAgAAAAFVAgAAAAFWAgAAAAFXAgBaACELUAEAAAABUQEAAAAFUgEAAAAFUwEAAAABVAEAAAABVQEAAAABVgEAAAABVwEAWwAhWAEAAAABWQEAAAABWgEAAAABBwUAAFcAIBgAAF0AIBkAAF0AIFAAAABBAlEAAABBCFIAAABBCFcAAFxBIgRQAAAAQQJRAAAAQQhSAAAAQQhXAABdQSIOBQAAVwAgGAAAXwAgGQAAXwAgUAEAAAABUQEAAAAEUgEAAAAEUwEAAAABVAEAAAABVQEAAAABVgEAAAABVwEAXgAhWAEAAAABWQEAAAABWgEAAAABC1ABAAAAAVEBAAAABFIBAAAABFMBAAAAAVQBAAAAAVUBAAAAAVYBAAAAAVcBAF8AIVgBAAAAAVkBAAAAAVoBAAAAAQc8AABgADA9AAA2ABA-AABgADA_AQBSACFMAQBSACFPQABVACFbAQBSACEHPAAAYQAwPQAAIwAQPgAAYQAwPwEAYgAhTAEAYgAhT0AAYwAhWwEAYgAhC1ABAAAAAVEBAAAABFIBAAAABFMBAAAAAVQBAAAAAVUBAAAAAVYBAAAAAVcBAF8AIVgBAAAAAVkBAAAAAVoBAAAAAQhQQAAAAAFRQAAAAARSQAAAAARTQAAAAAFUQAAAAAFVQAAAAAFWQAAAAAFXQABYACEUPAAAZAAwPQAAHQAQPgAAZAAwPwEAUgAhT0AAVQAhWwEAUgAhXAEAUgAhXQEAUgAhXgEAUgAhXwEAUgAhYAEAUgAhYQEAUgAhYgEAUgAhYwEAUgAhZAEAUgAhZQAAZQAgZgEAVAAhZwEAVAAhaQAAZmkiakAAVQAhBFABAAAABWsBAAAAAWwBAAAABG0BAAAABAcFAABXACAYAABoACAZAABoACBQAAAAaQJRAAAAaQhSAAAAaQhXAABnaSIHBQAAVwAgGAAAaAAgGQAAaAAgUAAAAGkCUQAAAGkIUgAAAGkIVwAAZ2kiBFAAAABpAlEAAABpCFIAAABpCFcAAGhpIhUEAABsACA8AABpADA9AAAHABA-AABpADA_AQBiACFPQABjACFbAQBiACFcAQBiACFdAQBiACFeAQBiACFfAQBiACFgAQBiACFhAQBiACFiAQBiACFjAQBiACFkAQBiACFlAABlACBmAQBqACFnAQBqACFpAABraSJqQABjACELUAEAAAABUQEAAAAFUgEAAAAFUwEAAAABVAEAAAABVQEAAAABVgEAAAABVwEAWwAhWAEAAAABWQEAAAABWgEAAAABBFAAAABpAlEAAABpCFIAAABpCFcAAGhpIgNuAAADACBvAAADACBwAAADACAUAwAAbwAgPAAAbQAwPQAAAwAQPgAAbQAwPwEAYgAhQQAAbkEiQgEAagAhQwEAagAhRAEAagAhRQEAagAhRgEAagAhRwEAagAhSAEAagAhSQEAagAhSgEAagAhSwEAagAhTAEAagAhTQEAagAhTgEAagAhT0AAYwAhBFAAAABBAlEAAABBCFIAAABBCFcAAF1BIhcEAABsACA8AABpADA9AAAHABA-AABpADA_AQBiACFPQABjACFbAQBiACFcAQBiACFdAQBiACFeAQBiACFfAQBiACFgAQBiACFhAQBiACFiAQBiACFjAQBiACFkAQBiACFlAABlACBmAQBqACFnAQBqACFpAABraSJqQABjACFxAAAHACByAAAHACAAAAAAAXYBAAAAAQF2AAAAQQIBdgEAAAABAXZAAAAAAQcSAACUAQAgEwAAlwEAIHMAAJUBACB0AACWAQAgdwAABwAgeAAABwAgeQAAAQAgAxIAAJQBACBzAACVAQAgeQAAAQAgAAAAAAAAAnYBAAAABHwBAAAABQF2AAAAaQILEgAAgwEAMBMAAIgBADBzAACEAQAwdAAAhQEAMHUAAIYBACB2AACHAQAwdwAAhwEAMHgAAIcBADB5AACHAQAwegAAiQEAMHsAAIoBADAPPwEAAAABQQAAAEECQgEAAAABQwEAAAABRAEAAAABRQEAAAABRgEAAAABRwEAAAABSAEAAAABSQEAAAABSgEAAAABSwEAAAABTAEAAAABTQEAAAABT0AAAAABAgAAAAUAIBIAAI4BACADAAAABQAgEgAAjgEAIBMAAI0BACABCwAAkwEAMBQDAABvACA8AABtADA9AAADABA-AABtADA_AQAAAAFBAABuQSJCAQBqACFDAQBqACFEAQBqACFFAQBqACFGAQBqACFHAQBqACFIAQBqACFJAQBqACFKAQBqACFLAQBqACFMAQBqACFNAQBqACFOAQBqACFPQABjACECAAAABQAgCwAAjQEAIAIAAACLAQAgCwAAjAEAIBM8AACKAQAwPQAAiwEAED4AAIoBADA_AQBiACFBAABuQSJCAQBqACFDAQBqACFEAQBqACFFAQBqACFGAQBqACFHAQBqACFIAQBqACFJAQBqACFKAQBqACFLAQBqACFMAQBqACFNAQBqACFOAQBqACFPQABjACETPAAAigEAMD0AAIsBABA-AACKAQAwPwEAYgAhQQAAbkEiQgEAagAhQwEAagAhRAEAagAhRQEAagAhRgEAagAhRwEAagAhSAEAagAhSQEAagAhSgEAagAhSwEAagAhTAEAagAhTQEAagAhTgEAagAhT0AAYwAhDz8BAHQAIUEAAHVBIkIBAHYAIUMBAHYAIUQBAHYAIUUBAHYAIUYBAHYAIUcBAHYAIUgBAHYAIUkBAHYAIUoBAHYAIUsBAHYAIUwBAHYAIU0BAHYAIU9AAHcAIQ8_AQB0ACFBAAB1QSJCAQB2ACFDAQB2ACFEAQB2ACFFAQB2ACFGAQB2ACFHAQB2ACFIAQB2ACFJAQB2ACFKAQB2ACFLAQB2ACFMAQB2ACFNAQB2ACFPQAB3ACEPPwEAAAABQQAAAEECQgEAAAABQwEAAAABRAEAAAABRQEAAAABRgEAAAABRwEAAAABSAEAAAABSQEAAAABSgEAAAABSwEAAAABTAEAAAABTQEAAAABT0AAAAABAXYBAAAABAQSAACDAQAwcwAAhAEAMHUAAIYBACB5AACHAQAwAAMEAACRAQAgZgAAcAAgZwAAcAAgDz8BAAAAAUEAAABBAkIBAAAAAUMBAAAAAUQBAAAAAUUBAAAAAUYBAAAAAUcBAAAAAUgBAAAAAUkBAAAAAUoBAAAAAUsBAAAAAUwBAAAAAU0BAAAAAU9AAAAAARE_AQAAAAFPQAAAAAFbAQAAAAFcAQAAAAFdAQAAAAFeAQAAAAFfAQAAAAFgAQAAAAFhAQAAAAFiAQAAAAFjAQAAAAFkAQAAAAFlAACPAQAgZgEAAAABZwEAAAABaQAAAGkCakAAAAABAgAAAAEAIBIAAJQBACADAAAABwAgEgAAlAEAIBMAAJgBACATAAAABwAgCwAAmAEAID8BAHQAIU9AAHcAIVsBAHQAIVwBAHQAIV0BAHQAIV4BAHQAIV8BAHQAIWABAHQAIWEBAHQAIWIBAHQAIWMBAHQAIWQBAHQAIWUAAIABACBmAQB2ACFnAQB2ACFpAACBAWkiakAAdwAhET8BAHQAIU9AAHcAIVsBAHQAIVwBAHQAIV0BAHQAIV4BAHQAIV8BAHQAIWABAHQAIWEBAHQAIWIBAHQAIWMBAHQAIWQBAHQAIWUAAIABACBmAQB2ACFnAQB2ACFpAACBAWkiakAAdwAhAgQGAgUAAwEDCAEBBAkAAAAAAwUACBgACRkACgAAAAMFAAgYAAkZAAoAAAADBQAQGAARGQASAAAAAwUAEBgAERkAEgEDQwEBA0kBAwUAFxgAGBkAGQAAAAMFABcYABgZABkGAgEHCgEIDAEJDQEKDgEMEAENEgQOEwUPFQEQFwQRGAYUGQEVGgEWGwQaHgcbHwscIQwdIgweJQwfJgwgJwwhKQwiKwQjLA0kLgwlMAQmMQ4nMgwoMwwpNAQqNw8rOBMsOQItOgIuOwIvPAIwPQIxPwIyQQQzQhQ0RQI1RwQ2SBU3SgI4SwI5TAQ6TxY7UBo"
};
async function decodeBase64AsWasm(wasmBase64) {
  const { Buffer: Buffer2 } = await import("node:buffer");
  const wasmArray = Buffer2.from(wasmBase64, "base64");
  return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
  getRuntime: async () => await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs"),
  getQueryCompilerWasmModule: async () => {
    const { wasm } = await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs");
    return await decodeBase64AsWasm(wasm);
  },
  importName: "./query_compiler_fast_bg.js"
};
function getPrismaClientClass() {
  return runtime.getPrismaClient(config);
}

// src/generated/prisma/internal/prismaNamespace.ts
import * as runtime2 from "@prisma/client/runtime/client";
var getExtensionContext = runtime2.Extensions.getExtensionContext;
var NullTypes2 = {
  DbNull: runtime2.NullTypes.DbNull,
  JsonNull: runtime2.NullTypes.JsonNull,
  AnyNull: runtime2.NullTypes.AnyNull
};
var TransactionIsolationLevel = runtime2.makeStrictEnum({
  ReadUncommitted: "ReadUncommitted",
  ReadCommitted: "ReadCommitted",
  RepeatableRead: "RepeatableRead",
  Serializable: "Serializable"
});
var defineExtension = runtime2.Extensions.defineExtension;

// src/generated/prisma/client.ts
globalThis["__dirname"] = path.dirname(fileURLToPath(import.meta.url));
var PrismaClient = getPrismaClientClass();

// src/db.ts
var adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL });
var prisma = new PrismaClient({ adapter });

// src/validation/schemas.ts
import { z } from "zod";
var listPropertiesQuery = z.object({
  type: z.enum(["sale", "rent", "coming-soon"]).optional(),
  q: z.string().trim().max(200).optional(),
  limit: z.coerce.number().int().min(1).max(50).default(12),
  offset: z.coerce.number().int().min(0).default(0)
});
var createInquirySchema = z.object({
  kind: z.enum(["CONTACT", "SELL", "AGENT"]),
  firstName: z.string().trim().max(100).optional(),
  lastName: z.string().trim().max(100).optional(),
  name: z.string().trim().max(200).optional(),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(50).optional(),
  country: z.string().trim().max(100).optional(),
  state: z.string().trim().max(100).optional(),
  city: z.string().trim().max(100).optional(),
  date: z.string().trim().max(50).optional(),
  concernType: z.string().trim().max(100).optional(),
  office: z.string().trim().max(100).optional(),
  description: z.string().trim().max(5e3),
  totalCost: z.string().trim().max(100).optional(),
  propertyId: z.string().trim().max(50).optional()
}).superRefine((data, ctx) => {
  const requireField = (path2, message) => {
    ctx.addIssue({ code: "custom", path: [path2], message });
  };
  if (data.kind === "AGENT" && !data.name && !data.firstName) {
    requireField("name", "Name is required");
  }
  if (data.kind !== "AGENT" && !data.firstName) {
    requireField("firstName", "First name is required");
  }
  if (data.kind !== "AGENT" && !data.lastName) {
    requireField("lastName", "Last name is required");
  }
  if (data.kind === "AGENT" && !data.propertyId) {
    requireField("propertyId", "Property is required");
  }
  if (data.kind === "SELL" && !data.totalCost) {
    requireField("totalCost", "Total cost is required");
  }
});
var adminLoginSchema = z.object({
  password: z.string().min(1).max(200)
});
var listInquiriesQuery = z.object({
  kind: z.enum(["CONTACT", "SELL", "AGENT"]).optional(),
  limit: z.coerce.number().int().min(1).max(100).default(50),
  offset: z.coerce.number().int().min(0).default(0)
});
var propertyUpsertSchema = z.object({
  slug: z.string().trim().min(1).max(200),
  title: z.string().trim().min(1).max(300),
  projectName: z.string().trim().min(1).max(300),
  address: z.string().trim().min(1).max(300),
  location: z.string().trim().min(1).max(200),
  sqft: z.string().trim().min(1).max(50),
  floor: z.string().trim().min(1).max(50),
  rooms: z.string().trim().min(1).max(50),
  price: z.string().trim().min(1).max(100),
  image: z.string().trim().min(1).max(1e3),
  gallery: z.array(z.string().trim().min(1).max(1e3)).max(20).default([]),
  map: z.string().trim().max(1e3).nullable().optional(),
  brochure: z.string().trim().max(1e3).nullable().optional(),
  listingType: z.enum(["SALE", "RENT", "COMING_SOON"])
});

// src/controllers/property.controller.ts
async function listProperties(query) {
  const parsed2 = listPropertiesQuery.safeParse(query);
  if (!parsed2.success) {
    return {
      status: 400,
      body: { error: { message: "Invalid query", issues: parsed2.error.issues } }
    };
  }
  const { type, q, limit, offset } = parsed2.data;
  const where = {
    ...type ? {
      listingType: type === "sale" ? "SALE" : type === "rent" ? "RENT" : "COMING_SOON"
    } : {},
    ...q ? {
      OR: [
        { projectName: { contains: q, mode: "insensitive" } },
        { address: { contains: q, mode: "insensitive" } },
        { location: { contains: q, mode: "insensitive" } },
        { price: { contains: q, mode: "insensitive" } }
      ]
    } : {}
  };
  const [data, total] = await Promise.all([
    prisma.property.findMany({
      where,
      orderBy: { createdAt: "asc" },
      skip: offset,
      take: limit
    }),
    prisma.property.count({ where })
  ]);
  return { status: 200, body: { data, total, limit, offset } };
}
async function getPropertyByIdOrSlug(idOrSlug) {
  const prop = await prisma.property.findFirst({
    where: { OR: [{ id: idOrSlug }, { slug: idOrSlug }] }
  });
  if (!prop) {
    return { status: 404, body: { error: { message: "Property not found" } } };
  }
  return { status: 200, body: { data: prop } };
}

// src/routes/properties.ts
var router = Router();
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
var properties_default = router;

// src/routes/features.ts
import { Router as Router2 } from "express";

// src/controllers/feature.controller.ts
async function listFeatures() {
  const features = await prisma.feature.findMany({
    orderBy: { createdAt: "asc" }
  });
  return { status: 200, body: { data: features } };
}

// src/routes/features.ts
var router2 = Router2();
router2.get("/", async (_req, res, next) => {
  try {
    const { status, body } = await listFeatures();
    res.status(status).json(body);
  } catch (err) {
    next(err);
  }
});
var features_default = router2;

// src/routes/inquiries.ts
import { Router as Router3 } from "express";

// src/controllers/inquiry.controller.ts
async function resolvePropertyId(idOrSlug) {
  const prop = await prisma.property.findFirst({
    where: { OR: [{ id: idOrSlug }, { slug: idOrSlug }] },
    select: { id: true }
  });
  return prop?.id ?? null;
}
async function createInquiry(body) {
  const parsed2 = createInquirySchema.safeParse(body);
  if (!parsed2.success) {
    return {
      status: 400,
      body: { error: { message: "Invalid input", issues: parsed2.error.issues } }
    };
  }
  const input = parsed2.data;
  if (input.propertyId) {
    const resolved = await resolvePropertyId(input.propertyId);
    if (!resolved) {
      return {
        status: 400,
        body: {
          error: {
            message: "Invalid input",
            issues: [{ path: ["propertyId"], message: "Property does not exist" }]
          }
        }
      };
    }
    input.propertyId = resolved;
  }
  const inquiry = await prisma.inquiry.create({
    data: {
      kind: input.kind,
      firstName: input.kind === "AGENT" && input.name ? input.name : input.firstName ?? null,
      lastName: input.lastName ?? null,
      email: input.email,
      phone: input.phone ?? null,
      country: input.country ?? null,
      state: input.state ?? null,
      city: input.city ?? null,
      date: input.date ?? null,
      concernType: input.concernType ?? null,
      office: input.office ?? null,
      description: input.description ?? null,
      totalCost: input.totalCost ?? null,
      propertyId: input.propertyId ?? null
    }
  });
  return { status: 201, body: { data: inquiry } };
}

// src/routes/inquiries.ts
var router3 = Router3();
router3.post("/", async (req, res, next) => {
  try {
    const { status, body } = await createInquiry(req.body);
    res.status(status).json(body);
  } catch (err) {
    next(err);
  }
});
var inquiries_default = router3;

// src/routes/admin.ts
import { Router as Router4 } from "express";
import multer from "multer";

// src/lib/auth.ts
import { createHmac, timingSafeEqual } from "node:crypto";

// src/config/env.ts
import { z as z2 } from "zod";
var envSchema = z2.object({
  NODE_ENV: z2.enum(["development", "test", "production"]).default("development"),
  PORT: z2.coerce.number().int().min(1).default(3001),
  DATABASE_URL: z2.string().url(),
  SUPABASE_S3_ENDPOINT: z2.string().optional().default(""),
  SUPABASE_S3_REGION: z2.string().optional().default("us-east-1"),
  SUPABASE_S3_ACCESS_KEY_ID: z2.string().optional().default(""),
  SUPABASE_S3_SECRET_ACCESS_KEY: z2.string().optional().default(""),
  SUPABASE_BUCKET: z2.string().optional().default(""),
  SUPABASE_PUBLIC_URL: z2.string().optional().default(""),
  R2_ACCOUNT_ID: z2.string().optional().default(""),
  R2_ACCESS_KEY_ID: z2.string().optional().default(""),
  R2_SECRET_ACCESS_KEY: z2.string().optional().default(""),
  R2_BUCKET_NAME: z2.string().optional().default(""),
  R2_PUBLIC_URL: z2.string().optional().default(""),
  CF_IMAGES_ACCOUNT_ID: z2.string().optional().default(""),
  CF_IMAGES_API_TOKEN: z2.string().optional().default(""),
  ADMIN_PASSWORD: z2.string().optional().default("admin123"),
  ADMIN_SECRET: z2.string().optional().default("change-me-in-production")
});
var parsed = envSchema.safeParse(process.env);
if (!parsed.success) {
  const missing = parsed.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join(", ");
  console.error("Invalid environment variables:", missing);
  throw new Error(`Invalid environment variables: ${missing}`);
}
var env = parsed.data;

// src/lib/auth.ts
var TOKEN_TTL_MS = 7 * 24 * 60 * 60 * 1e3;
function sign(payload) {
  return createHmac("sha256", env.ADMIN_SECRET).update(payload).digest("hex");
}
function createAdminToken() {
  const expiry = String(Date.now() + TOKEN_TTL_MS);
  const payload = `${expiry}.${sign(expiry)}`;
  return Buffer.from(payload).toString("base64url");
}
function verifyAdminToken(token) {
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
function isAdminPassword(password) {
  if (!env.ADMIN_PASSWORD) return false;
  const a = Buffer.from(password);
  const b = Buffer.from(env.ADMIN_PASSWORD);
  return a.length === b.length && timingSafeEqual(a, b);
}

// src/middleware/auth.ts
function requireAdmin(req, res, next) {
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

// src/controllers/admin.controller.ts
async function adminLogin(body) {
  const parsed2 = adminLoginSchema.safeParse(body);
  if (!parsed2.success) {
    return {
      status: 400,
      body: { error: { message: "Invalid input", issues: parsed2.error.issues } }
    };
  }
  if (!isAdminPassword(parsed2.data.password)) {
    return { status: 401, body: { error: { message: "Invalid password" } } };
  }
  return { status: 200, body: { data: { token: createAdminToken() } } };
}
async function listInquiries(query) {
  const parsed2 = listInquiriesQuery.safeParse(query);
  if (!parsed2.success) {
    return {
      status: 400,
      body: { error: { message: "Invalid query", issues: parsed2.error.issues } }
    };
  }
  const { kind, limit, offset } = parsed2.data;
  const where = kind ? { kind } : {};
  const [data, total] = await Promise.all([
    prisma.inquiry.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: offset,
      take: limit,
      include: { property: { select: { title: true, slug: true } } }
    }),
    prisma.inquiry.count({ where })
  ]);
  return { status: 200, body: { data, total, limit, offset } };
}
async function getInquiryById(id) {
  const inquiry = await prisma.inquiry.findUnique({
    where: { id },
    include: { property: { select: { title: true, slug: true } } }
  });
  if (!inquiry) {
    return { status: 404, body: { error: { message: "Inquiry not found" } } };
  }
  return { status: 200, body: { data: inquiry } };
}
async function deleteInquiry(id) {
  const existing = await prisma.inquiry.findUnique({ where: { id }, select: { id: true } });
  if (!existing) {
    return { status: 404, body: { error: { message: "Inquiry not found" } } };
  }
  await prisma.inquiry.delete({ where: { id } });
  return { status: 204, body: null };
}
async function createProperty(body) {
  const parsed2 = propertyUpsertSchema.safeParse(body);
  if (!parsed2.success) {
    return {
      status: 400,
      body: { error: { message: "Invalid input", issues: parsed2.error.issues } }
    };
  }
  const input = parsed2.data;
  const slugTaken = await prisma.property.findUnique({
    where: { slug: input.slug },
    select: { id: true }
  });
  if (slugTaken) {
    return {
      status: 409,
      body: { error: { message: "A property with this slug already exists" } }
    };
  }
  const prop = await prisma.property.create({
    data: {
      ...input,
      map: input.map ?? null,
      brochure: input.brochure ?? null
    }
  });
  return { status: 201, body: { data: prop } };
}
async function updateProperty(id, body) {
  const existing = await prisma.property.findUnique({ where: { id }, select: { id: true } });
  if (!existing) {
    return { status: 404, body: { error: { message: "Property not found" } } };
  }
  const parsed2 = propertyUpsertSchema.safeParse(body);
  if (!parsed2.success) {
    return {
      status: 400,
      body: { error: { message: "Invalid input", issues: parsed2.error.issues } }
    };
  }
  const input = parsed2.data;
  const slugTaken = await prisma.property.findFirst({
    where: { slug: input.slug, NOT: { id } },
    select: { id: true }
  });
  if (slugTaken) {
    return {
      status: 409,
      body: { error: { message: "A property with this slug already exists" } }
    };
  }
  const prop = await prisma.property.update({
    where: { id },
    data: { ...input, map: input.map ?? null, brochure: input.brochure ?? null }
  });
  return { status: 200, body: { data: prop } };
}
async function deleteProperty(id) {
  const existing = await prisma.property.findUnique({ where: { id }, select: { id: true } });
  if (!existing) {
    return { status: 404, body: { error: { message: "Property not found" } } };
  }
  await prisma.property.delete({ where: { id } });
  return { status: 204, body: null };
}

// src/controllers/upload.controller.ts
import { extname } from "node:path";

// src/lib/cloudflare.ts
import { mkdir, writeFile } from "node:fs/promises";
import { join as join2 } from "node:path";
import { randomUUID } from "node:crypto";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
var LOCAL_UPLOADS_DIR = join2(process.cwd(), "uploads");
var s3Client = null;
function getS3Client() {
  if (env.SUPABASE_S3_ENDPOINT && env.SUPABASE_S3_ACCESS_KEY_ID && env.SUPABASE_S3_SECRET_ACCESS_KEY && env.SUPABASE_BUCKET) {
    if (!s3Client) {
      s3Client = new S3Client({
        region: env.SUPABASE_S3_REGION,
        endpoint: env.SUPABASE_S3_ENDPOINT,
        forcePathStyle: true,
        credentials: {
          accessKeyId: env.SUPABASE_S3_ACCESS_KEY_ID,
          secretAccessKey: env.SUPABASE_S3_SECRET_ACCESS_KEY
        }
      });
    }
    const publicBase = env.SUPABASE_PUBLIC_URL || `${env.SUPABASE_S3_ENDPOINT.replace(/\/s3$/, "/object/public")}/${env.SUPABASE_BUCKET}`;
    return { client: s3Client, bucket: env.SUPABASE_BUCKET, publicBase };
  }
  if (env.R2_ACCOUNT_ID && env.R2_ACCESS_KEY_ID && env.R2_SECRET_ACCESS_KEY && env.R2_BUCKET_NAME) {
    if (!s3Client) {
      s3Client = new S3Client({
        region: "auto",
        endpoint: `https://${env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
        credentials: {
          accessKeyId: env.R2_ACCESS_KEY_ID,
          secretAccessKey: env.R2_SECRET_ACCESS_KEY
        }
      });
    }
    return {
      client: s3Client,
      bucket: env.R2_BUCKET_NAME,
      publicBase: env.R2_PUBLIC_URL || null
    };
  }
  return null;
}
async function uploadFile(options) {
  const key = `properties/${randomUUID()}${options.extension}`;
  const s3 = getS3Client();
  if (s3) {
    await s3.client.send(
      new PutObjectCommand({
        Bucket: s3.bucket,
        Key: key,
        Body: options.buffer,
        ContentType: options.contentType
      })
    );
    if (s3.publicBase) {
      return { url: `${s3.publicBase}/${key}`, key };
    }
  }
  await mkdir(join2(LOCAL_UPLOADS_DIR, "properties"), { recursive: true });
  await writeFile(join2(LOCAL_UPLOADS_DIR, key), options.buffer);
  return { url: `/uploads/${key}`, key };
}

// src/controllers/upload.controller.ts
var MIME_EXTENSIONS = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/gif": ".gif",
  "image/avif": ".avif",
  "video/mp4": ".mp4",
  "video/webm": ".webm",
  "video/quicktime": ".mov",
  "video/ogg": ".ogv",
  "application/pdf": ".pdf"
};
async function uploadFileController(req) {
  const file = req.file;
  if (!file) {
    return { status: 400, body: { error: { message: "No file provided" } } };
  }
  const extension = (MIME_EXTENSIONS[file.mimetype] ?? extname(file.originalname).toLowerCase()) || ".bin";
  const { url, key } = await uploadFile({
    buffer: file.buffer,
    contentType: file.mimetype,
    extension
  });
  const publicUrl = url.startsWith("/") ? `${req.protocol}://${req.get("host")}${url}` : url;
  return { status: 201, body: { data: { url: publicUrl, key } } };
}

// src/routes/admin.ts
var ALLOWED_MIME_TYPES = /* @__PURE__ */ new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/avif",
  "video/mp4",
  "video/webm",
  "video/quicktime",
  "video/ogg"
]);
var upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 50 * 1024 * 1024, files: 1 },
  fileFilter: (_req, file, cb) => {
    if (!ALLOWED_MIME_TYPES.has(file.mimetype)) {
      cb(new Error("Unsupported file type. Allowed: jpg, png, webp, gif, avif, mp4, webm, mov, ogv"));
      return;
    }
    cb(null, true);
  }
});
var router4 = Router4();
router4.post("/login", async (req, res, next) => {
  try {
    const { status, body } = await adminLogin(req.body);
    res.status(status).json(body);
  } catch (err) {
    next(err);
  }
});
router4.use(requireAdmin);
router4.post("/upload", upload.single("file"), async (req, res, next) => {
  try {
    const { status, body } = await uploadFileController(req);
    res.status(status).json(body);
  } catch (err) {
    if (err instanceof multer.MulterError || err instanceof Error && err.message.startsWith("Unsupported file type")) {
      res.status(400).json({ error: { message: err.message } });
      return;
    }
    next(err);
  }
});
router4.get("/inquiries", async (req, res, next) => {
  try {
    const { status, body } = await listInquiries(req.query);
    res.status(status).json(body);
  } catch (err) {
    next(err);
  }
});
router4.get("/inquiries/:id", async (req, res, next) => {
  try {
    const { status, body } = await getInquiryById(req.params.id);
    res.status(status).json(body);
  } catch (err) {
    next(err);
  }
});
router4.delete("/inquiries/:id", async (req, res, next) => {
  try {
    const { status, body } = await deleteInquiry(req.params.id);
    res.status(status);
    if (body) res.json(body);
    else res.end();
  } catch (err) {
    next(err);
  }
});
router4.post("/properties", async (req, res, next) => {
  try {
    const { status, body } = await createProperty(req.body);
    res.status(status).json(body);
  } catch (err) {
    next(err);
  }
});
router4.put("/properties/:id", async (req, res, next) => {
  try {
    const { status, body } = await updateProperty(req.params.id, req.body);
    res.status(status).json(body);
  } catch (err) {
    next(err);
  }
});
router4.delete("/properties/:id", async (req, res, next) => {
  try {
    const { status, body } = await deleteProperty(req.params.id);
    res.status(status);
    if (body) res.json(body);
    else res.end();
  } catch (err) {
    next(err);
  }
});
var admin_default = router4;

// src/app.ts
var app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(LOCAL_UPLOADS_DIR));
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});
app.use("/api/properties", properties_default);
app.use("/api/features", features_default);
app.use("/api/inquiries", inquiries_default);
app.use("/api/admin", admin_default);
app.use(notFound);
app.use(errorHandler);

// src/serverless.ts
var serverless_default = app;
export {
  serverless_default as default
};
