"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const primaryNav = [
  { href: "/for-sale", label: "For sale" },
  { href: "/for-rent", label: "For rent" },
  { href: "/coming-soon", label: "Coming soon" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = useState(pathname);

  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMenuOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={`sticky top-0 z-40 px-8 md:px-12 pt-4 pb-4 transition-[background-color,box-shadow,border-color] duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md border-b border-base-200 shadow-[0_1px_0_rgba(0,0,0,0.04)]"
          : "bg-white/80 backdrop-blur-sm border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="relative">
          <div className="flex items-center justify-between w-full gap-6">
            <Link
              href="/"
              aria-label="Go to homepage"
              className="shrink-0 rounded-sm transition-opacity hover:opacity-70"
            >
              <span className="sr-only">Go to homepage</span>
              <Image
                src="/logo.jpeg"
                alt="Logo"
                width={100}
                height={40}
                className="h-8 w-auto"
              />
            </Link>

            <nav
              aria-label="Primary"
              className="hidden lg:flex items-center gap-6 text-base-900 uppercase text-xs font-medium tracking-wide"
            >
              {primaryNav.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={`hover:text-base-500 transition-colors ${
                    pathname === href || pathname.startsWith(`${href}/`)
                      ? "text-base-900 underline underline-offset-8 decoration-base-300"
                      : "text-base-600"
                  }`}
                >
                  {label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-4 lg:gap-6 ml-auto lg:ml-0">
              <div className="hidden md:flex flex-col items-end leading-tight">
                <span className="text-sm font-medium text-base-900">Mr. Govind Singh</span>
                <a href="tel:+919610016666" className="text-xs text-base-600 hover:text-base-900 transition-colors">
                  +91 9610016666
                </a>
              </div>
              <Link
                href="/admin"
                className="px-4 py-2 rounded-sm bg-base-900 text-white text-xs font-medium uppercase tracking-wide transition-colors hover:bg-base-700"
              >
                Admin
              </Link>
              <button
                id="menubutton"
                type="button"
                aria-expanded={menuOpen}
                aria-controls="megamenu"
                aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
                onClick={() => setMenuOpen(!menuOpen)}
                className="p-2 -mr-2 rounded-sm text-base-900 hover:bg-base-100 transition-colors"
              >
                <span className="sr-only">Toggle navigation menu</span>
                {menuOpen ? (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor" className="size-5">
                    <path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor" className="size-5">
                    <path d="M200,42H56A14,14,0,0,0,42,56V200a14,14,0,0,0,14,14H200a14,14,0,0,0,14-14V56A14,14,0,0,0,200,42Zm2,14v66H134V54h66A2,2,0,0,1,202,56ZM56,54h66v68H54V56A2,2,0,0,1,56,54ZM54,200V134h68v68H56A2,2,0,0,1,54,200Zm146,2H134V134h68v66A2,2,0,0,1,200,202Z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
          <nav
            id="megamenu"
            role="navigation"
            aria-labelledby="menubutton"
            data-state={menuOpen ? "open" : "closed"}
            className={`grid text-sm text-base-600 transition-all duration-500 ease-[cubic-bezier(.4,.0,.20,1)] border-b border-base-200 ${
              menuOpen
                ? "grid-rows-[1fr] opacity-100 visible w-full mt-4"
                : "grid-rows-[0fr] opacity-0 invisible w-0 overflow-hidden ml-auto max-h-0"
            }`}
          >
            <div className={`overflow-hidden ${menuOpen ? "border-t border-base-200" : "border-none"}`}>
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 py-8 xl:divide-x xl:divide-base-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="md:col-span-2">
                    <h2 className="section-label">Navigation</h2>
                    <ul className="list-none text-base-500 mt-4 text-base gap-1 list-inside grid grid-cols-1 md:grid-cols-2 lg:col-span-2">
                      <li><Link href="/for-sale" className="hover:text-base-900 py-1 inline-block transition-colors">Properties for sale</Link></li>
                      <li><Link href="/for-rent" className="hover:text-base-900 py-1 inline-block transition-colors">Properties for rent</Link></li>
                      <li><Link href="/coming-soon" className="hover:text-base-900 py-1 inline-block transition-colors">Coming soon</Link></li>
                      <li><Link href="/sell-property" className="hover:text-base-900 py-1 inline-block transition-colors">Sell your property</Link></li>
                      <li><Link href="/contact" className="hover:text-base-900 py-1 inline-block transition-colors">Contact us</Link></li>
                    </ul>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:col-span-2 xl:pl-8">
                  <div className="grid grid-cols-1 gap-8 2xl:grid-cols-2">
                    <div className="flex flex-col h-full justify-between">
                      <div>
                        <h3 className="text-base text-base-900 font-medium">Access our local expertise and exceptional service</h3>
                        <p className="text-sm mt-2 text-pretty text-base-500">With experts in every part of the world, we are local everywhere—with innovative technology and unrivaled service.</p>
                      </div>
                      <div className="mt-8">
                        <Link href="/contact" className="link-arrow text-sm">Get in touch</Link>
                      </div>
                    </div>
                    <Image
                      src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&q=80"
                      alt="House"
                      width={400}
                      height={400}
                      sizes="(min-width: 1280px) 400px, 0px"
                      className="aspect-[4/3] hidden xl:block 2xl:aspect-[4/7] hover:scale-105 transition-transform object-cover object-top duration-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
