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
    <section className="relative grid min-h-screen place-items-center overflow-hidden bg-base-50 px-6 py-16">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-accent-100/60 blur-3xl" />
        <div className="absolute -bottom-40 -right-24 h-[28rem] w-[28rem] rounded-full bg-accent-200/40 blur-3xl" />
        <div className="absolute left-1/2 top-0 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-white blur-3xl" />
      </div>

      <div className="animate-modal-in relative w-full max-w-sm">
        <div className="rounded-3xl border border-base-200 bg-white p-8 shadow-2xl shadow-base-900/5">
          <div className="flex flex-col items-center text-center">
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-base-900 text-white shadow-lg shadow-base-900/20">
              <LockIcon className="h-6 w-6" />
            </span>
            <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.25em] text-base-400">
              Fair Deal Property
            </p>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight text-base-900">
              Admin sign in
            </h1>
            <p className="mt-1.5 text-sm text-base-400">
              Enter your password to continue
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8">
            <label
              htmlFor="admin-password"
              className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-base-500"
            >
              Password
            </label>
            <div className="relative">
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-base-400">
                <KeyIcon className="h-4 w-4" />
              </span>
              <input
                id="admin-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoFocus
                className="block h-12 w-full rounded-xl border border-base-200 bg-white pl-11 pr-4 text-sm text-base-900 outline-none transition-all placeholder:text-base-400 focus:border-base-900 focus:ring-4 focus:ring-base-900/5"
                placeholder="Enter admin password"
              />
            </div>
            <button
              type="submit"
              disabled={status === "loading"}
              className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-base-900 text-sm font-medium text-white shadow-lg shadow-base-900/15 transition-all hover:bg-base-950 hover:shadow-base-900/25 disabled:opacity-50 cursor-pointer"
            >
              {status === "loading" ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign in
                  <ArrowRightIcon className="h-4 w-4" />
                </>
              )}
            </button>
            {status === "error" && (
              <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                <span className="mt-0.5 shrink-0">
                  <AlertIcon className="h-4 w-4" />
                </span>
                {error}
              </div>
            )}
          </form>
        </div>
        <p className="mt-6 text-center text-xs text-base-400">
          Restricted area · Authorized personnel only
        </p>
      </div>
    </section>
  );
}

function LockIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
      />
    </svg>
  );
}

function KeyIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z"
      />
    </svg>
  );
}

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
    </svg>
  );
}

function AlertIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
      />
    </svg>
  );
}
