import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AgentForm from "@/components/AgentForm";
import { getProperties, getProperty } from "@/lib/api";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id: rawId } = await params;
  const { data: prop } = await getProperty(decodeURIComponent(rawId)).catch(() => ({
    data: null,
  }));

  if (!prop) {
    return { title: "Property | Fair Deal Property" };
  }

  return {
    title: `${prop.title} | Fair Deal Property`,
    description: `${prop.title} — ${prop.price}, ${prop.sqft} sqft, ${prop.rooms} rooms, ${prop.location}. Contact Fair Deal Property at +91 96100 16666.`,
    openGraph: {
      title: prop.title,
      description: `${prop.location} · ${prop.price}`,
      images: [prop.image],
    },
  };
}

export default async function PropertyDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: rawId } = await params;
  const id = decodeURIComponent(rawId);
  const { data: prop } = await getProperty(id).catch(() => ({ data: null }));

  if (!prop) notFound();

  const gallery =
    prop.gallery && prop.gallery.length > 0
      ? prop.gallery
      : [
          "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&q=80",
          "https://images.unsplash.com/photo-1600566753086-00f18d8f5b4a?w=400&q=80",
          "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=400&q=80",
        ];

  const related = (
    await getProperties({
      type: prop.listingType === "SALE" ? "sale" : "rent",
      limit: 50,
    }).catch(() => ({ data: [] }))
  ).data
    .filter((p) => p.id !== prop.id)
    .slice(0, 3);

  return (
    <>
      <section>
        <div className="mx-auto max-w-7xl px-8 md:px-12 pb-12">
          <Image
            src={prop.image}
            alt={prop.title}
            width={1500}
            height={1000}
            sizes="100vw"
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
                {gallery.map((src) => (
                  <div key={src} className="overflow-hidden">
                    <Image
                      src={src}
                      alt={prop.title}
                      width={400}
                      height={300}
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="aspect-[4/3] object-cover w-full transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                ))}
              </div>
              {prop.map && (
                <div className="mt-6">
                  <p className="section-label mb-2">Property layout / Map</p>
                  <div className="overflow-hidden">
                    <Image
                      src={prop.map}
                      alt={`${prop.title} layout map`}
                      width={1200}
                      height={800}
                      sizes="100vw"
                      className="w-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                </div>
              )}
            </div>
            <div>
              <div className="p-8 outline outline-base-200">
                <h3 className="text-lg font-medium text-base-900">{prop.price}</h3>
                <p className="text-sm text-base-500 mt-2">{prop.address}</p>
                <p className="text-sm text-base-500">{prop.location}</p>
                <div className="mt-6 pt-6 border-t border-base-200">
                  <h4 className="text-base font-medium text-base-900">Contact Agent</h4>
                  <AgentForm propertyId={prop.id} />
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
              {related.map((p) => (
                <Link key={p.id} href={`/property/${p.slug}`} className="group">
                  <div className="overflow-hidden">
                    <Image
                      src={p.image}
                      alt={p.title}
                      width={400}
                      height={300}
                      sizes="(max-width: 768px) 100vw, 33vw"
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
