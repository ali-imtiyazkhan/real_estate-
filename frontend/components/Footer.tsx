import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white pt-20 pb-0 px-8 md:px-16 overflow-hidden relative">
      <div className="mx-auto max-w-7xl">
        {/* Top Headline */}
        <div className="mb-16">
          <h2 className="text-5xl sm:text-7xl md:text-8xl font-normal tracking-tight text-white leading-[1.05]">
            Lets build <br />
            <span className="text-zinc-500 font-normal">incredible work together.</span>
          </h2>
        </div>

        {/* Email / Contact & Socials Row */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8 pb-8">
          <div>
            <span className="text-xs text-zinc-500 font-medium block mb-2">
              Contact / Phone
            </span>
            <a
              href="tel:+919610016666"
              className="text-lg md:text-xl font-medium text-white hover:text-zinc-300 transition-colors"
            >
              +91 96100 16666
            </a>
            <p className="text-xs text-zinc-400 mt-1">
              Govind Singh &middot; Fair Deal Property
            </p>
          </div>

          <div>
            <span className="text-xs text-zinc-500 font-medium block mb-2 sm:text-right">
              Socials
            </span>
            <div className="flex items-center gap-3">
              {/* WhatsApp */}
              <a
                href="https://wa.me/919610016666"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center hover:bg-zinc-200 transition-transform hover:scale-105"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
                </svg>
              </a>

              {/* Call */}
              <a
                href="tel:+919610016666"
                aria-label="Call"
                className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center hover:bg-zinc-200 transition-transform hover:scale-105"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                </svg>
              </a>

              {/* LinkedIn / Social */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center hover:bg-zinc-200 transition-transform hover:scale-105"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Thin Divider Line */}
        <div className="border-t border-zinc-800/80 my-4"></div>

        {/* Navigation Links */}
        <div className="flex flex-wrap items-center gap-6 text-sm text-zinc-300 py-3">
          <Link href="/" className="hover:text-white transition-colors font-medium">
            Home
          </Link>
          <Link href="/for-sale" className="hover:text-white transition-colors font-medium">
            Properties For Sale
          </Link>
          <Link href="/for-rent" className="hover:text-white transition-colors font-medium">
            Properties For Rent
          </Link>
          <Link href="/sell-property" className="hover:text-white transition-colors font-medium">
            Sell Property
          </Link>
          <Link href="/contact" className="hover:text-white transition-colors font-medium">
            Contact
          </Link>
        </div>

        {/* Location & Copyright Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-zinc-400 pt-6 pb-12">
          <div>
            Based in <span className="font-semibold text-zinc-200">Rajasthan, India</span>
          </div>
          <div>
            &copy; 2006-{currentYear} Fair Deal Property. All Rights Reserved.
          </div>
        </div>
      </div>

      {/* Giant Bottom Branding Watermark with Bottom Fade & Blur Effect */}
      <div className="relative w-full pt-4 pb-0 overflow-hidden select-none pointer-events-none">
        <h1
          className="text-[16vw] sm:text-[17vw] md:text-[18vw] font-bold tracking-tighter text-white leading-none text-center transform translate-y-[12%]"
          style={{
            WebkitMaskImage: "linear-gradient(to bottom, rgba(0, 0, 0, 1) 25%, rgba(0, 0, 0, 0.15) 80%, rgba(0, 0, 0, 0) 100%)",
            maskImage: "linear-gradient(to bottom, rgba(0, 0, 0, 1) 25%, rgba(0, 0, 0, 0.15) 80%, rgba(0, 0, 0, 0) 100%)",
          }}
        >
          Fair Deal
        </h1>

        {/* Bottom Blur Overlay fading into the bottom screen edge */}
        <div className="absolute bottom-0 inset-x-0 h-36 bg-gradient-to-t from-black via-black/80 to-transparent backdrop-blur-[6px] pointer-events-none" />
      </div>
    </footer>
  );
}

