export function Card({ children, className = '', ...props }) {
  return (
    <div
      className={`rounded-xl border border-app-border bg-app-bg p-6 shadow-xs transition-all ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}