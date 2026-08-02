import Link from "next/link";
import { getBlogPosts } from "@/lib/api";

export const dynamic = "force-dynamic";

export default async function Blog() {
  const { data: blogPosts } = await getBlogPosts();

  return (
    <section className="overflow-hidden">
      <div className="mx-auto max-w-7xl px-8 md:px-12 pb-12 lg:pt-32">
        <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium tracking-tighter text-base-900 mb-8">
          From the blog
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 border-t border-base-200 pt-8">
          {blogPosts.map((post) => (
            <Link key={post.id} href={`/blog/${post.id}`} className="group">
              <div className="overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  loading="lazy"
                  decoding="async"
                  width="800"
                  height="400"
                  className="aspect-[16/9] object-cover w-full transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="mt-4">
                <p className="text-xs text-base-400 uppercase tracking-widest">{post.date}</p>
                <h2 className="text-lg font-medium text-base-900 mt-2">{post.title}</h2>
                <p className="text-sm text-base-500 mt-2">{post.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
