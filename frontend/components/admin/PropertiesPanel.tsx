"use client";

import { useEffect, useState } from "react";
import {
  createAdminProperty,
  deleteAdminProperty,
  getProperties,
  updateAdminProperty,
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
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h2 className="text-xl font-medium text-base-900">Properties</h2>
        <button
          onClick={() => {
            setCreating(true);
            setEditing(null);
          }}
          className="btn-primary !px-6 !py-3 text-sm cursor-pointer"
        >
          New property
        </button>
      </div>

      {error && <p className="text-sm text-red-600 mb-4">{error}</p>}
      {loading && <p className="text-base-500 text-sm">Loading...</p>}

      {(creating || editing) && (
        <PropertyForm
          initial={editing ?? emptyForm}
          isEditing={Boolean(editing)}
          onCancel={() => {
            setCreating(false);
            setEditing(null);
          }}
          onSave={(data) => handleSave(data, editing?.id)}
        />
      )}

      {!loading && properties.length === 0 && (
        <p className="text-base-500 text-sm">No properties yet.</p>
      )}

      <div className="border-t border-base-200 divide-y divide-base-200">
        {properties.map((prop) => (
          <div key={prop.id} className="py-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 min-w-0">
              <img
                src={prop.image}
                alt=""
                width="64"
                height="48"
                className="w-16 h-12 object-cover shrink-0"
              />
              <div className="min-w-0">
                <p className="font-medium text-base-900 truncate">{prop.title}</p>
                <p className="text-sm text-base-500">
                  {prop.listingType === "SALE" ? "For sale" : "For rent"} · {prop.price} · {prop.location}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => {
                  setEditing(prop);
                  setCreating(false);
                }}
                className="text-sm text-base-600 hover:text-base-900 cursor-pointer"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(prop)}
                className="text-sm text-red-600 hover:underline cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const inputClass =
  "block w-full h-12 border-0 border-b border-base-200 text-sm text-base-900 bg-transparent outline-none focus:border-black focus:shadow-[inset_0_-2px_0_#000] placeholder:text-base-400";

function PropertyForm({
  initial,
  isEditing,
  onCancel,
  onSave,
}: {
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
    });
    setSaving(false);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="border border-base-200 p-6 md:p-8 mb-8 bg-base-50"
    >
      <h3 className="text-lg font-medium text-base-900 mb-6">
        {isEditing ? "Edit property" : "New property"}
      </h3>
      <div className="grid sm:grid-cols-2 gap-6">
        <Field label="Title" value={form.title} onChange={(v) => set("title", v)} required />
        <Field label="Slug" value={form.slug} onChange={(v) => set("slug", v)} required placeholder="e.g. sunset-villa" />
        <Field label="Project name" value={form.projectName} onChange={(v) => set("projectName", v)} required />
        <Field label="Address" value={form.address} onChange={(v) => set("address", v)} required />
        <Field label="Location" value={form.location} onChange={(v) => set("location", v)} required />
        <Field label="Price" value={form.price} onChange={(v) => set("price", v)} required placeholder="$750,000" />
        <Field label="Sqft" value={form.sqft} onChange={(v) => set("sqft", v)} required placeholder="12,500" />
        <Field label="Rooms" value={form.rooms} onChange={(v) => set("rooms", v)} required />
        <Field label="Floor" value={form.floor} onChange={(v) => set("floor", v)} required />
        <Field label="Image URL" value={form.image} onChange={(v) => set("image", v)} required />
        <div>
          <label className="block text-sm font-medium text-base-900 mb-2">Listing type</label>
          <select
            value={form.listingType}
            onChange={(e) => set("listingType", e.target.value as PropertyInput["listingType"])}
            className="block w-full h-12 border-0 border-b border-base-200 text-sm text-base-900 bg-transparent outline-none focus:border-black appearance-none"
          >
            <option value="SALE">For Sale</option>
            <option value="RENT">For Rent</option>
          </select>
        </div>
        <Field label="Map URL (optional)" value={form.map ?? ""} onChange={(v) => set("map", v)} />
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-base-900 mb-2">
            Gallery URLs (one per line)
          </label>
          <textarea
            value={galleryText}
            onChange={(e) => setGalleryText(e.target.value)}
            rows={3}
            placeholder="https://.../photo-1.jpg&#10;https://.../photo-2.jpg"
            className="block w-full border-0 border-b border-base-200 text-sm text-base-900 bg-transparent outline-none focus:border-black resize-vertical placeholder:text-base-400"
          />
        </div>
      </div>
      <div className="flex gap-3 mt-8">
        <button
          type="submit"
          disabled={saving}
          className="btn-primary !px-6 !py-3 text-sm cursor-pointer disabled:opacity-50"
        >
          {saving ? "Saving..." : isEditing ? "Save changes" : "Create property"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="btn-outline !px-6 !py-3 text-sm cursor-pointer"
        >
          Cancel
        </button>
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
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-base-900 mb-2">{label}</label>
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
