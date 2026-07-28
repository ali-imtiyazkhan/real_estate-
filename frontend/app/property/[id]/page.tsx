import Link from "next/link";
import { notFound } from "next/navigation";
import { properties, rentalProperties } from "@/lib/data";

export default async function PropertyDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const allProps = [...properties, ...rentalProperties];
  const prop = allProps.find((p) => p.id === id);

  if (!prop) notFound();

  return (
    <>
      <section>
        <div className="mx-auto max-w-7xl px-8 md:px-12 pb-12">
          <img
            src={prop.image}
            alt={prop.title}
            loading="lazy"
            decoding="async"
            width="1500"
            height="1000"
            className="w-full h-[60vh] 2xl:h-[75vh] object-cover"
          />
          <div className="grid lg:grid-cols-3 gap-8 pt-8 mt-8 border-t border-base-200">
            <div className="lg:col-span-2">
              <h1 className="text-4xl sm:text-5xl md:text-6xl text-balance font-medium tracking-tighter text-base-900">
                {prop.title}
              </h1>
              <div className="flex gap-6 flex-wrap mt-4">
                <div className="flex flex-col">
                  <span className="text-2xl font-medium text-base-900">{prop.sqft}</span>
                  <span className="text-xs text-base-500 uppercase tracking-widest">Sqft</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-medium text-base-900">{prop.rooms}</span>
                  <span className="text-xs text-base-500 uppercase tracking-widest">Rooms</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-medium text-base-900">{prop.floor}</span>
                  <span className="text-xs text-base-500 uppercase tracking-widest">Floor</span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-6">
                <div className="overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&q=80"
                    alt="Gallery"
                    loading="lazy"
                    decoding="async"
                    width="400"
                    height="300"
                    className="aspect-[4/3] object-cover w-full transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1600566753086-00f18d8f5b4a?w=400&q=80"
                    alt="Gallery"
                    loading="lazy"
                    decoding="async"
                    width="400"
                    height="300"
                    className="aspect-[4/3] object-cover w-full transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=400&q=80"
                    alt="Gallery"
                    loading="lazy"
                    decoding="async"
                    width="400"
                    height="300"
                    className="aspect-[4/3] object-cover w-full transition-transform duration-500 hover:scale-110"
                  />
                </div>
              </div>
            </div>
            <div>
              <div className="p-8 outline outline-base-200">
                <h3 className="text-lg font-medium text-base-900">{prop.price}</h3>
                <p className="text-sm text-base-500 mt-2">{prop.address}</p>
                <p className="text-sm text-base-500">{prop.location}</p>
                <div className="mt-6 pt-6 border-t border-base-200">
                  <h4 className="text-base font-medium text-base-900">Contact Agent</h4>
                  <div className="mt-4 space-y-4">
                    <input
                      type="text"
                      placeholder="Your Name"
                      className="block w-full h-12 border-0 border-b border-base-200 text-sm text-base-900 bg-transparent outline-none focus:border-black focus:shadow-[inset_0_-2px_0_#000] placeholder:text-base-400"
                    />
                    <input
                      type="email"
                      placeholder="Your Email"
                      className="block w-full h-12 border-0 border-b border-base-200 text-sm text-base-900 bg-transparent outline-none focus:border-black focus:shadow-[inset_0_-2px_0_#000] placeholder:text-base-400"
                    />
                    <textarea
                      placeholder="Your Message"
                      rows={3}
                      className="block w-full border-0 border-b border-base-200 text-sm text-base-900 bg-transparent outline-none focus:border-black resize-vertical placeholder:text-base-400"
                    />
                    <button className="w-full h-15 bg-base-800 text-white text-base font-medium hover:bg-base-900 transition-colors cursor-pointer">
                      Send Message
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-7xl px-8 md:px-12 pb-12">
          <div className="border-t border-base-200 pt-8">
            <h2 className="text-lg sm:text-xl md:text-2xl font-medium text-base-900 mb-8">
              Related properties
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {allProps.filter((p) => p.id !== id).slice(0, 3).map((p) => (
                <Link key={p.id} href={`/property/${p.id}`} className="group">
                  <div className="overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.title}
                      loading="lazy"
                      decoding="async"
                      width="400"
                      height="300"
                      className="aspect-[4/3] object-cover w-full transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <h3 className="text-base font-medium text-base-900 mt-4">{p.title}</h3>
                  <p className="text-sm text-base-500">{p.price}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
