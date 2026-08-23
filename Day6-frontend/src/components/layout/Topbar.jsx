export function Topbar({ onToggleMobileMenu }) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-app-border bg-app-bg/80 px-6 backdrop-blur-md">
      <div className="flex items-center gap-4">
        {/* Hamburger Mobile Toggle Button */}
        <button
          onClick={onToggleMobileMenu}
          className="rounded-lg border border-app-border p-2 text-app-heading hover:bg-app-code md:hidden transition-colors"
          aria-label="Open Mobile Menu"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <h1 className="text-base font-semibold text-app-heading">Dashboard Overview</h1>
      </div>

      <div className="flex items-center gap-3">
        <span className="hidden sm:inline-block rounded-full border border-app-border px-3 py-1 text-xs font-medium text-app-text bg-app-code">
          Environment: Local
        </span>
        <div className="h-8 w-8 rounded-full border border-app-border bg-app-code flex items-center justify-center text-xs font-bold text-app-heading">
          SR
        </div>
      </div>
    </header>
  );
}