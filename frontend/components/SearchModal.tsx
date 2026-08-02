"use client";

import { useState, useRef, useEffect, useCallback } from "react";

interface SearchResult {
  id: string;
  slug?: string;
  title?: string;
  projectName?: string;
  name?: string;
  address?: string;
  price?: string;
  role?: string;
  office?: string;
}

interface SearchModalProps {
  results: SearchResult[];
  searchKeys: string[];
}

export default function SearchModal({ results, searchKeys }: SearchModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState<SearchResult[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const open = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(true);
    document.body.style.overflow = "hidden";
    setTimeout(() => inputRef.current?.focus(), 100);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    document.body.style.overflow = "";
    setQuery("");
    setFiltered([]);
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) close();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, close]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim().toLowerCase();
    setQuery(value);
    if (!value) {
      setFiltered([]);
      return;
    }
    const f = results.filter((r) =>
      searchKeys.some((key) => {
        const val = (r as unknown as Record<string, string>)[key];
        return val?.toLowerCase().includes(value);
      })
    );
    setFiltered(f);
  };

  return (
    <>
      <button
        type="button"
        id="searchButton"
        aria-label="Search posts"
        onClick={open}
        className="h-14 flex gap-3 items-center border-0 border-b border-base-200 text-base-900 w-full appearance-none cursor-pointer text-sm font-medium hover:border-base-400 transition-colors rounded-sm"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="size-4" fill="currentColor" viewBox="0 0 256 256">
          <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z" />
        </svg>
        Search
      </button>

      {isOpen && (
        <div
          id="searchModal"
          className="fixed inset-0 z-50 overflow-y-auto"
          role="dialog"
          aria-modal="true"
        >
          <div className="min-h-screen px-4 text-center">
            <div
              className="fixed inset-0 bg-base-100/80 backdrop-blur transition-opacity"
              id="modalOverlay"
              onClick={close}
            />
            <div className="inline-block w-full max-w-2xl px-8 mb-8 mt-12 lg:mt-48 p-8 bg-white shadow-xl shadow-base-900/5 ring-1 ring-base-200 text-left align-middle relative animate-modal-in">
              <button
                type="button"
                onClick={close}
                aria-label="Close search"
                className="absolute top-6 right-6 p-2 text-base-500 hover:text-base-900 hover:bg-base-100 rounded-sm transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor" className="size-5">
                  <path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z" />
                </svg>
              </button>
              <input
                ref={inputRef}
                id="searchInput"
                type="text"
                placeholder="Search..."
                value={query}
                onChange={handleInput}
                className="h-14 border-0 border-b border-base-200 text-base-900 w-full text-sm outline-none bg-transparent appearance-none focus:shadow-[inset_0_-2px_0_#000] focus:border-black placeholder:text-base-400"
              />
              <div
                id="searchResults"
                className={`max-h-100 overflow-y-auto bg-base-50 w-full scrollbar-hide ${filtered.length > 0 || (query && filtered.length === 0) ? "block" : "hidden"}`}
              >
                {query && filtered.length === 0 && (
                  <div className="p-8">
                    <h3 className="font-medium text-base text-base-900">
                      There&apos;s nothing here...
                    </h3>
                  </div>
                )}
                {filtered.map((r) => (
                  <a
                    key={r.id}
                    href={`/property/${r.slug ?? r.id}`}
                    className="block p-6 md:p-8 duration-300 hover:bg-base-100 border-t border-base-200 first:border-t-0 gap-2 transition-colors"
                  >
                    <h3 className="font-medium text-base text-base-900 block">
                      {r.projectName || r.title || r.name}
                    </h3>
                    {r.address && (
                      <p className="text-base-500 text-sm mt-1 block">
                        {r.address}, {r.price}
                      </p>
                    )}
                    {r.role && (
                      <p className="text-base-500 text-sm mt-1 block">
                        {r.role}, {r.office}
                      </p>
                    )}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
