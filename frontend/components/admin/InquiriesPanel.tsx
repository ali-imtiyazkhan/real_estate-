"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { deleteAdminInquiry, getAdminInquiries, type Inquiry, type InquiryKind } from "@/lib/api";

const KIND_LABELS: Record<InquiryKind, string> = {
  CONTACT: "Contact",
  SELL: "Sell",
  AGENT: "Agent",
};

const KIND_BADGE: Record<InquiryKind, string> = {
  CONTACT: "bg-accent-50 text-accent-700 ring-accent-200",
  SELL: "bg-base-900 text-white ring-base-900",
  AGENT: "bg-base-100 text-base-600 ring-base-300",
};

export default function InquiriesPanel({ token }: { token: string }) {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [filter, setFilter] = useState<InquiryKind | "ALL">("ALL");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const loadInquiries = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await getAdminInquiries(token, { limit: 100 });
      setInquiries(res.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load inquiries");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    const id = setTimeout(() => {
      loadInquiries();
    }, 0);
    return () => clearTimeout(id);
  }, [loadInquiries]);

  const counts = useMemo(() => {
    const c = { CONTACT: 0, SELL: 0, AGENT: 0 };
    for (const i of inquiries) c[i.kind] += 1;
    return c;
  }, [inquiries]);

  const visible = useMemo(
    () => (filter === "ALL" ? inquiries : inquiries.filter((i) => i.kind === filter)),
    [inquiries, filter]
  );

  async function handleDelete(id: string) {
    if (!confirm("Delete this inquiry?")) return;
    try {
      await deleteAdminInquiry(token, id);
      setInquiries((prev) => prev.filter((i) => i.id !== id));
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete");
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-base-400">
          Showing {visible.length} of {inquiries.length} loaded
        </p>
        <div className="flex flex-wrap gap-2">
          {(["ALL", "CONTACT", "SELL", "AGENT"] as const).map((k) => {
            const count = k === "ALL" ? inquiries.length : counts[k];
            const active = filter === k;
            return (
              <button
                key={k}
                onClick={() => setFilter(k)}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all cursor-pointer ${
                  active
                    ? "border-base-900 bg-base-900 text-white shadow-lg shadow-base-900/10"
                    : "border-base-200 bg-white text-base-500 hover:border-base-900 hover:text-base-900"
                }`}
              >
                {k === "ALL" ? "All" : KIND_LABELS[k]}
                <span
                  className={`rounded-full px-1.5 py-0.5 text-[11px] font-semibold leading-none ${
                    active ? "bg-white/20 text-white" : "bg-base-100 text-base-500"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-5">
        {error && (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {loading && (
          <div className="space-y-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="animate-pulse rounded-2xl border border-base-200 bg-white p-5">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-base-100" />
                  <div className="flex-1 space-y-2">
                    <div className="h-3.5 w-40 rounded bg-base-100" />
                    <div className="h-3 w-64 rounded bg-base-50" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && visible.length === 0 && (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-base-300 bg-white px-6 py-16 text-center">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-base-100 text-base-400">
              <InboxIcon className="h-6 w-6" />
            </span>
            <p className="mt-4 text-sm font-medium text-base-900">No inquiries yet</p>
            <p className="mt-1 text-sm text-base-400">
              {filter === "ALL"
                ? "Messages from your site forms will appear here."
                : `No ${KIND_LABELS[filter].toLowerCase()} inquiries yet.`}
            </p>
          </div>
        )}

        {!loading && visible.length > 0 && (
          <div className="divide-y divide-base-100 overflow-hidden rounded-2xl border border-base-200 bg-white shadow-sm">
            {visible.map((inq) => {
              const isOpen = expandedId === inq.id;
              return (
                <div key={inq.id} className={isOpen ? "bg-base-50/60" : ""}>
                  <div
                    onClick={() => setExpandedId(isOpen ? null : inq.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setExpandedId(isOpen ? null : inq.id);
                      }
                    }}
                    className="flex w-full cursor-pointer items-center gap-4 p-5 text-left transition-colors hover:bg-base-50"
                  >
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-base-100 text-sm font-semibold text-base-600">
                      {initials(inq.firstName, inq.lastName)}
                    </span>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="truncate text-sm font-semibold text-base-900">
                          {inq.firstName || "Anonymous"} {inq.lastName}
                        </p>
                        <span
                          className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ring-1 ring-inset ${KIND_BADGE[inq.kind]}`}
                        >
                          {KIND_LABELS[inq.kind]}
                        </span>
                        {inq.property && (
                          <span className="hidden truncate text-sm text-base-400 sm:inline">
                            · {inq.property.title}
                          </span>
                        )}
                      </div>
                      <p className="mt-0.5 truncate text-sm text-base-400">
                        {inq.email ?? "No email"} · {formatDate(inq.createdAt)}
                      </p>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(inq.id);
                      }}
                      aria-label="Delete inquiry"
                      className="grid h-9 w-9 shrink-0 place-items-center rounded-lg text-base-400 transition-colors hover:bg-red-50 hover:text-red-600 cursor-pointer"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                    <span
                      className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg text-base-400 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    >
                      <ChevronDownIcon className="h-4 w-4" />
                    </span>
                  </div>

                  {isOpen && (
                    <div className="animate-modal-in border-t border-base-200/70 px-5 pb-6 pt-5 md:px-20">
                      <dl className="grid gap-x-10 gap-y-5 sm:grid-cols-2">
                        {inq.description && (
                          <div className="sm:col-span-2">
                            <dt className="text-[11px] font-semibold uppercase tracking-[0.15em] text-base-400">
                              Description
                            </dt>
                            <dd className="mt-1.5 text-sm leading-relaxed text-base-900">
                              {inq.description}
                            </dd>
                          </div>
                        )}
                        <div className="sm:col-span-2">
                          <dt className="text-[11px] font-semibold uppercase tracking-[0.15em] text-base-400">
                            Contact
                          </dt>
                          <dd className="mt-1.5 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-base-900">
                            {inq.email && (
                              <a
                                href={`mailto:${inq.email}`}
                                className="inline-flex items-center gap-1.5 font-medium text-accent-700 hover:text-accent-900 hover:underline"
                              >
                                <MailIcon className="h-4 w-4" />
                                {inq.email}
                              </a>
                            )}
                            {inq.phone && (
                              <a
                                href={`tel:${inq.phone}`}
                                className="inline-flex items-center gap-1.5 font-medium text-base-700 hover:text-base-900 hover:underline"
                              >
                                <PhoneIcon className="h-4 w-4" />
                                {inq.phone}
                              </a>
                            )}
                            {!inq.email && !inq.phone && "No contact details provided"}
                          </dd>
                        </div>
                        {inq.totalCost && <Field label="Total cost" value={inq.totalCost} />}
                        {inq.country && <Field label="Country" value={inq.country} />}
                        {inq.state && <Field label="State" value={inq.state} />}
                        {inq.city && <Field label="City" value={inq.city} />}
                        {inq.date && <Field label="Date" value={inq.date} />}
                        {inq.concernType && <Field label="Concern type" value={inq.concernType} />}
                        {inq.office && <Field label="Office" value={inq.office} />}
                        <Field label="Received" value={new Date(inq.createdAt).toLocaleString()} />
                      </dl>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function initials(first: string | null, last: string | null) {
  return `${(first ?? "A").charAt(0)}${(last ?? "?").charAt(0)}`.toUpperCase();
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[11px] font-semibold uppercase tracking-[0.15em] text-base-400">{label}</dt>
      <dd className="mt-1.5 text-sm text-base-900">{value}</dd>
    </div>
  );
}

function InboxIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H6.911a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661Z"
      />
    </svg>
  );
}

function TrashIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
      />
    </svg>
  );
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
    </svg>
  );
}

function MailIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
      />
    </svg>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
      />
    </svg>
  );
}
