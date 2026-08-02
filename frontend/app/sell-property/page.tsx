import type { Metadata } from "next";
import Image from "next/image";
import SellForm from "@/components/SellForm";

export const metadata: Metadata = {
  title: "Sell Your Property | Fair Deal Property",
  description:
    "Sell your property with Fair Deal Property — privileged access to qualified buyers, global reach and a bespoke marketing plan for your home.",
};

export default function SellProperty() {
  return (
    <>
      <section className="overflow-hidden">
        <div className="mx-auto max-w-7xl px-8 md:px-12 pb-12">
          <div className="relative">
            <Image
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1500&q=80"
              alt="Sell your property"
              width={1500}
              height={1000}
              sizes="100vw"
              className="w-full h-[60vh] 2xl:h-[75vh] object-cover"
            />
            <div className="absolute bg-white bottom-0 right-0 p-8 w-full md:max-w-xs flex flex-col">
              <h3 className="text-sm">Fair Deal Property / Sell Your Property</h3>
              <div>
                <a className="text-xs" href="tel:+919610016666">Tel: +91 96100 16666</a>
              </div>
            </div>
          </div>
          <h1 className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl text-balance font-medium tracking-tighter text-base-900 mt-12">
            Sell your property with Fair Deal Property
          </h1>
          <div className="grid lg:grid-cols-3 pt-8 mt-8 border-t border-base-200">
            <div></div>
            <div className="text-base text-base-500 text-balance lg:col-span-2">
              Our global network of luxury real estate professionals applies
              local market knowledge and cutting-edge technology to create a
              comprehensive, customized plan for selling your home. From
              pricing strategy to closing, we guide you every step of the way.
            </div>
          </div>

          <div className="mt-16 md:mt-40 pt-8 border-t border-base-200 grid lg:grid-cols-3 gap-8">
            <h2 className="text-lg sm:text-xl md:text-2xl font-medium text-base-900">
              List your home with confidence
            </h2>
            <div className="lg:col-span-2 lg:col-start-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                <Image
                  src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80"
                  alt="Property"
                  width={800}
                  height={600}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="w-full object-cover aspect-[4/3]"
                />
                <Image
                  src="https://images.unsplash.com/photo-1600566753086-00f18d8f5b4a?w=800&q=80"
                  alt="Property"
                  width={800}
                  height={600}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="w-full object-cover aspect-[4/3]"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 items-stretch mt-12">
            <Image
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80"
              alt="Global"
              width={800}
              height={1000}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="max-h-80 md:max-h-full w-full object-cover h-full"
            />
            <div className="p-8 lg:p-20 flex flex-col justify-center outline outline-base-200">
              <h3 className="text-2xl md:text-3xl lg:text-4xl text-balance font-medium text-base-900">
                Be where the world is looking
              </h3>
              <p className="text-base text-base-500 mt-6">
                With over 1,000 offices in more than 100 countries, no other
                real estate network can match our global reach. We connect your
                property with qualified buyers from around the world.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-16 md:mt-40 pt-8 border-t border-base-200">
            <div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-medium text-base-900">
                Prime Exposure
              </h3>
              <p className="text-base text-base-500 mt-4">
                Your property receives maximum visibility through our premium
                marketing channels, including exclusive partnerships with
                leading luxury publications and digital platforms worldwide.
              </p>
            </div>
            <div>
              <div className="aspect-[4/3] overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80"
                  alt="Prime Exposure"
                  width={800}
                  height={600}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
            <div className="order-2 lg:order-1">
              <div className="aspect-[4/3] overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&q=80"
                  alt="Global Connections"
                  width={800}
                  height={600}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h3 className="text-lg sm:text-xl md:text-2xl font-medium text-base-900">
                Global Connections
              </h3>
              <p className="text-base text-base-500 mt-4">
                Tap into our extensive network of international buyers and
                investors. Our agents leverage global relationships to bring
                qualified prospects to your doorstep.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
            <div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-medium text-base-900">
                Unmatched Marketing
              </h3>
              <p className="text-base text-base-500 mt-4">
                From professional photography and videography to targeted
                digital campaigns and print publications, we create a bespoke
                marketing plan for every property we represent.
              </p>
            </div>
            <div>
              <div className="aspect-[4/3] overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80"
                  alt="Unmatched Marketing"
                  width={800}
                  height={600}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            </div>
          </div>

          <div className="mt-16 md:mt-40 pt-8 border-t border-base-200 grid lg:grid-cols-3 gap-8">
            <h2 className="text-lg sm:text-xl md:text-2xl font-medium text-base-900">
              Contact us about selling your property
            </h2>
            <div className="lg:col-span-2 lg:col-start-2">
              <SellForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
