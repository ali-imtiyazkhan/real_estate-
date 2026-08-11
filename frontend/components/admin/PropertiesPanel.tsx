"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  createAdminProperty,
  deleteAdminProperty,
  getProperties,
  updateAdminProperty,
  uploadAdminImage,
  type Property,
  type PropertyInput,
} from "@/lib/api";

const emptyForm: PropertyInput = {
  slug: "",
  title: "",
  projectName: "",
  address: "",
  location: "",
  sqft: "",
  floor: "",
  rooms: "",
  price: "",
  image: "",
  gallery: [],
  map: "",
  brochure: "",
  listingType: "SALE",
};

export default function PropertiesPanel({ token }: { token: string }) {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState<Property | null>(null);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    loadProperties();
  }, []);

  async function loadProperties() {
    setLoading(true);
    setError("");
    try {
      const res = await getProperties({ limit: 50 });
      setProperties(res.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load properties");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(prop: Property) {
    if (!confirm(`Delete "${prop.title}"? This cannot be undone.`)) return;
    try {
      await deleteAdminProperty(token, prop.id);
      setProperties((prev) => prev.filter((p) => p.id !== prop.id));
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete");
    }
  }

  async function handleSave(data: PropertyInput, id?: string) {
    try {
      if (id) {
        await updateAdminProperty(token, id, data);
      } else {
        await createAdminProperty(token, data);
      }
      setEditing(null);
      setCreating(false);
      await loadProperties();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to save property");
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-base-400">{properties.length} properties</p>
        <button
          onClick={() => {
            setCreating(true);
            setEditing(null);
          }}
          className="inline-flex items-center gap-2 rounded-xl bg-base-900 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-base-900/10 transition-all hover:bg-base-950 hover:shadow-base-900/20 cursor-pointer"
        >
          <PlusIcon className="h-4 w-4" />
          New property
        </button>
      </div>

      <div className="mt-5">
        {error && (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {(creating || editing) && (
          <PropertyForm
            token={token}
            initial={editing ?? emptyForm}
            isEditing={Boolean(editing)}
            onCancel={() => {
              setCreating(false);
              setEditing(null);
            }}
            onSave={(data) => handleSave(data, editing?.id)}
          />
        )}

        {loading && (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="animate-pulse overflow-hidden rounded-2xl border border-base-200 bg-white"
              >
                <div className="aspect-[4/3] bg-base-100" />
                <div className="space-y-3 p-5">
                  <div className="h-4 w-3/4 rounded bg-base-100" />
                  <div className="h-3 w-1/2 rounded bg-base-50" />
                  <div className="h-3 w-1/3 rounded bg-base-50" />
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && properties.length === 0 && (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-base-300 bg-white px-6 py-16 text-center">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-base-100 text-base-400">
              <BuildingIcon className="h-6 w-6" />
            </span>
            <p className="mt-4 text-sm font-medium text-base-900">No properties yet</p>
            <p className="mt-1 text-sm text-base-400">
              Create your first listing to get started.
            </p>
            <button
              onClick={() => {
                setCreating(true);
                setEditing(null);
              }}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-base-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-base-950 cursor-pointer"
            >
              <PlusIcon className="h-4 w-4" />
              New property
            </button>
          </div>
        )}

        {!loading && properties.length > 0 && (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {properties.map((prop) => (
              <div
                key={prop.id}
                className="group flex flex-col overflow-hidden rounded-2xl border border-base-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-base-900/10"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-base-100">
                  <Image
                    src={prop.image}
                    alt={prop.title}
                    fill
                    sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span
                    className={`absolute left-4 top-4 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-widest ${
                      prop.listingType === "SALE"
                        ? "bg-base-900 text-white"
                        : prop.listingType === "RENT"
                        ? "bg-accent-600 text-white"
                        : "bg-amber-500 text-white"
                    }`}
                  >
                    {prop.listingType === "SALE"
                      ? "For sale"
                      : prop.listingType === "RENT"
                      ? "For rent"
                      : "Coming soon"}
                  </span>
                </div>

                <div className="flex grow flex-col p-5">
                  <p className="truncate font-semibold tracking-tight text-base-900">
                    {prop.title}
                  </p>
                  <p className="mt-1 flex items-center gap-1.5 text-sm text-base-400">
                    <PinIcon className="h-3.5 w-3.5 shrink-0" />
                    <span className="truncate">{prop.location || prop.address}</span>
                  </p>
                  <p className="mt-3 text-lg font-semibold tracking-tight text-base-900">
                    {prop.price}
                  </p>
                  <div className="mt-4 flex items-center justify-between border-t border-base-100 pt-4">
                    <div className="flex gap-4 text-xs text-base-400">
                      <span className="flex items-center gap-1.5">
                        <SqftIcon className="h-3.5 w-3.5" />
                        {prop.sqft}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <BedIcon className="h-3.5 w-3.5" />
                        {prop.rooms} rm
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setEditing(prop);
                          setCreating(false);
                        }}
                        className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold text-base-600 transition-colors hover:bg-base-100 hover:text-base-900 cursor-pointer"
                      >
                        <PencilIcon className="h-3.5 w-3.5" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(prop)}
                        className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold text-red-500 transition-colors hover:bg-red-50 hover:text-red-600 cursor-pointer"
                      >
                        <TrashIcon className="h-3.5 w-3.5" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const inputClass =
  "block w-full rounded-xl border border-base-200 bg-white px-4 py-3 text-sm text-base-900 outline-none transition-all placeholder:text-base-400 focus:border-base-900 focus:ring-4 focus:ring-base-900/5";

function PropertyForm({
  token,
  initial,
  isEditing,
  onCancel,
  onSave,
}: {
  token: string;
  initial: PropertyInput;
  isEditing: boolean;
  onCancel: () => void;
  onSave: (data: PropertyInput) => void;
}) {
  const [form, setForm] = useState<PropertyInput>(initial);
  const [galleryText, setGalleryText] = useState((initial.gallery ?? []).join("\n"));
  const [saving, setSaving] = useState(false);

  function set<K extends keyof PropertyInput>(key: K, value: PropertyInput[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    onSave({
      ...form,
      gallery: galleryText
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
      map: form.map?.trim() ? form.map.trim() : null,
      brochure: form.brochure?.trim() ? form.brochure.trim() : null,
    });
    setSaving(false);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="animate-modal-in mb-6 overflow-hidden rounded-2xl border border-base-200 bg-white shadow-sm"
    >
      <div className="flex items-center justify-between border-b border-base-100 bg-base-50/60 px-6 py-4">
        <div className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-base-900 text-white">
            <PencilIcon className="h-4 w-4" />
          </span>
          <div className="leading-tight">
            <h3 className="text-sm font-semibold tracking-tight text-base-900">
              {isEditing ? "Edit property" : "New property"}
            </h3>
            <p className="text-xs text-base-400">
              {isEditing ? "Update this listing" : "Create a new listing"}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={onCancel}
          aria-label="Close form"
          className="grid h-9 w-9 place-items-center rounded-lg text-base-400 transition-colors hover:bg-base-100 hover:text-base-900 cursor-pointer"
        >
          <CloseIcon className="h-4 w-4" />
        </button>
      </div>

      <div className="grid gap-x-6 gap-y-5 p-6 sm:grid-cols-2 md:p-8">
        <Field label="Title" value={form.title} onChange={(v) => set("title", v)} required />
        <Field
          label="Slug"
          value={form.slug}
          onChange={(v) =>
            set(
              "slug",
              v
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/^-+|-+$/g, "")
            )
          }
          required
          placeholder="e.g. sunset-villa"
        />
        <Field
          label="Project name"
          value={form.projectName}
          onChange={(v) => set("projectName", v)}
          required
        />
        <Field label="Address" value={form.address} onChange={(v) => set("address", v)} required />
        <Field label="Location" value={form.location} onChange={(v) => set("location", v)} required />
        <Field
          label="Price"
          value={form.price}
          onChange={(v) => set("price", v)}
          required
          placeholder="$750,000"
        />
        <Field label="Sqft" value={form.sqft} onChange={(v) => set("sqft", v)} required placeholder="12,500" />
        <Field label="Rooms" value={form.rooms} onChange={(v) => set("rooms", v)} required />
        <Field label="Floor" value={form.floor} onChange={(v) => set("floor", v)} required />

        <div className="sm:col-span-2">
          <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-base-500">
            Image
          </label>
          <div className="flex items-end gap-3">
            <div className="flex-1">
              <Field
                value={form.image}
                onChange={(v) => set("image", v)}
                required
                placeholder="https://... or upload"
              />
            </div>
            <ImageUploader token={token} label="Upload" onUploaded={(url) => set("image", url)} />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-base-500">
            Listing type
          </label>
          <div className="grid grid-cols-3 gap-2 rounded-xl border border-base-200 bg-base-50 p-1.5">
            {(["SALE", "RENT", "COMING_SOON"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => set("listingType", t)}
                className={`rounded-lg px-4 py-2.5 text-sm font-medium transition-all cursor-pointer ${
                  form.listingType === t
                    ? "bg-base-900 text-white shadow-md shadow-base-900/10"
                    : "text-base-500 hover:text-base-900"
                }`}
              >
                {t === "SALE" ? "For Sale" : t === "RENT" ? "For Rent" : "Coming Soon"}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-base-500">
            Map image (optional)
          </label>
          <div className="flex items-end gap-3">
            <div className="flex-1">
              <Field
                value={form.map ?? ""}
                onChange={(v) => set("map", v)}
                placeholder="https://... or upload"
              />
            </div>
            <ImageUploader token={token} label="Upload" onUploaded={(url) => set("map", url)} />
          </div>
        </div>

        <div className="sm:col-span-2">
          <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-base-500">
            Brochure PDF (optional)
          </label>
          <p className="mb-2 text-xs text-base-400">
            Upload a brochure PDF or paste a URL. A download section will appear on the property page.
          </p>
          <div className="flex items-end gap-3">
            <div className="flex-1">
              <Field
                value={form.brochure ?? ""}
                onChange={(v) => set("brochure", v)}
                placeholder="https://.../brochure.pdf or upload"
              />
            </div>
            <ImageUploader token={token} label="Upload PDF" onUploaded={(url) => set("brochure", url)} />
          </div>
        </div>

        <div className="sm:col-span-2">
          <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-base-500">
            Gallery (one URL per line)
          </label>
          <div className="flex items-end gap-3">
            <div className="flex-1">
              <textarea
                value={galleryText}
                onChange={(e) => setGalleryText(e.target.value)}
                rows={3}
                placeholder={"https://.../photo-1.jpg\nhttps://.../photo-2.jpg"}
                className={`${inputClass} resize-y`}
              />
            </div>
            <ImageUploader
              token={token}
              label="Upload"
              onUploaded={(url) =>
                setGalleryText((prev) => (prev.trim() ? `${prev.trim()}\n${url}` : url))
              }
            />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-base-100 bg-base-50/60 px-6 py-4 md:px-8">
        <p className="text-xs text-base-400">Changes are published immediately.</p>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-xl border border-base-300 px-5 py-2.5 text-sm font-medium text-base-600 transition-colors hover:border-base-900 hover:text-base-900 cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-xl bg-base-900 px-6 py-2.5 text-sm font-medium text-white shadow-lg shadow-base-900/10 transition-colors hover:bg-base-950 disabled:opacity-50 cursor-pointer"
          >
            {saving ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                Saving...
              </>
            ) : isEditing ? (
              "Save changes"
            ) : (
              "Create property"
            )}
          </button>
        </div>
      </div>
    </form>
  );
}

function Field({
  label,
  value,
  onChange,
  required,
  placeholder,
}: {
  label?: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      {label && (
        <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-base-500">
          {label}
        </label>
      )}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        placeholder={placeholder}
        className={inputClass}
      />
    </div>
  );
}

function ImageUploader({
  token,
  label,
  onUploaded,
}: {
  token: string;
  label: string;
  onUploaded: (url: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFile(file: File | undefined) {
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const res = await uploadAdminImage(token, file);
      onUploaded(res.data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif,image/avif,video/mp4,video/webm,video/quicktime,video/ogg,application/pdf"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className="inline-flex items-center gap-2 whitespace-nowrap rounded-xl border border-dashed border-base-300 bg-white px-4 py-3 text-sm font-medium text-base-600 transition-colors hover:border-base-900 hover:text-base-900 disabled:opacity-50 cursor-pointer"
      >
        {uploading ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-base-300 border-t-base-900" />
            Uploading...
          </>
        ) : (
          <>
            <UploadIcon className="h-4 w-4" />
            {label}
          </>
        )}
      </button>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}

function PlusIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
  );
}

function PencilIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={className}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
      />
    </svg>
  );
}

function TrashIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={className}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
      />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
  );
}

function UploadIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={className}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
      />
    </svg>
  );
}

function BuildingIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"
      />
    </svg>
  );
}

function PinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={className}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
      />
    </svg>
  );
}

function SqftIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={className}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"
      />
    </svg>
  );
}

function BedIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={className}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819"
      />
    </svg>
  );
}
