import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import PropertyCard from "@/components/PropertyCard";
import QuickFilterBar from "@/components/QuickFilterBar";
import { getProperties } from "@/lib/api";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Coming Soon Properties | Fair Deal Property",
  description:
    "Preview upcoming exclusive properties before they hit the market. Fair Deal Property, Govind Singh, +91 96100 16666.",
};

export default async function ComingSoon({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; type?: string }>;
}) {
  const { q, type } = await searchParams;
  const { data: properties } = await getProperties({
    type: (type as "sale" | "rent" | "coming-soon") || "coming-soon",
    q: q || undefined,
    limit: 50,
  });

  return (
    <>
      <section className="overflow-hidden">
        <div className="mx-auto max-w-7xl px-8 md:px-12 pb-12 lg:pt-32">
          <div className="grid lg:grid-cols-3 gap-8 items-end mb-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-balance font-medium tracking-tighter lg:col-span-2 text-base-900">
              Coming Soon
            </h1>
            <p className="text-base text-base-500">
              Get early access to exclusive properties before they officially launch. Register your interest to be notified first.
            </p>
          </div>

          <QuickFilterBar basePath="/coming-soon" />

          {properties.length === 0 ? (
            <div className="py-16 text-center bg-base-50 rounded-xl border border-base-200">
              <h3 className="text-xl font-semibold text-base-900">No coming soon properties found</h3>
              <p className="text-sm text-base-500 mt-2">Check back soon for new exclusive listings.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8 group/props duration-500">
              {properties.map((p) => (
                <PropertyCard key={p.id} {...p} listingType={p.listingType} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-7xl px-8 md:px-12 py-12">
          <div className="relative grid grid-cols-1 gap-4 md:grid-cols-2 lg:items-center">
            <Image
              src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80"
              alt="Exclusive access"
              width={800}
              height={1000}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="max-h-80 md:max-h-[80dvh] w-full object-cover"
            />
            <div className="p-8 lg:p-20 h-full flex flex-col items-center justify-center outline outline-base-200">
              <div>
                <h3 className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl text-balance font-medium text-base-900">
                  Be the first to know
                </h3>
                <div className="mt-8 pt-8 border-t border-base-200">
                  <p className="text-base text-base-500">
                    Join our VIP list to receive exclusive previews of upcoming properties,
                    private viewings, and early-bird pricing before public launch.
                  </p>
                </div>
                <div className="flex mt-8 gap-2">
                  <Link className="btn-primary" href="/contact">
                    Join VIP List
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}