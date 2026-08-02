"use client";

import { useState } from "react";
import { submitInquiry } from "@/lib/api";

const inputClass =
  "block w-full h-12 border-0 border-b border-base-200 text-sm text-base-900 bg-transparent outline-none focus:border-black focus:shadow-[inset_0_-2px_0_#000] placeholder:text-base-400";
const selectClass =
  "block w-full h-12 border-0 border-b border-base-200 text-sm text-base-900 bg-transparent outline-none focus:border-black appearance-none";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus("loading");
    setError("");

    try {
      await submitInquiry({
        kind: "CONTACT",
        firstName: data.get("firstName"),
        lastName: data.get("lastName"),
        email: data.get("email"),
        phone: data.get("phone") || undefined,
        country: data.get("country") || undefined,
        state: data.get("state") || undefined,
        city: data.get("city") || undefined,
        date: data.get("date") || undefined,
        concernType: data.get("concernType") || undefined,
        office: data.get("office") || undefined,
        description: data.get("description"),
      });
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div>
          <label className="block text-xl font-medium text-base-900 mb-2">First name</label>
          <input type="text" name="firstName" required className={inputClass} placeholder="John" />
        </div>
        <div>
          <label className="block text-xl font-medium text-base-900 mb-2">Last name</label>
          <input type="text" name="lastName" required className={inputClass} placeholder="Doe" />
        </div>
        <div>
          <label className="block text-xl font-medium text-base-900 mb-2">Email</label>
          <input type="email" name="email" required className={inputClass} placeholder="john@example.com" />
        </div>
        <div>
          <label className="block text-xl font-medium text-base-900 mb-2">Phone</label>
          <input type="tel" name="phone" className={inputClass} placeholder="(202) 555-0123" />
        </div>
        <div>
          <label className="block text-xl font-medium text-base-900 mb-2">Country</label>
          <input type="text" name="country" className={inputClass} placeholder="United States" />
        </div>
        <div>
          <label className="block text-xl font-medium text-base-900 mb-2">State</label>
          <input type="text" name="state" className={inputClass} placeholder="California" />
        </div>
        <div>
          <label className="block text-xl font-medium text-base-900 mb-2">City</label>
          <input type="text" name="city" className={inputClass} placeholder="Los Angeles" />
        </div>
        <div>
          <label className="block text-xl font-medium text-base-900 mb-2">Date</label>
          <input type="date" name="date" className={inputClass} />
        </div>
        <div>
          <label className="block text-xl font-medium text-base-900 mb-2">Concern type</label>
          <select name="concernType" className={selectClass}>
            <option>General Inquiry</option>
            <option>Buying</option>
            <option>Selling</option>
            <option>Renting</option>
            <option>Other</option>
          </select>
        </div>
        <div>
          <label className="block text-xl font-medium text-base-900 mb-2">Office</label>
          <select name="office" className={selectClass}>
            <option>Fair Deal Property</option>
            <option>Fair Deal Property - New York</option>
            <option>Fair Deal Property - London</option>
            <option>Fair Deal Property - Dubai</option>
          </select>
        </div>
      </div>
      <div className="mt-8">
        <label className="block text-xl font-medium text-base-900 mb-2">Description</label>
        <textarea
          name="description"
          rows={4}
          required
          className="block w-full border-0 border-b border-base-200 text-sm text-base-900 bg-transparent outline-none focus:border-black resize-vertical placeholder:text-base-400"
          placeholder="Tell us about your inquiry..."
        />
      </div>
      <div className="mt-8">
        <button
          type="submit"
          disabled={status === "loading"}
          className="h-15 px-8 py-4 text-base bg-base-800 text-white font-medium hover:bg-base-900 transition-colors cursor-pointer disabled:opacity-50"
        >
          {status === "loading" ? "Submitting..." : "Submit"}
        </button>
        {status === "success" && (
          <p className="text-sm text-green-700 mt-4">Thank you! Your inquiry has been submitted.</p>
        )}
        {status === "error" && <p className="text-sm text-red-600 mt-4">{error}</p>}
      </div>
    </form>
  );
}
