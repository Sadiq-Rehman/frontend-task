export function EmptyState({ title = 'No data found', description = 'Get started by creating a new record.', action }) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center">
      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-app-code text-xl">
        📂
      </div>
      <h3 className="text-base font-semibold text-app-heading">{title}</h3>
      <p className="mt-1 max-w-sm text-xs text-app-text">{description}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}