"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import InquiriesPanel from "@/components/admin/InquiriesPanel";
import PropertiesPanel from "@/components/admin/PropertiesPanel";
import { getAdminInquiries, getProperties } from "@/lib/api";

type Tab = "inquiries" | "properties";

interface Stats {
  total: number;
  contact: number;
  sell: number;
  agent: number;
  properties: number;
}

const EMPTY_STATS: Stats = { total: 0, contact: 0, sell: 0, agent: 0, properties: 0 };

export default function AdminDashboard() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [tab, setTab] = useState<Tab>("inquiries");
  const [stats, setStats] = useState<Stats>(EMPTY_STATS);

  useEffect(() => {
    const t = localStorage.getItem("admin_token");
    if (!t) {
      router.replace("/admin/login");
      return;
    }
    const id = setTimeout(() => setToken(t), 0);
    return () => clearTimeout(id);
  }, [router]);

  useEffect(() => {
    if (!token) return;
    let cancelled = false;
    (async () => {
      try {
        const [all, contact, sell, agent, props] = await Promise.all([
          getAdminInquiries(token, { limit: 100 }),
          getAdminInquiries(token, { kind: "CONTACT", limit: 1 }),
          getAdminInquiries(token, { kind: "SELL", limit: 1 }),
          getAdminInquiries(token, { kind: "AGENT", limit: 1 }),
          getProperties({ limit: 1 }),
        ]);
        if (cancelled) return;
        setStats({
          total: all.total,
          contact: contact.total,
          sell: sell.total,
          agent: agent.total,
          properties: props.total,
        });
      } catch {
        if (!cancelled) setStats(EMPTY_STATS);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [token]);

  function handleLogout() {
    localStorage.removeItem("admin_token");
    router.replace("/admin/login");
  }

  if (!token) {
    return (
      <div className="grid min-h-screen place-items-center bg-base-50">
        <div className="h-9 w-9 animate-spin rounded-full border-2 border-base-200 border-t-base-900" />
      </div>
    );
  }

  const nav = [
    { key: "inquiries" as Tab, label: "Inquiries", icon: <InboxIcon className="h-[18px] w-[18px]" /> },
    { key: "properties" as Tab, label: "Properties", icon: <BuildingIcon className="h-[18px] w-[18px]" /> },
  ];

  return (
    <div className="min-h-screen bg-base-50">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-base-200 bg-white lg:flex">
        <div className="flex h-16 shrink-0 items-center gap-3 border-b border-base-100 px-6">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-base-900 text-white">
            <BuildingIcon className="h-4 w-4" />
          </span>
          <div className="leading-tight">
            <p className="text-sm font-semibold tracking-tight text-base-900">Fair Deal</p>
            <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-base-400">
              Admin panel
            </p>
          </div>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto p-4">
          <p className="px-4 pb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-base-400">
            Menu
          </p>
          {nav.map((item) => (
            <button
              key={item.key}
              onClick={() => setTab(item.key)}
              className={`flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all cursor-pointer ${
                tab === item.key
                  ? "bg-base-900 text-white shadow-lg shadow-base-900/10"
                  : "text-base-500 hover:bg-base-100 hover:text-base-900"
              }`}
            >
              {item.icon}
              {item.label}
              {item.key === "inquiries" && stats.total > 0 && (
                <span
                  className={`ml-auto rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                    tab === item.key ? "bg-white/20 text-white" : "bg-base-100 text-base-500"
                  }`}
                >
                  {stats.total}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="shrink-0 border-t border-base-100 p-4">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-base-500 transition-colors hover:bg-red-50 hover:text-red-600 cursor-pointer"
          >
            <LogoutIcon className="h-[18px] w-[18px]" />
            Log out
          </button>
        </div>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-base-200 bg-white/85 px-5 backdrop-blur-md md:px-10">
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-base-900 text-white lg:hidden">
              <BuildingIcon className="h-4 w-4" />
            </span>
            <div className="leading-tight">
              <h1 className="text-[15px] font-semibold tracking-tight text-base-900">Dashboard</h1>
              <p className="text-xs text-base-400">Fair Deal Property</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-base-500 transition-colors hover:bg-base-100 hover:text-base-900 cursor-pointer"
          >
            <LogoutIcon className="h-4 w-4" />
            <span className="lg:hidden">Log out</span>
          </button>
        </header>

        <main className="space-y-8 px-5 py-8 md:px-10">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5">
            <StatCard
              label="Total inquiries"
              value={stats.total}
              dark
              icon={<InboxIcon className="h-4 w-4" />}
            />
            <StatCard label="Contact" value={stats.contact} icon={<ContactIcon className="h-4 w-4" />} />
            <StatCard label="Sell" value={stats.sell} icon={<SellIcon className="h-4 w-4" />} />
            <StatCard label="Agent" value={stats.agent} icon={<AgentIcon className="h-4 w-4" />} />
            <StatCard
              label="Properties"
              value={stats.properties}
              icon={<BuildingIcon className="h-4 w-4" />}
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold tracking-tight text-base-900">
                {tab === "inquiries" ? "Inquiries" : "Properties"}
              </h2>
              <p className="text-sm text-base-400">
                {tab === "inquiries"
                  ? "Messages from your site visitors"
                  : "Manage your real estate listings"}
              </p>
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-base-200 bg-white p-1.5 shadow-sm lg:hidden">
              {nav.map((item) => (
                <button
                  key={item.key}
                  onClick={() => setTab(item.key)}
                  className={`flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium transition-colors cursor-pointer ${
                    tab === item.key ? "bg-base-900 text-white" : "text-base-500 hover:text-base-900"
                  }`}
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {tab === "inquiries" ? (
            <InquiriesPanel token={token} />
          ) : (
            <PropertiesPanel token={token} />
          )}
        </main>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon,
  dark,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <div
      className={`group rounded-2xl border p-5 transition-all duration-300 ${
        dark
          ? "border-base-900 bg-base-900 text-white shadow-lg shadow-base-900/10"
          : "border-base-200 bg-white hover:-translate-y-0.5 hover:shadow-lg hover:shadow-base-900/5"
      }`}
    >
      <div className="flex items-center justify-between">
        <p
          className={`text-[11px] font-semibold uppercase tracking-[0.15em] ${
            dark ? "text-base-400" : "text-base-400"
          }`}
        >
          {label}
        </p>
        <span
          className={`grid h-7 w-7 place-items-center rounded-lg ${
            dark ? "bg-white/10 text-white" : "bg-base-100 text-base-600 group-hover:text-base-900"
          } transition-colors`}
        >
          {icon}
        </span>
      </div>
      <p className="mt-3 text-3xl font-semibold tracking-tight tabular-nums">{value}</p>
    </div>
  );
}

function InboxIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H6.911a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661Z"
      />
    </svg>
  );
}

function BuildingIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"
      />
    </svg>
  );
}

function LogoutIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
      />
    </svg>
  );
}

function ContactIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
      />
    </svg>
  );
}

function SellIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
      />
    </svg>
  );
}

function AgentIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
      />
    </svg>
  );
}
