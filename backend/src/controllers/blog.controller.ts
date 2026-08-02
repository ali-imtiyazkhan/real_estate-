import { prisma } from "../db";

export async function listBlogPosts() {
  const posts = await prisma.blogPost.findMany({
    orderBy: { createdAt: "asc" },
  });
  return { status: 200 as const, body: { data: posts } };
}

export async function getBlogPostById(id: string) {
  const post = await prisma.blogPost.findUnique({ where: { id } });

  if (!post) {
    return { status: 404 as const, body: { error: { message: "Post not found" } } };
  }

  return { status: 200 as const, body: { data: post } };
}
