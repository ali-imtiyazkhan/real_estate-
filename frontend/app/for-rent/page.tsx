import PropertyCard from "@/components/PropertyCard";
import { getProperties } from "@/lib/api";

export const dynamic = "force-dynamic";

export default async function ForRent() {
  const { data: rentalProperties } = await getProperties({ type: "rent", limit: 50 });

  return (
    <section className="overflow-hidden">
      <div className="mx-auto max-w-7xl px-8 md:px-12 pb-12 lg:pt-32">
        <div className="grid lg:grid-cols-3 gap-8 items-end">
          <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium tracking-tighter lg:col-span-2 text-base-900">
            Available rental properties, from cozy apartments to spacious family homes
          </h1>
          <p className="text-base text-base-500">
            Browse our diverse selection of rental properties and find the perfect place to call home.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8 border-t border-base-200 pt-8 group/props duration-500">
          {rentalProperties.map((p) => (
            <PropertyCard key={p.id} {...p} />
          ))}
        </div>
      </div>
    </section>
  );
}
