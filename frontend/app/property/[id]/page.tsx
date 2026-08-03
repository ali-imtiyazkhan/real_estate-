import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AgentForm from "@/components/AgentForm";
import MapDownloadButton from "@/components/MapDownloadButton";
import ImageLightbox from "@/components/ImageLightbox";
import MortgageCalculator from "@/components/MortgageCalculator";
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
          prop.image,
          "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
          "https://images.unsplash.com/photo-1600566753086-00f18d8f5b4a?w=800&q=80",
        ];

  const related = (
    await getProperties({
      type: prop.listingType === "SALE" ? "sale" : "rent",
      limit: 50,
    }).catch(() => ({ data: [] }))
  ).data
    .filter((p) => p.id !== prop.id)
    .slice(0, 3);

  const whatsappMessage = encodeURIComponent(
    `Hi Fair Deal Property! I am interested in "${prop.title}" (${prop.price}) located at ${prop.location}. Please share more details.`
  );

  return (
    <>
      <section>
        <div className="mx-auto max-w-7xl px-8 md:px-12 pb-12">
          {/* Main Hero Image */}
          <div className="relative overflow-hidden rounded-xl">
            <Image
              src={prop.image}
              alt={prop.title}
              width={1500}
              height={1000}
              sizes="100vw"
              priority
              className="w-full h-[60vh] 2xl:h-[75vh] object-cover"
            />
            <div className="absolute top-4 left-4 bg-base-900/90 text-white text-xs font-semibold px-3 py-1.5 rounded-full backdrop-blur-md">
              {prop.listingType === "SALE" ? "FOR SALE" : "FOR RENT"}
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 pt-8 mt-8 border-t border-base-200">
            <div className="lg:col-span-2">
              <h1 className="text-4xl sm:text-5xl md:text-6xl text-balance font-medium tracking-tighter text-base-900">
                {prop.title}
              </h1>

              {/* Property Key Specs */}
              <div className="flex gap-8 flex-wrap mt-6 p-4 bg-base-50 rounded-xl border border-base-200">
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-base-900">{prop.sqft}</span>
                  <span className="text-xs text-base-500 uppercase tracking-widest font-medium">Sqft Area</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-base-900">{prop.rooms}</span>
                  <span className="text-xs text-base-500 uppercase tracking-widest font-medium">Bedrooms</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-base-900">{prop.floor}</span>
                  <span className="text-xs text-base-500 uppercase tracking-widest font-medium">Floor</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-base-900">{prop.location}</span>
                  <span className="text-xs text-base-500 uppercase tracking-widest font-medium">Location</span>
                </div>
              </div>

              {/* Quick Action Buttons (WhatsApp, Call, Map Download) */}
              <div className="flex flex-wrap items-center gap-3 mt-6">
                <a
                  href={`https://wa.me/919610016666?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors shadow-sm"
                >
                  💬 Chat on WhatsApp
                </a>

                <a
                  href="tel:+919610016666"
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-base-900 text-white text-sm font-medium rounded-lg hover:bg-base-800 transition-colors shadow-sm"
                >
                  📞 Call +91 96100 16666
                </a>

                {prop.map && (
                  <MapDownloadButton mapUrl={prop.map} propertyTitle={prop.title} />
                )}
              </div>

              {/* Photo Gallery with Fullscreen Lightbox */}
              <div className="mt-10">
                <h3 className="text-lg font-semibold text-base-900">Property Photo Gallery</h3>
                <ImageLightbox images={gallery} title={prop.title} />
              </div>

              {/* Layout Map Section */}
              {prop.map && (
                <div className="mt-10 p-6 bg-base-50 border border-base-200 rounded-xl">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-base-900">
                        🗺️ Property Floor Plan / Layout Map
                      </h3>
                      <p className="text-xs text-base-500">Architectural breakdown and spatial layout</p>
                    </div>
                    <MapDownloadButton mapUrl={prop.map} propertyTitle={prop.title} />
                  </div>
                  <div className="overflow-hidden rounded-lg border border-base-200 bg-white">
                    <Image
                      src={prop.map}
                      alt={`${prop.title} layout map`}
                      width={1200}
                      height={800}
                      sizes="100vw"
                      className="w-full object-contain max-h-[500px]"
                    />
                  </div>
                </div>
              )}

              {/* Mortgage Calculator */}
              <MortgageCalculator propertyPriceRaw={prop.price} />
            </div>

            {/* Sidebar Contact Card */}
            <div>
              <div className="p-6 bg-white rounded-xl border border-base-200 shadow-sm sticky top-6">
                <div className="pb-4 border-b border-base-200">
                  <span className="text-xs font-semibold text-base-500 uppercase tracking-wider">Listing Price</span>
                  <h3 className="text-3xl font-bold text-base-900 mt-1">{prop.price}</h3>
                  <p className="text-sm text-base-600 mt-1">📍 {prop.address}, {prop.location}</p>
                </div>

                <div className="mt-6">
                  <h4 className="text-base font-semibold text-base-900">Inquire About This Property</h4>
                  <p className="text-xs text-base-500 mt-1">Schedule a tour, ask a question, or make an offer directly to our agent.</p>
                  <AgentForm propertyId={prop.id} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Properties */}
      {related.length > 0 && (
        <section className="border-t border-base-200 bg-base-50 py-12">
          <div className="mx-auto max-w-7xl px-8 md:px-12">
            <h2 className="text-2xl font-bold text-base-900 mb-8">
              Similar Properties You Might Like
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {related.map((p) => (
                <Link key={p.id} href={`/property/${p.slug}`} className="group bg-white rounded-xl overflow-hidden border border-base-200 shadow-sm hover:shadow-md transition-all">
                  <div className="overflow-hidden aspect-[4/3] relative">
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-base font-semibold text-base-900 group-hover:text-black">{p.title}</h3>
                    <p className="text-sm font-bold text-base-900 mt-1">{p.price}</p>
                    <p className="text-xs text-base-500 mt-1">📍 {p.location}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

