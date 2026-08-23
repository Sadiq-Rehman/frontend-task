export function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-xs md:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-app-border bg-app-bg transition-transform duration-300 ease-in-out md:static md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand / Logo Area */}
        <div className="flex h-16 items-center justify-between px-6 border-b border-app-border">
          <span className="text-lg font-bold text-app-heading font-sans">
            🚀 Day6 Admin
          </span>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-app-text hover:bg-app-code md:hidden"
            aria-label="Close Sidebar"
          >
            ✕
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 space-y-1 p-4 overflow-y-auto">
          <a
            href="#dashboard"
            className="flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium text-app-heading bg-app-code transition-colors"
          >
            📊 Dashboard
          </a>
          <a
            href="#tasks"
            className="flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium text-app-text hover:bg-app-code hover:text-app-heading transition-colors"
          >
            📋 Tasks Management
          </a>
          <a
            href="#users"
            className="flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium text-app-text hover:bg-app-code hover:text-app-heading transition-colors"
          >
            👥 Users & Roles
          </a>
          <a
            href="#settings"
            className="flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium text-app-text hover:bg-app-code hover:text-app-heading transition-colors"
          >
            ⚙️ Settings
          </a>
        </nav>

        {/* Footer / User Profile snippet */}
        <div className="p-4 border-t border-app-border">
          <div className="flex items-center gap-3 rounded-xl p-3 bg-app-code">
            <div className="h-9 w-9 rounded-full bg-app-accent flex items-center justify-center text-white font-bold text-sm">
              SR
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-semibold text-app-heading truncate">Sadiq Rehman</p>
              <p className="text-xs text-app-text truncate">Developer</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}