"use client";

import { useState } from "react";
import { submitInquiry } from "@/lib/api";

const inputClass =
  "block w-full h-12 border-0 border-b border-base-200 text-sm text-base-900 bg-transparent outline-none focus:border-black placeholder:text-base-400";

export default function SellForm() {
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
        kind: "SELL",
        firstName: data.get("firstName"),
        lastName: data.get("lastName"),
        email: data.get("email"),
        phone: data.get("phone"),
        city: data.get("city"),
        totalCost: data.get("totalCost"),
        description: `[Property Sale Details]\nSqft: ${data.get("sqft") || "N/A"}\nRooms: ${data.get("rooms") || "N/A"}\nLocation: ${data.get("city") || "N/A"}\nMessage: ${data.get("description")}`,
      });
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-base-900 mb-1">First Name *</label>
          <input type="text" name="firstName" required className={inputClass} placeholder="e.g. John" />
        </div>
        <div>
          <label className="block text-sm font-medium text-base-900 mb-1">Last Name *</label>
          <input type="text" name="lastName" required className={inputClass} placeholder="e.g. Doe" />
        </div>
        <div>
          <label className="block text-sm font-medium text-base-900 mb-1">Email Address *</label>
          <input type="email" name="email" required className={inputClass} placeholder="john@example.com" />
        </div>
        <div>
          <label className="block text-sm font-medium text-base-900 mb-1">Phone Number *</label>
          <input type="tel" name="phone" required className={inputClass} placeholder="+91 98765 43210" />
        </div>
        <div>
          <label className="block text-sm font-medium text-base-900 mb-1">Property Location / City *</label>
          <input type="text" name="city" required className={inputClass} placeholder="e.g. Beverly Hills, CA" />
        </div>
        <div>
          <label className="block text-sm font-medium text-base-900 mb-1">Expected Price *</label>
          <input type="text" name="totalCost" required className={inputClass} placeholder="e.g. $750,000" />
        </div>
        <div>
          <label className="block text-sm font-medium text-base-900 mb-1">Property Area (Sqft)</label>
          <input type="text" name="sqft" className={inputClass} placeholder="e.g. 2,500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-base-900 mb-1">Number of Bedrooms / Rooms</label>
          <input type="text" name="rooms" className={inputClass} placeholder="e.g. 3 Bedrooms" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-base-900 mb-1">Property Details & Notes *</label>
        <textarea
          name="description"
          rows={4}
          required
          className="block w-full border-0 border-b border-base-200 text-sm text-base-900 bg-transparent outline-none focus:border-black resize-vertical placeholder:text-base-400"
          placeholder="Tell us about the property condition, key features, or ideal closing timeline..."
        />
      </div>

      <div>
        <button
          type="submit"
          disabled={status === "loading"}
          className="h-12 px-8 text-sm bg-base-900 text-white font-medium hover:bg-base-800 transition-colors cursor-pointer rounded-lg disabled:opacity-50"
        >
          {status === "loading" ? "Submitting Property..." : "Submit Property for Listing"}
        </button>
        {status === "success" && (
          <p className="text-sm font-medium text-green-700 bg-green-50 p-4 rounded-lg border border-green-200 mt-4">
            🎉 Thank you! Your property valuation request has been submitted. Our agent will contact you shortly to arrange an evaluation.
          </p>
        )}
        {status === "error" && <p className="text-sm font-medium text-red-600 bg-red-50 p-4 rounded-lg border border-red-200 mt-4">{error}</p>}
      </div>
    </form>
  );
}

