import { prisma } from "../db";
import {
  adminLoginSchema,
  listInquiriesQuery,
  propertyUpsertSchema,
  type PropertyUpsertInput,
} from "../validation/schemas";
import { createAdminToken, isAdminPassword } from "../lib/auth";

export async function adminLogin(body: unknown) {
  const parsed = adminLoginSchema.safeParse(body);
  if (!parsed.success) {
    return {
      status: 400 as const,
      body: { error: { message: "Invalid input", issues: parsed.error.issues } },
    };
  }

  if (!isAdminPassword(parsed.data.password)) {
    return { status: 401 as const, body: { error: { message: "Invalid password" } } };
  }

  return { status: 200 as const, body: { data: { token: createAdminToken() } } };
}

export async function listInquiries(query: unknown) {
  const parsed = listInquiriesQuery.safeParse(query);
  if (!parsed.success) {
    return {
      status: 400 as const,
      body: { error: { message: "Invalid query", issues: parsed.error.issues } },
    };
  }

  const { kind, limit, offset } = parsed.data;
  const where = kind ? { kind } : {};

  const [data, total] = await Promise.all([
    prisma.inquiry.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: offset,
      take: limit,
      include: { property: { select: { title: true, slug: true } } },
    }),
    prisma.inquiry.count({ where }),
  ]);

  return { status: 200 as const, body: { data, total, limit, offset } };
}

export async function getInquiryById(id: string) {
  const inquiry = await prisma.inquiry.findUnique({
    where: { id },
    include: { property: { select: { title: true, slug: true } } },
  });

  if (!inquiry) {
    return { status: 404 as const, body: { error: { message: "Inquiry not found" } } };
  }

  return { status: 200 as const, body: { data: inquiry } };
}

export async function deleteInquiry(id: string) {
  const existing = await prisma.inquiry.findUnique({ where: { id }, select: { id: true } });
  if (!existing) {
    return { status: 404 as const, body: { error: { message: "Inquiry not found" } } };
  }

  await prisma.inquiry.delete({ where: { id } });
  return { status: 204 as const, body: null };
}

export async function createProperty(body: unknown) {
  const parsed = propertyUpsertSchema.safeParse(body);
  if (!parsed.success) {
    return {
      status: 400 as const,
      body: { error: { message: "Invalid input", issues: parsed.error.issues } },
    };
  }

  const input: PropertyUpsertInput = parsed.data;

  const slugTaken = await prisma.property.findUnique({
    where: { slug: input.slug },
    select: { id: true },
  });
  if (slugTaken) {
    return {
      status: 409 as const,
      body: { error: { message: "A property with this slug already exists" } },
    };
  }

  const prop = await prisma.property.create({
    data: {
      ...input,
      map: input.map ?? null,
    },
  });

  return { status: 201 as const, body: { data: prop } };
}

export async function updateProperty(id: string, body: unknown) {
  const existing = await prisma.property.findUnique({ where: { id }, select: { id: true } });
  if (!existing) {
    return { status: 404 as const, body: { error: { message: "Property not found" } } };
  }

  const parsed = propertyUpsertSchema.safeParse(body);
  if (!parsed.success) {
    return {
      status: 400 as const,
      body: { error: { message: "Invalid input", issues: parsed.error.issues } },
    };
  }

  const input: PropertyUpsertInput = parsed.data;

  const slugTaken = await prisma.property.findFirst({
    where: { slug: input.slug, NOT: { id } },
    select: { id: true },
  });
  if (slugTaken) {
    return {
      status: 409 as const,
      body: { error: { message: "A property with this slug already exists" } },
    };
  }

  const prop = await prisma.property.update({
    where: { id },
    data: { ...input, map: input.map ?? null },
  });

  return { status: 200 as const, body: { data: prop } };
}

export async function deleteProperty(id: string) {
  const existing = await prisma.property.findUnique({ where: { id }, select: { id: true } });
  if (!existing) {
    return { status: 404 as const, body: { error: { message: "Property not found" } } };
  }

  await prisma.property.delete({ where: { id } });
  return { status: 204 as const, body: null };
}
