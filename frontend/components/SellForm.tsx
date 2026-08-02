"use client";

import { useState } from "react";
import { submitInquiry } from "@/lib/api";

const inputClass =
  "block w-full h-12 border-0 border-b border-base-200 text-sm text-base-900 bg-transparent outline-none focus:border-black focus:shadow-[inset_0_-2px_0_#000] placeholder:text-base-400";

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
        totalCost: data.get("totalCost"),
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
          <label className="block text-xl font-medium text-base-900 mb-2">Total cost</label>
          <input type="text" name="totalCost" required className={inputClass} placeholder="$" />
        </div>
        <div>
          <label className="block text-xl font-medium text-base-900 mb-2">Message</label>
          <textarea
            name="description"
            rows={3}
            required
            className="block w-full border-0 border-b border-base-200 text-sm text-base-900 bg-transparent outline-none focus:border-black resize-vertical placeholder:text-base-400"
            placeholder="Tell us about your property..."
          />
        </div>
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
          <p className="text-sm text-green-700 mt-4">Thank you! We&apos;ll contact you about selling your property.</p>
        )}
        {status === "error" && <p className="text-sm text-red-600 mt-4">{error}</p>}
      </div>
    </form>
  );
}
