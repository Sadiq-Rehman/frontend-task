export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all rounded-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-app-accent text-white hover:opacity-90 shadow-xs',
    secondary: 'bg-app-code text-app-heading hover:border-app-accent-border border border-app-border',
    danger: 'bg-red-600 text-white hover:bg-red-700 shadow-xs',
    outline: 'border border-app-border text-app-text hover:bg-app-code hover:text-app-heading',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-5 py-2.5 text-base',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}