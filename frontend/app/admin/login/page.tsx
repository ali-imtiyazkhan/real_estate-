"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { adminLogin } from "@/lib/api";

export default function AdminLogin() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    try {
      const res = await adminLogin(password);
      localStorage.setItem("admin_token", res.data.token);
      router.push("/admin");
      router.refresh();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Login failed");
    }
  }

  return (
    <section className="overflow-hidden">
      <div className="mx-auto max-w-md px-8 md:px-12 pb-12 lg:pt-32">
        <h1 className="text-2xl md:text-3xl font-medium tracking-tighter text-base-900">
          Admin login
        </h1>
        <form onSubmit={handleSubmit} className="mt-8">
          <label className="block text-xl font-medium text-base-900 mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoFocus
            className="block w-full h-12 border-0 border-b border-base-200 text-sm text-base-900 bg-transparent outline-none focus:border-black focus:shadow-[inset_0_-2px_0_#000] placeholder:text-base-400"
            placeholder="Enter admin password"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="btn-primary mt-8 w-full disabled:opacity-50"
          >
            {status === "loading" ? "Signing in..." : "Sign in"}
          </button>
          {status === "error" && <p className="text-sm text-red-600 mt-4">{error}</p>}
        </form>
      </div>
    </section>
  );
}
