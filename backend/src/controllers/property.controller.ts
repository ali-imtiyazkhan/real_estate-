import { prisma } from "../db";
import { Prisma } from "../generated/prisma/client";
import { listPropertiesQuery } from "../validation/schemas";

export async function listProperties(query: unknown) {
  const parsed = listPropertiesQuery.safeParse(query);
  if (!parsed.success) {
    return {
      status: 400 as const,
      body: { error: { message: "Invalid query", issues: parsed.error.issues } },
    };
  }

  const { type, q, limit, offset } = parsed.data;

  const where = {
    ...(type
      ? {
          listingType:
            type === "sale"
              ? ("SALE" as const)
              : type === "rent"
              ? ("RENT" as const)
              : ("COMING_SOON" as const),
        }
      : {}),
    ...(q
      ? {
          OR: [
            { projectName: { contains: q, mode: "insensitive" as const } },
            { address: { contains: q, mode: "insensitive" as const } },
            { location: { contains: q, mode: "insensitive" as const } },
            { price: { contains: q, mode: "insensitive" as const } },
          ],
        }
      : {}),
  } satisfies Prisma.PropertyWhereInput;

  const [data, total] = await Promise.all([
    prisma.property.findMany({
      where,
      orderBy: { createdAt: "asc" },
      skip: offset,
      take: limit,
    }),
    prisma.property.count({ where }),
  ]);

  return { status: 200 as const, body: { data, total, limit, offset } };
}

export async function getPropertyByIdOrSlug(idOrSlug: string) {
  const prop = await prisma.property.findFirst({
    where: { OR: [{ id: idOrSlug }, { slug: idOrSlug }] },
  });

  if (!prop) {
    return { status: 404 as const, body: { error: { message: "Property not found" } } };
  }

  return { status: 200 as const, body: { data: prop } };
}
