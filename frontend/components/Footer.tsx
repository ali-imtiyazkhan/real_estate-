import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <section>
      <div className="mx-auto max-w-7xl px-8 md:px-12 pb-12 pt-20 md:pt-40">
        <div className="relative overflow-hidden">
          <div className="items-center justify-center flex flex-col text-black">
            <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-base-900">Fair Deal Property</h2>
          </div>
          <div className="pt-8 mt-8 border-t border-base-200">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div>
                <h3 className="text-base text-base-900">Navigation</h3>
                <ul className="list-none text-base-500 mt-8 text-base gap-1 list-inside flex flex-col">
                  <li><Link href="/system/overview" className="hover:text-base-900 text-base-500 mt-auto flex gap-3 items-center justify-between">Overview</Link></li>
                  <li><Link href="/system/colors" className="hover:text-base-900 text-base-500 mt-auto flex gap-3 items-center justify-between">Colors</Link></li>
                  <li><Link href="/system/links" className="hover:text-base-900 text-base-500 mt-auto flex gap-3 items-center justify-between">Links</Link></li>
                  <li><Link href="/system/buttons" className="hover:text-base-900 text-base-500 mt-auto flex gap-3 items-center justify-between">Buttons</Link></li>
                  <li><Link href="/system/typography" className="hover:text-base-900 text-base-500 mt-auto flex gap-3 items-center justify-between">Typography</Link></li>
                  <li><a href="https://www.lexingtonthemes.com/documentation" className="hover:text-base-900 text-base-500 mt-auto flex gap-3 items-center justify-between">Documentation</a></li>
                  <li><a href="https://www.lexingtonthemes.com/legal/license" className="hover:text-base-900 text-base-500 mt-auto flex gap-3 items-center justify-between">License</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-base text-base-900">Social</h3>
                <ul className="list-none text-base-500 mt-8 text-base gap-1 list-inside flex flex-col">
                  <li><a href="#" className="hover:text-base-900 text-base-500 mt-auto flex gap-3 items-center justify-between">X</a></li>
                  <li><a href="#" className="hover:text-base-900 text-base-500 mt-auto flex gap-3 items-center justify-between">Facebook</a></li>
                  <li><a href="#" className="hover:text-base-900 text-base-500 mt-auto flex gap-3 items-center justify-between">Instagram</a></li>
                  <li><a href="#" className="hover:text-base-900 text-base-500 mt-auto flex gap-3 items-center justify-between">Linkedin</a></li>
                  <li><a href="#" className="hover:text-base-900 text-base-500 mt-auto flex gap-3 items-center justify-between">Youtube</a></li>
                  <li><a href="#" className="hover:text-base-900 text-base-500 mt-auto flex gap-3 items-center justify-between">Tiktok</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-base text-base-900">Properties</h3>
                <ul className="list-none text-base-500 mt-8 text-base gap-1 list-inside flex flex-col">
                  <li><Link href="/for-sale" className="hover:text-base-900 text-base-500 mt-auto flex gap-3 items-center justify-between">All properties for sale</Link></li>
                  <li><Link href="/property/2" className="hover:text-base-900 text-base-500 mt-auto flex gap-3 items-center justify-between">Property for sale details</Link></li>
                  <li><Link href="/for-rent" className="hover:text-base-900 text-base-500 mt-auto flex gap-3 items-center justify-between">All properties for rent</Link></li>
                  <li><Link href="/property/r1" className="hover:text-base-900 text-base-500 mt-auto flex gap-3 items-center justify-between">Property for rent details</Link></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-base-200 space-y-2">
            <span className="text-sm text-base-900">
              Govind Singh &middot; +91 96100 16666
            </span>
            <br />
            <span className="text-sm text-base-900">
              Copyright &copy; 2006-{currentYear} Fair Deal Property. All Rights Reserved.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
