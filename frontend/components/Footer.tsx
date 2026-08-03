import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white pt-20 pb-8 px-8 md:px-16 overflow-hidden">
      <div className="mx-auto max-w-7xl">
        {/* Top Headline */}
        <div className="mb-16">
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-medium tracking-tight text-white leading-[1.1]">
            Lets build <br />
            <span className="text-zinc-400 font-normal">incredible work together.</span>
          </h2>
        </div>

        {/* Email & Socials Row */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8 pb-8">
          <div>
            <span className="text-xs text-zinc-500 uppercase tracking-wider block mb-2">
              Email & Contact
            </span>
            <a
              href="mailto:imtiyaj.codes@gmail.com"
              className="text-lg md:text-xl font-medium text-white hover:text-zinc-300 transition-colors"
            >
              imtiyaj.codes@gmail.com
            </a>
            <p className="text-sm text-zinc-400 mt-1">
              Govind Singh &middot; +91 96100 16666
            </p>
          </div>

          <div>
            <span className="text-xs text-zinc-500 uppercase tracking-wider block mb-2 sm:text-right">
              Socials
            </span>
            <div className="flex items-center gap-3">
              {/* LinkedIn */}
              <a
                href="#"
                aria-label="LinkedIn"
                className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:bg-zinc-200 transition-transform hover:scale-105"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                </svg>
              </a>

              {/* GitHub */}
              <a
                href="#"
                aria-label="GitHub"
                className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:bg-zinc-200 transition-transform hover:scale-105"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
                </svg>
              </a>

              {/* X / Twitter */}
              <a
                href="#"
                aria-label="X"
                className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:bg-zinc-200 transition-transform hover:scale-105"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Divider Line */}
        <div className="border-t border-zinc-800 my-6"></div>

        {/* Navigation Bar */}
        <div className="flex flex-wrap items-center gap-6 text-sm text-zinc-300 py-2">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <Link href="/for-sale" className="hover:text-white transition-colors">
            Properties For Sale
          </Link>
          <Link href="/for-rent" className="hover:text-white transition-colors">
            Properties For Rent
          </Link>
          <Link href="/sell-property" className="hover:text-white transition-colors">
            Sell Property
          </Link>
          <Link href="/contact" className="hover:text-white transition-colors">
            Contact
          </Link>
        </div>

        {/* Location & Copyright */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-zinc-500 pt-6">
          <div>
            Based in <span className="text-zinc-300 font-medium">Rajasthan, India</span>
          </div>
          <div>
            &copy; 2006-{currentYear} Fair Deal Property. All Rights Reserved.
          </div>
        </div>

        {/* Giant Bottom Branding Watermark */}
        <div className="pt-16 pb-4 text-center overflow-hidden">
          <h1 className="text-[14vw] sm:text-[15vw] font-bold tracking-tighter text-white leading-none select-none opacity-90 pointer-events-none">
            Imtiyaz
          </h1>
        </div>
      </div>
    </footer>
  );
}
