import Link from "next/link";
import PropertyCard from "@/components/PropertyCard";
import SearchModal from "@/components/SearchModal";
import { getProperties } from "@/lib/api";

export const dynamic = "force-dynamic";

export default async function ForSale() {
  const { data: properties } = await getProperties({ type: "sale", limit: 50 });

  return (
    <>
      <section className="overflow-hidden">
        <div className="mx-auto max-w-7xl px-8 md:px-12 pb-12 lg:pt-32">
          <div className="grid lg:grid-cols-3 gap-8 items-end">
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium tracking-tighter lg:col-span-2 text-base-900">
              Available properties, from cozy apartments to spacious estates, and
              discover the ideal property to call your own.
            </h1>
            <p className="text-base text-base-500">
              Browse our diverse selection of homes, from cozy apartments to
              spacious estates, and discover the ideal property to call your own.
            </p>
          </div>
          <div className="mt-8">
            <SearchModal results={properties} searchKeys={["projectName", "address", "price"]} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8 group/props duration-500">
            {properties.map((p) => (
              <PropertyCard key={p.id} {...p} />
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-7xl px-8 md:px-12 py-12">
          <div className="relative grid grid-cols-1 gap-4 md:grid-cols-2 lg:items-center">
            <img
              src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80"
              alt="Sell your property"
              loading="lazy"
              decoding="async"
              width="800"
              height="1000"
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
                  <Link
                    className="flex transition text-center justify-center font-medium items-center duration-500 ease-in-out transition-colors focus:outline-2 outline-offset-4 text-white bg-base-800 hover:bg-base-900 focus:outline-base-900 h-15 px-8 py-4 text-base"
                    href="/sell-property"
                  >
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
