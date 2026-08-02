import { z } from "zod";

export const listPropertiesQuery = z.object({
  type: z.enum(["sale", "rent"]).optional(),
  q: z.string().trim().max(200).optional(),
  limit: z.coerce.number().int().min(1).max(50).default(12),
  offset: z.coerce.number().int().min(0).default(0),
});

export const createInquirySchema = z
  .object({
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
    description: z.string().trim().max(5000),
    totalCost: z.string().trim().max(100).optional(),
    propertyId: z.string().trim().max(50).optional(),
  })
  .superRefine((data, ctx) => {
    const requireField = (path: string, message: string) => {
      ctx.addIssue({ code: "custom", path: [path], message });
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

export type CreateInquiryInput = z.infer<typeof createInquirySchema>;

export const adminLoginSchema = z.object({
  password: z.string().min(1).max(200),
});

export const listInquiriesQuery = z.object({
  kind: z.enum(["CONTACT", "SELL", "AGENT"]).optional(),
  limit: z.coerce.number().int().min(1).max(100).default(50),
  offset: z.coerce.number().int().min(0).default(0),
});

export const propertyUpsertSchema = z.object({
  slug: z.string().trim().min(1).max(200),
  title: z.string().trim().min(1).max(300),
  projectName: z.string().trim().min(1).max(300),
  address: z.string().trim().min(1).max(300),
  location: z.string().trim().min(1).max(200),
  sqft: z.string().trim().min(1).max(50),
  floor: z.string().trim().min(1).max(50),
  rooms: z.string().trim().min(1).max(50),
  price: z.string().trim().min(1).max(100),
  image: z.string().trim().min(1).max(1000),
  gallery: z.array(z.string().trim().min(1).max(1000)).max(20).default([]),
  map: z.string().trim().max(1000).nullable().optional(),
  listingType: z.enum(["SALE", "RENT"]),
});

export type PropertyUpsertInput = z.infer<typeof propertyUpsertSchema>;
