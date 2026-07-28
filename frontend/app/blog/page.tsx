import Link from "next/link";

const blogPosts = [
  {
    id: "1",
    title: "The importance of a dedicated IP address for your website",
    description: "Highlighting the advantages of having a dedicated IP address for your website, including enhanced security and improved email deliverability",
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80",
    date: "March 15, 2026",
  },
  {
    id: "2",
    title: "Top 10 luxury real estate markets to watch in 2026",
    description: "Discover which global luxury real estate markets are poised for growth and investment opportunities in the coming year.",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    date: "March 10, 2026",
  },
  {
    id: "3",
    title: "How to stage your home for a quick sale",
    description: "Expert tips and strategies for preparing your property to attract qualified buyers and achieve the best possible price.",
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80",
    date: "March 5, 2026",
  },
];

export default function Blog() {
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
