import Link from "next/link";
import Image from "next/image";
import PropertyCard from "@/components/PropertyCard";
import { getFeatures, getProperties } from "@/lib/api";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [saleProps, features] = await Promise.all([
    getProperties({ type: "sale", limit: 6 }),
    getFeatures(),
  ]);

  return (
    <>
      <section className="overflow-hidden">
        <div className="mx-auto max-w-7xl px-8 md:px-12 pb-12">
          <div className="relative">
            <Image
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1500&q=80"
              alt="Hero"
              priority
              width={1500}
              height={1000}
              sizes="100vw"
              className="w-full h-[60vh] 2xl:h-[75vh] object-cover relative"
            />
            <div className="absolute inset-0 bg-linear-to-tr from-base-900/50 via-base-900/10 to-transparent pointer-events-none" />
            <div className="absolute bg-white/95 backdrop-blur-sm bottom-0 right-0 p-8 w-full md:max-w-sm flex flex-col gap-3 shadow-[0_-8px_30px_rgba(0,0,0,0.06)]">
              <p className="section-label">Fair Deal Property / Real Estate</p>
              <p className="text-sm font-medium text-base-900">Mr. <b>Govind Singh</b></p>
              <a
                className="text-sm font-medium text-base-900 hover:text-base-600 transition-colors"
                href="tel:+919610016666"
              >
                +91 96100 16666
              </a>
            </div>
          </div>
          <div className="mt-12 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between animate-fade-up">
            <h1 className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl text-balance font-medium tracking-tighter text-base-900 max-w-4xl">
              Discover your dream home. Explore our real estate listings today
            </h1>
            <div className="flex flex-wrap gap-3 shrink-0">
              <Link href="/for-sale" className="btn-primary">
                Browse listings
              </Link>
              <Link href="/contact" className="btn-outline">
                Talk to an agent
              </Link>
            </div>
          </div>
          <div className="grid lg:grid-cols-3 pt-8 mt-8 border-t border-base-200">
            <h2 className="text-lg sm:text-xl md:text-2xl font-medium text-base-900">
              Why choose us
            </h2>
            <div className="lg:col-span-2 grid lg:grid-cols-2 lg:col-start-2 gap-8">
              {features.data.map((f) => (
                <div key={f.id} className="flex flex-col">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-medium text-base-900">
                    {f.title}
                  </h3>
                  <p className="text-base mt-6 text-base-500 text-balance">
                    {f.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-7xl px-8 md:px-12 py-24">
          <div className="grid lg:grid-cols-3 gap-8">
            <div>
              <h2 className="text-lg sm:text-xl md:text-2xl font-medium text-base-900">
                Available properties for sale
              </h2>
              <p className="text-base text-pretty mt-4 text-base-500">
                Browse our diverse selection of homes, from cozy apartments to
                spacious estates, and discover the ideal property to call your own.
              </p>
            </div>
            <div className="flex flex-col lg:col-start-3">
              <Link
                href="/for-sale"
                className="link-arrow mt-auto"
              >
                See all properties for sale
                <svg width="71" height="16" viewBox="0 0 71 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0.996338 6.5C0.444053 6.5 -0.00366211 6.94772 -0.00366211 7.5C-0.00366211 8.05228 0.444053 8.5 0.996338 8.5V6.5ZM69.7739 8.20711C70.1645 7.81658 70.1645 7.18342 69.7739 6.79289L63.41 0.428932C63.0194 0.0384079 62.3863 0.0384079 61.9958 0.428932C61.6052 0.819456 61.6052 1.45262 61.9958 1.84315L67.6526 7.5L61.9958 13.1569C61.6052 13.5474 61.6052 14.1805 61.9958 14.5711C62.3863 14.9616 63.0194 14.9616 63.41 14.5711L69.7739 8.20711ZM0.996338 8.5H69.0668V6.5H0.996338V8.5Z" fill="currentColor" />
                </svg>
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 border-t border-base-200 pt-8 lg:grid-cols-3 gap-8 mt-8 group/props duration-500">
            {saleProps.data.map((p) => (
              <PropertyCard key={p.id} {...p} listingType={p.listingType} />
            ))}
          </div>
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
