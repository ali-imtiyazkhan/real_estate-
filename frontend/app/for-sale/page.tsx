import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import PropertyCard from "@/components/PropertyCard";
import SearchModal from "@/components/SearchModal";
import QuickFilterBar from "@/components/QuickFilterBar";
import { getProperties } from "@/lib/api";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Properties for Sale | Fair Deal Property",
  description:
    "Browse homes for sale — from cozy apartments to spacious estates. Fair Deal Property, Govind Singh, +91 96100 16666.",
};

export default async function ForSale({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const { data: properties } = await getProperties({
    type: "sale",
    q: q || undefined,
    limit: 50,
  });

  return (
    <>
      <section className="overflow-hidden">
        <div className="mx-auto max-w-7xl px-8 md:px-12 pb-12 lg:pt-32">
          <div className="grid lg:grid-cols-3 gap-8 items-end mb-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-balance font-medium tracking-tighter lg:col-span-2 text-base-900">
              Properties for sale
            </h1>
            <p className="text-base text-base-500">
              Browse our diverse selection of homes, from cozy apartments to
              spacious estates, and discover the ideal property to call your own.
            </p>
          </div>

          <QuickFilterBar basePath="/for-sale" />

          {properties.length === 0 ? (
            <div className="py-16 text-center bg-base-50 rounded-xl border border-base-200">
              <h3 className="text-xl font-semibold text-base-900">No properties found</h3>
              <p className="text-sm text-base-500 mt-2">Try adjusting your search keywords or location.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8 group/props duration-500">
              {properties.map((p) => (
                <PropertyCard key={p.id} {...p} />
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
              alt="Sell your property"
              width={800}
              height={1000}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="max-h-80 md:max-h-[80dvh] w-full object-cover"
            />
            <div className="p-8 lg:p-20 h-full flex flex-col items-center justify-center outline outline-base-200">
              <div>
                <h3 className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl text-balance font-medium text-base-900">
                  Privileged access to qualified global buyers
                </h3>
                <div className="mt-8 pt-8 border-t border-base-200">
                  <p className="text-base text-base-500">
                    The Fair Deal Property network is an exclusive
                    association of distinguished residential luxury real estate
                    brokerage companies throughout the world. Our agents are local
                    experts, globally connected and ready to guide you on your
                    homebuying and selling journey.
                  </p>
                </div>
                <div className="flex mt-8 gap-2">
                  <Link className="btn-primary" href="/sell-property">
                    Sell your property
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

