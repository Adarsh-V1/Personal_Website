import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#f6f1e8] px-6 py-24 text-[#111827]">
      <div className="mx-auto flex max-w-3xl flex-col items-start gap-6">
        <p className="font-(family-name:--font-space-grotesk) text-sm font-medium uppercase tracking-[0.35em] text-[#7c5c2e]">
          404
        </p>
        <h1 className="font-(family-name:--font-space-grotesk) text-4xl font-semibold tracking-tight sm:text-6xl">
          This page does not exist.
        </h1>
        <p className="max-w-2xl font-(family-name:--font-manrope) text-base leading-7 text-[#4b5563] sm:text-lg">
          The route may have moved, the URL may be wrong, or the page was never published.
        </p>
        <Link
          href="/"
          className="inline-flex items-center rounded-full bg-[#111827] px-5 py-3 font-(family-name:--font-space-grotesk) text-sm font-medium text-white transition hover:bg-[#1f2937]"
        >
          Return home
        </Link>
      </div>
    </main>
  );
}
