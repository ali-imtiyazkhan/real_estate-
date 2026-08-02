"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import InquiriesPanel from "@/components/admin/InquiriesPanel";
import PropertiesPanel from "@/components/admin/PropertiesPanel";

export default function AdminDashboard() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [tab, setTab] = useState<"inquiries" | "properties">("inquiries");

  useEffect(() => {
    const t = localStorage.getItem("admin_token");
    if (!t) {
      router.replace("/admin/login");
      return;
    }
    const id = setTimeout(() => setToken(t), 0);
    return () => clearTimeout(id);
  }, [router]);

  function handleLogout() {
    localStorage.removeItem("admin_token");
    router.replace("/admin/login");
  }

  if (!token) {
    return null;
  }

  return (
    <section className="overflow-hidden">
      <div className="mx-auto max-w-7xl px-8 md:px-12 pb-12 lg:pt-32">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <h1 className="text-2xl md:text-3xl font-medium tracking-tighter text-base-900">
            Admin dashboard
          </h1>
          <button onClick={handleLogout} className="text-sm text-base-500 hover:text-base-900 cursor-pointer">
            Log out
          </button>
        </div>

        <div className="flex gap-2 mb-10 border-b border-base-200">
          {(
            [
              ["inquiries", "Inquiries"],
              ["properties", "Properties"],
            ] as const
          ).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`px-5 py-3 text-sm font-medium -mb-px border-b-2 transition-colors cursor-pointer ${
                tab === key
                  ? "border-base-900 text-base-900"
                  : "border-transparent text-base-500 hover:text-base-900"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {tab === "inquiries" ? (
          <InquiriesPanel token={token} />
        ) : (
          <PropertiesPanel token={token} />
        )}
      </div>
    </section>
  );
}
