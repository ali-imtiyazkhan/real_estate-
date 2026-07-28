import Link from "next/link";
import SearchModal from "@/components/SearchModal";
import { agents } from "@/lib/data";

export default function Agents() {
  return (
    <>
      <section>
        <div className="mx-auto max-w-7xl px-8 md:px-12 pb-12">
          <img
            src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=1500&q=80"
            alt="Agents"
            loading="lazy"
            decoding="async"
            width="1500"
            height="1000"
            className="w-full h-[60vh] 2xl:h-[75vh] object-cover"
          />
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-balance font-medium tracking-tighter text-base-900">
              Worldwide agents
            </h1>
            <div className="lg:col-span-2">
              <SearchModal results={agents} searchKeys={["name", "role", "office"]} />
              <div className="flex flex-col divide-y divide-base-200">
                {agents.map((agent) => (
                  <a
                    key={agent.id}
                    href="#"
                    title={agent.name}
                    className="relative isolate flex flex-col gap-8 lg:flex-row text-sm 2xl:text-base py-8"
                  >
                    <div className="relative aspect-[4/4] sm:aspect-[16/12] lg:aspect-square lg:shrink-0 lg:w-40 lg:h-40">
                      <img
                        src={agent.image}
                        alt={agent.name}
                        loading="lazy"
                        decoding="async"
                        width="400"
                        height="400"
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col w-full">
                      <h3 className="text-base sm:text-lg md:text-xl font-medium text-base-900">
                        {agent.name}
                        <span className="mt-2 text-base-500 text-sm ml-2 font-normal">{agent.role}</span>
                      </h3>
                      <p className="text-sm text-base-500 mt-1">{agent.phone}</p>
                      <p className="text-sm text-base-500">{agent.phone2}</p>
                      <div className="mt-2">
                        <p className="text-base text-base-900 font-medium">{agent.office}</p>
                        <p className="text-base text-base-500">{agent.address}</p>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
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
                    The Quartiere International Realty&reg; network is an exclusive
                    association of distinguished residential luxury real estate
                    brokerage companies throughout the world.
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
