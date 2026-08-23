export function Badge({ children, variant = 'neutral', className = '' }) {
  const variants = {
    success: 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20',
    warning: 'bg-amber-500/10 text-amber-600 border border-amber-500/20',
    danger: 'bg-red-500/15 text-red-600 border border-red-500/20',
    neutral: 'bg-app-code text-app-text border border-app-border',
    accent: 'bg-app-accent-bg text-app-accent border border-app-accent-border',
  };

  return (
    <span
      className={`inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}