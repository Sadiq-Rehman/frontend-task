export function Input({ label, error, className = '', id, ...props }) {
  const inputId = id || props.name;

  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label htmlFor={inputId} className="block text-xs font-semibold text-app-heading">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`w-full rounded-lg border bg-app-bg px-3.5 py-2 text-sm text-app-text placeholder:text-app-text/50 focus:outline-hidden focus:ring-2 transition-all ${
          error
            ? 'border-red-500 focus:ring-red-500/20'
            : 'border-app-border focus:border-app-accent focus:ring-app-accent/20'
        } ${className}`}
        {...props}
      />
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}