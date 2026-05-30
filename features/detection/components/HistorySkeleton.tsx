export default function HistorySkeleton() {
  return (
    <div className="mt-8 grid gap-6 md:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse rounded-3xl border bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
        >
          <div className="h-48 rounded-2xl bg-slate-200 dark:bg-slate-800" />
          <div className="mt-4 h-5 w-32 rounded bg-slate-200 dark:bg-slate-800" />
          <div className="mt-3 h-4 w-40 rounded bg-slate-200 dark:bg-slate-800" />
          <div className="mt-3 h-4 w-28 rounded bg-slate-200 dark:bg-slate-800" />
        </div>
      ))}
    </div>
  );
}