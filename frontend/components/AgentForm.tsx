"use client";

import { useState } from "react";
import { submitInquiry } from "@/lib/api";

type InquiryType = "Request Info" | "Schedule Tour" | "Make Offer";

export default function AgentForm({ propertyId }: { propertyId: string }) {
  const [inquiryType, setInquiryType] = useState<InquiryType>("Schedule Tour");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    try {
      await submitInquiry({
        kind: "AGENT",
        name,
        email,
        phone,
        concernType: inquiryType,
        description: message,
        propertyId,
      });
      setStatus("success");
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  return (
    <div className="mt-4 space-y-4">
      {/* Tab Selectors */}
      <div className="grid grid-cols-3 gap-1 p-1 bg-base-100 rounded-lg border border-base-200 text-xs font-medium">
        {(["Schedule Tour", "Make Offer", "Request Info"] as InquiryType[]).map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => setInquiryType(type)}
            className={`py-2 px-1 text-center rounded-md transition-colors ${
              inquiryType === type
                ? "bg-base-900 text-white font-semibold shadow-sm"
                : "text-base-600 hover:text-base-900"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="Your Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="block w-full h-11 border-0 border-b border-base-200 text-sm text-base-900 bg-transparent outline-none focus:border-black placeholder:text-base-400"
        />
        <input
          type="email"
          placeholder="Your Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="block w-full h-11 border-0 border-b border-base-200 text-sm text-base-900 bg-transparent outline-none focus:border-black placeholder:text-base-400"
        />
        <input
          type="tel"
          placeholder="Your Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="block w-full h-11 border-0 border-b border-base-200 text-sm text-base-900 bg-transparent outline-none focus:border-black placeholder:text-base-400"
        />
        <textarea
          placeholder={
            inquiryType === "Schedule Tour"
              ? "Preferred tour date/time or specific questions..."
              : inquiryType === "Make Offer"
              ? "Your offer price or conditions..."
              : "Ask a question about this property..."
          }
          rows={3}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          className="block w-full border-0 border-b border-base-200 text-sm text-base-900 bg-transparent outline-none focus:border-black resize-vertical placeholder:text-base-400"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full h-12 bg-base-900 text-white text-sm font-medium hover:bg-base-800 transition-colors cursor-pointer rounded-md disabled:opacity-50"
        >
          {status === "loading" ? "Submitting..." : `Submit ${inquiryType}`}
        </button>

        {status === "success" && (
          <p className="text-xs text-green-700 font-medium bg-green-50 p-3 rounded-md border border-green-200">
            ✅ {inquiryType} request received! Our team will contact you shortly.
          </p>
        )}
        {status === "error" && (
          <p className="text-xs text-red-600 font-medium bg-red-50 p-3 rounded-md border border-red-200">
            ❌ {error}
          </p>
        )}
      </form>
    </div>
  );
}

