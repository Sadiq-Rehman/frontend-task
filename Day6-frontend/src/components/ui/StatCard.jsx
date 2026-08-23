import { Card } from './Card';

export function StatCard({
  label,
  value,
  delta,
  isPositive = true,
  icon,
  isLoading = false,
}) {
  // Render loading skeleton state
  if (isLoading) {
    return (
      <div className="rounded-xl border border-app-border bg-app-bg p-6 shadow-xs animate-pulse">
        <div className="flex items-center justify-between">
          <div className="h-3.5 w-24 rounded bg-app-code" />
          <div className="h-9 w-9 rounded-lg bg-app-code" />
        </div>
        <div className="mt-4 h-8 w-16 rounded bg-app-code" />
        <div className="mt-3 h-3 w-28 rounded bg-app-code" />
      </div>
    );
  }

  return (
    <Card className="flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-app-text">
          {label}
        </span>
        {icon && (
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-app-code text-app-heading text-sm">
            {icon}
          </div>
        )}
      </div>

      <div className="mt-4 flex items-baseline justify-between">
        <h3 className="text-3xl font-bold text-app-heading tracking-tight">
          {value}
        </h3>
        {delta && (
          <span
            className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-semibold ${
              isPositive
                ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20'
                : 'bg-red-500/10 text-red-600 border border-red-500/20'
            }`}
          >
            {isPositive ? '↑' : '↓'} {delta}
          </span>
        )}
      </div>
    </Card>
  );
}