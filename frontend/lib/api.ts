export const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api";

export type ListingType = "SALE" | "RENT" | "COMING_SOON";
export type InquiryKind = "CONTACT" | "SELL" | "AGENT";

export interface Property {
  id: string;
  slug: string;
  title: string;
  projectName: string;
  address: string;
  location: string;
  sqft: string;
  floor: string;
  rooms: string;
  price: string;
  image: string;
  gallery: string[];
  map: string | null;
  brochure: string | null;
  listingType: ListingType;
  createdAt: string;
  updatedAt: string;
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  createdAt: string;
}

export interface Inquiry {
  id: string;
  kind: InquiryKind;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  phone: string | null;
  country: string | null;
  state: string | null;
  city: string | null;
  date: string | null;
  concernType: string | null;
  office: string | null;
  description: string | null;
  totalCost: string | null;
  propertyId: string | null;
  createdAt: string;
  property?: { title: string; slug: string } | null;
}

export interface PropertyListResponse {
  data: Property[];
  total: number;
  limit: number;
  offset: number;
}

export interface PropertyInput {
  slug: string;
  title: string;
  projectName: string;
  address: string;
  location: string;
  sqft: string;
  floor: string;
  rooms: string;
  price: string;
  image: string;
  gallery: string[];
  map?: string | null;
  brochure?: string | null;
  listingType: ListingType;
}

interface RequestOptions {
  method?: string;
  body?: unknown;
  token?: string;
}

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const isFormData = typeof FormData !== "undefined" && options.body instanceof FormData;
  const res = await fetch(`${API_URL}${path}`, {
    method: options.method ?? "GET",
    headers: {
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      ...(options.token ? { Authorization: `Bearer ${options.token}` } : {}),
    },
    body:
      options.body === undefined
        ? undefined
        : isFormData
          ? (options.body as FormData)
          : JSON.stringify(options.body),
  });

  if (!res.ok) {
    const body = (await res.json().catch(() => null)) as {
      error?: { message?: string };
    } | null;
    throw new Error(body?.error?.message ?? `Request failed (${res.status})`);
  }

  if (res.status === 204) return undefined as T;
  return (await res.json()) as T;
}

export function getProperties(params?: {
  type?: "sale" | "rent" | "coming-soon";
  q?: string;
  limit?: number;
  offset?: number;
}): Promise<PropertyListResponse> {
  const search = new URLSearchParams();
  if (params?.type) search.set("type", params.type);
  if (params?.q) search.set("q", params.q);
  if (params?.limit !== undefined) search.set("limit", String(params.limit));
  if (params?.offset !== undefined) search.set("offset", String(params.offset));
  const qs = search.toString();
  return request<PropertyListResponse>(`/properties${qs ? `?${qs}` : ""}`);
}

export function getProperty(idOrSlug: string): Promise<{ data: Property }> {
  return request(`/properties/${encodeURIComponent(idOrSlug)}`);
}

export function getFeatures(): Promise<{ data: Feature[] }> {
  return request("/features");
}

export function submitInquiry(
  body: Record<string, unknown>
): Promise<{ data: Inquiry }> {
  return request("/inquiries", { method: "POST", body });
}

export function adminLogin(password: string): Promise<{ data: { token: string } }> {
  return request("/admin/login", { method: "POST", body: { password } });
}

export function getAdminInquiries(
  token: string,
  params?: { kind?: InquiryKind; limit?: number; offset?: number }
): Promise<{ data: Inquiry[]; total: number; limit: number; offset: number }> {
  const search = new URLSearchParams();
  if (params?.kind) search.set("kind", params.kind);
  if (params?.limit !== undefined) search.set("limit", String(params.limit));
  if (params?.offset !== undefined) search.set("offset", String(params.offset));
  const qs = search.toString();
  return request(`/admin/inquiries${qs ? `?${qs}` : ""}`, { token });
}

export function deleteAdminInquiry(token: string, id: string): Promise<void> {
  return request(`/admin/inquiries/${id}`, { method: "DELETE", token });
}

export function createAdminProperty(
  token: string,
  body: PropertyInput
): Promise<{ data: Property }> {
  return request("/admin/properties", { method: "POST", body, token });
}

export function updateAdminProperty(
  token: string,
  id: string,
  body: PropertyInput
): Promise<{ data: Property }> {
  return request(`/admin/properties/${id}`, { method: "PUT", body, token });
}

export function deleteAdminProperty(token: string, id: string): Promise<void> {
  return request(`/admin/properties/${id}`, { method: "DELETE", token });
}

export function uploadAdminImage(
  token: string,
  file: File
): Promise<{ data: { url: string; key: string } }> {
  const formData = new FormData();
  formData.append("file", file);
  return request("/admin/upload", { method: "POST", body: formData, token });
}
