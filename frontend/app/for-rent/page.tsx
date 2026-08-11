import type { Metadata } from "next";
import PropertyCard from "@/components/PropertyCard";
import QuickFilterBar from "@/components/QuickFilterBar";
import { getProperties } from "@/lib/api";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Properties for Rent | Fair Deal Property",
  description:
    "Browse rental properties — apartments, studios and family homes. Fair Deal Property, Govind Singh, +91 96100 16666.",
};

export default async function ForRent({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const { data: rentalProperties } = await getProperties({
    type: "rent",
    q: q || undefined,
    limit: 50,
  });

  return (
    <section className="overflow-hidden">
      <div className="mx-auto max-w-7xl px-8 md:px-12 pb-12 lg:pt-32">
        <div className="grid lg:grid-cols-3 gap-8 items-end mb-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-balance font-medium tracking-tighter lg:col-span-2 text-base-900">
            Properties for rent
          </h1>
          <p className="text-base text-base-500">
            Browse our diverse selection of rental properties and find the perfect place to call home.
          </p>
        </div>

        <QuickFilterBar basePath="/for-rent" />

        {rentalProperties.length === 0 ? (
          <div className="py-16 text-center bg-base-50 rounded-xl border border-base-200">
            <h3 className="text-xl font-semibold text-base-900">No rental properties found</h3>
            <p className="text-sm text-base-500 mt-2">Try adjusting your search keywords or location.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8 border-t border-base-200 pt-8 group/props duration-500">
            {rentalProperties.map((p) => (
              <PropertyCard key={p.id} {...p} listingType={p.listingType} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

