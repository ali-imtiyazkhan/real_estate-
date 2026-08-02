import { prisma } from "../db";
import { createInquirySchema } from "../validation/schemas";

async function resolvePropertyId(idOrSlug: string): Promise<string | null> {
  const prop = await prisma.property.findFirst({
    where: { OR: [{ id: idOrSlug }, { slug: idOrSlug }] },
    select: { id: true },
  });
  return prop?.id ?? null;
}

export async function createInquiry(body: unknown) {
  const parsed = createInquirySchema.safeParse(body);
  if (!parsed.success) {
    return {
      status: 400 as const,
      body: { error: { message: "Invalid input", issues: parsed.error.issues } },
    };
  }

  const input = parsed.data;

  if (input.propertyId) {
    const resolved = await resolvePropertyId(input.propertyId);
    if (!resolved) {
      return {
        status: 400 as const,
        body: {
          error: {
            message: "Invalid input",
            issues: [{ path: ["propertyId"], message: "Property does not exist" }],
          },
        },
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
      propertyId: input.propertyId ?? null,
    },
  });

  return { status: 201 as const, body: { data: inquiry } };
}
