import { prisma } from "../db";

export async function listFeatures() {
  const features = await prisma.feature.findMany({
    orderBy: { createdAt: "asc" },
  });
  return { status: 200 as const, body: { data: features } };
}
