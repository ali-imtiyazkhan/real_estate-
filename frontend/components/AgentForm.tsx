"use client";

import { useState } from "react";
import { submitInquiry } from "@/lib/api";

export default function AgentForm({ propertyId }: { propertyId: string }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
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
        description: message,
        propertyId,
      });
      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-4">
      <input
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="block w-full h-12 border-0 border-b border-base-200 text-sm text-base-900 bg-transparent outline-none focus:border-black focus:shadow-[inset_0_-2px_0_#000] placeholder:text-base-400"
      />
      <input
        type="email"
        placeholder="Your Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="block w-full h-12 border-0 border-b border-base-200 text-sm text-base-900 bg-transparent outline-none focus:border-black focus:shadow-[inset_0_-2px_0_#000] placeholder:text-base-400"
      />
      <textarea
        placeholder="Your Message"
        rows={3}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
        className="block w-full border-0 border-b border-base-200 text-sm text-base-900 bg-transparent outline-none focus:border-black resize-vertical placeholder:text-base-400"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full h-15 bg-base-800 text-white text-base font-medium hover:bg-base-900 transition-colors cursor-pointer disabled:opacity-50"
      >
        {status === "loading" ? "Sending..." : "Send Message"}
      </button>
      {status === "success" && (
        <p className="text-sm text-green-700">Message sent. We&apos;ll get back to you shortly.</p>
      )}
      {status === "error" && <p className="text-sm text-red-600">{error}</p>}
    </form>
  );
}
