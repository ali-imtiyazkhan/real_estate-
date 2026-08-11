"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

interface QuickFilterBarProps {
  basePath: string;
}

type ListingTypeFilter = "all" | "sale" | "rent" | "coming-soon";

export default function QuickFilterBar({ basePath }: QuickFilterBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [typeFilter, setTypeFilter] = useState<ListingTypeFilter>(
    (searchParams.get("type") as ListingTypeFilter) ?? "all"
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    if (typeFilter !== "all") params.set("type", typeFilter);
    router.push(`${basePath}?${params.toString()}`);
  };

  const handleClear = () => {
    setQuery("");
    setTypeFilter("all");
    router.push(basePath);
  };

  const filterOptions: { value: ListingTypeFilter; label: string }[] = [
    { value: "all", label: "All Types" },
    { value: "sale", label: "For Sale" },
    { value: "rent", label: "For Rent" },
    { value: "coming-soon", label: "Coming Soon" },
  ];

  return (
    <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 mb-8">
      <div className="relative flex-1">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by location, title, or project name..."
          className="w-full px-4 py-2.5 text-sm bg-base-50 border border-base-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-base-900"
        />
      </div>

      <div className="flex gap-2">
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value as ListingTypeFilter)}
          className="px-4 py-2.5 bg-base-50 border border-base-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-base-900 min-w-[140px]"
        >
          {filterOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="px-5 py-2.5 bg-base-900 text-white text-sm font-medium rounded-lg hover:bg-base-800 transition-colors"
        >
          Search Properties
        </button>

        {(query || typeFilter !== "all") && (
          <button
            type="button"
            onClick={handleClear}
            className="px-4 py-2.5 bg-base-200 text-base-800 text-sm font-medium rounded-lg hover:bg-base-300 transition-colors"
          >
            Clear
          </button>
        )}
      </div>
    </form>
  );
}
