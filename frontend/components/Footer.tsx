import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const exploreLinks = [
    { href: "/for-sale", label: "Properties for Sale" },
    { href: "/for-rent", label: "Properties for Rent" },
    { href: "/sell-property", label: "Sell Your Property" },
    { href: "/contact", label: "Contact Us" },
  ];

  return (
    <footer className="relative bg-black text-white overflow-hidden">
      {/* Ambient glow */}
      <div
        aria-hidden
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[60rem] h-80 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ background: "radial-gradient(closest-side, rgba(255,255,255,0.8), transparent)" }}
      />

      <div className="relative mx-auto max-w-7xl px-8 md:px-12 py-20 md:py-28">
        {/* Brand + CTA */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <Link href="/" aria-label="Fair Deal Property" className="inline-block rounded-sm hover:opacity-80 transition-opacity">
              <span className="sr-only">Fair Deal Property</span>
              <Image
                src="/logo.jpeg"
                alt="Fair Deal Property"
                width={100}
                height={40}
                className="h-9 w-auto"
              />
            </Link>
            <h2 className="text-4xl sm:text-5xl font-medium tracking-tight text-white leading-[1.05] mt-8">
              Find your next <span className="text-zinc-500">home.</span>
            </h2>
            <p className="text-zinc-400 mt-6 max-w-sm text-pretty">
              Fair Deal Property brings local expertise and personalized service to every search — buying, selling or renting.
            </p>
          </div>

          <div className="lg:justify-self-end">
            <span className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-medium block">
              Get in touch
            </span>
            <a
              href="tel:+919610016666"
              className="text-3xl sm:text-4xl font-medium tracking-tight text-white hover:text-zinc-300 transition-colors mt-4 inline-block"
            >
              +91 96100 16666
            </a>
            <p className="text-zinc-400 mt-2 text-sm">
              Govind Singh &middot; Available everyday, 9am–9pm
            </p>
          </div>
        </div>

        {/* Glass panel */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mt-20 border-t border-white/10 pt-14 backdrop-blur-xl bg-white/[0.03] rounded-2xl p-10 border border-white/10">
          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-medium">Explore</h3>
            <ul className="mt-5 space-y-3">
              {exploreLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-zinc-400 hover:text-white transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-medium">Contact</h3>
            <ul className="mt-5 space-y-3 text-sm text-zinc-400">
              <li>
                <a href="tel:+919610016666" className="hover:text-white transition-colors">
                  +91 96100 16666
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/919610016666"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  WhatsApp Us
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-medium">Services</h3>
            <ul className="mt-5 space-y-3 text-sm text-zinc-400">
              <li>Property Sales</li>
              <li>Rental Listings</li>
              <li>Home Valuation</li>
              <li>Buying Assistance</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-medium">Socials</h3>
            <div className="flex items-center gap-3 mt-5">
              <a
                href="https://wa.me/919610016666"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-10 h-10 rounded-full border border-white/15 text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
                </svg>
              </a>
              <a
                href="tel:+919610016666"
                aria-label="Call"
                className="w-10 h-10 rounded-full border border-white/15 text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-16 pt-8 border-t border-white/10 text-xs text-zinc-500">
          <p>
            &copy; 2006-{currentYear} Fair Deal Property. All rights reserved.
          </p>
          <nav aria-label="Footer" className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm uppercase tracking-wide font-medium">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <Link href="/for-sale" className="hover:text-white transition-colors">For Sale</Link>
            <Link href="/for-rent" className="hover:text-white transition-colors">For Rent</Link>
            <Link href="/sell-property" className="hover:text-white transition-colors">Sell Property</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}