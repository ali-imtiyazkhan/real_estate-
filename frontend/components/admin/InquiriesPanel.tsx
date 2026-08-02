"use client";

import { useCallback, useEffect, useState } from "react";
import { deleteAdminInquiry, getAdminInquiries, type Inquiry, type InquiryKind } from "@/lib/api";

const KIND_LABELS: Record<InquiryKind, string> = {
  CONTACT: "Contact",
  SELL: "Sell",
  AGENT: "Agent",
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
      const res = await getAdminInquiries(token, filter !== "ALL" ? { kind: filter } : {});
      setInquiries(res.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load inquiries");
    } finally {
      setLoading(false);
    }
  }, [token, filter]);

  useEffect(() => {
    const id = setTimeout(() => {
      loadInquiries();
    }, 0);
    return () => clearTimeout(id);
  }, [loadInquiries]);

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
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h2 className="text-xl font-medium text-base-900">Inquiries</h2>
        <div className="flex gap-2">
          {(["ALL", "CONTACT", "SELL", "AGENT"] as const).map((k) => (
            <button
              key={k}
              onClick={() => setFilter(k)}
              className={`px-4 py-2 text-sm font-medium border transition-colors cursor-pointer ${
                filter === k
                  ? "bg-base-900 text-white border-base-900"
                  : "bg-white text-base-600 border-base-300 hover:border-base-900"
              }`}
            >
              {k === "ALL" ? "All" : KIND_LABELS[k]}
            </button>
          ))}
        </div>
      </div>

      {error && <p className="text-sm text-red-600 mb-4">{error}</p>}
      {loading && <p className="text-base-500 text-sm">Loading...</p>}

      {!loading && inquiries.length === 0 && (
        <p className="text-base-500 text-sm">No inquiries yet.</p>
      )}

      <div className="border-t border-base-200 divide-y divide-base-200">
        {inquiries.map((inq) => (
          <div key={inq.id} className="py-4">
            <button
              onClick={() => setExpandedId(expandedId === inq.id ? null : inq.id)}
              className="w-full flex items-center justify-between gap-4 text-left cursor-pointer"
            >
              <div>
                <div className="flex items-center gap-3">
                  <span className="text-xs uppercase tracking-widest text-base-500 font-medium">
                    {KIND_LABELS[inq.kind]}
                  </span>
                  <span className="font-medium text-base-900">
                    {inq.firstName} {inq.lastName}
                  </span>
                  {inq.property && (
                    <span className="text-sm text-base-500">— {inq.property.title}</span>
                  )}
                </div>
                <p className="text-sm text-base-500 mt-1">
                  {inq.email ?? "No email"} · {new Date(inq.createdAt).toLocaleString()}
                </p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-xs text-base-400">{expandedId === inq.id ? "Hide" : "Details"}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(inq.id);
                  }}
                  className="text-xs text-red-600 hover:underline cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </button>

            {expandedId === inq.id && (
              <dl className="mt-4 grid sm:grid-cols-2 gap-x-8 gap-y-2 text-sm bg-base-50 p-6">
                <div className="sm:col-span-2">
                  <dt className="text-base-500 text-xs uppercase tracking-widest">Description</dt>
                  <dd className="mt-1 text-base-900">{inq.description ?? "—"}</dd>
                </div>
                {inq.phone && <Field label="Phone" value={inq.phone} />}
                {inq.totalCost && <Field label="Total cost" value={inq.totalCost} />}
                {inq.country && <Field label="Country" value={inq.country} />}
                {inq.state && <Field label="State" value={inq.state} />}
                {inq.city && <Field label="City" value={inq.city} />}
                {inq.date && <Field label="Date" value={inq.date} />}
                {inq.concernType && <Field label="Concern type" value={inq.concernType} />}
                {inq.office && <Field label="Office" value={inq.office} />}
                <Field label="Created" value={new Date(inq.createdAt).toLocaleString()} />
              </dl>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-base-500 text-xs uppercase tracking-widest">{label}</dt>
      <dd className="mt-1 text-base-900">{value}</dd>
    </div>
  );
}
