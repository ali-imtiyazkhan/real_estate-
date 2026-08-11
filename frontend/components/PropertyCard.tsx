import Link from "next/link";
import Image from "next/image";

interface PropertyCardProps {
  id: string;
  slug?: string;
  title: string;
  projectName: string;
  address: string;
  location: string;
  sqft: string;
  floor: string;
  rooms: string;
  price: string;
  image: string;
  listingType?: "SALE" | "RENT" | "COMING_SOON";
  isRental?: boolean;
}

export default function PropertyCard({
  id,
  slug,
  title,
  projectName,
  address,
  location,
  sqft,
  floor,
  rooms,
  price,
  image,
  listingType,
}: PropertyCardProps) {
  const isComingSoon = listingType === "COMING_SOON";
  const isSale = listingType === "SALE";
  const isRent = listingType === "RENT";

  return (
    <Link
      href={`/property/${slug ?? id}`}
      title={title}
      className="text-xs 2xl:text-sm duration-300 hover:!opacity-100 transition-all group-hover/props:opacity-40 focus-visible:!opacity-100 rounded-sm outline-offset-4"
    >
      <div className="relative overflow-hidden group/card">
        <Image
          src={image}
          alt={title}
          width={400}
          height={400}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="aspect-[4/3] object-cover object-center group-hover/card:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-linear-to-t from-base-900/25 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />
        <div className="bg-white absolute bottom-0 right-0 px-4 py-3 text-xs font-medium uppercase tracking-wider text-base-900 shadow-sm translate-y-0 group-hover/card:-translate-y-0.5 transition-transform duration-300">
          View listing
        </div>
        {(isComingSoon || isSale || isRent) && (
          <div className="absolute top-3 left-3 z-10">
            {isComingSoon && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-500 text-white text-xs font-semibold uppercase tracking-wider rounded-full shadow-lg">
                <svg className="w-3 h-3 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                Coming Soon
              </span>
            )}
            {isSale && (
              <span className="inline-flex items-center px-3 py-1.5 bg-base-900 text-white text-xs font-semibold uppercase tracking-wider rounded-full shadow-lg">
                For Sale
              </span>
            )}
            {isRent && (
              <span className="inline-flex items-center px-3 py-1.5 bg-accent-600 text-white text-xs font-semibold uppercase tracking-wider rounded-full shadow-lg">
                For Rent
              </span>
            )}
          </div>
        )}
      </div>
      <div className="pt-5 pb-1">
        <p className="section-label">{projectName}</p>
        <h3 className="text-lg font-medium text-base-900 mt-2 tracking-tight">{address}</h3>
        <p className="text-sm text-base-500 mt-1">{location}</p>
      </div>
      <dl className="w-full border-t border-base-200 mt-4 pt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
        <div>
          <dt className="text-base-500 text-xs uppercase tracking-wide">Sqft</dt>
          <dd className="text-base-900 font-medium mt-1 tabular-nums">{sqft}</dd>
        </div>
        <div>
          <dt className="text-base-500 text-xs uppercase tracking-wide">Rooms</dt>
          <dd className="text-base-900 font-medium mt-1 tabular-nums">{rooms}</dd>
        </div>
        <div>
          <dt className="text-base-500 text-xs uppercase tracking-wide">Floor</dt>
          <dd className="text-base-900 font-medium mt-1 tabular-nums">{floor}</dd>
        </div>
      </dl>
      <p className="text-xl font-medium text-base-900 mt-4 pt-4 border-t border-base-200 tabular-nums tracking-tight">
        {price}
      </p>
    </Link>
  );
}
