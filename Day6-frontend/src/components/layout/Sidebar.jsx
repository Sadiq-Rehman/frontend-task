export function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-xs md:hidden" 
          onClick={onClose} 
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-app-border bg-app-bg transition-transform duration-300 ease-in-out md:static md:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Brand / Logo Header */}
        <div className="flex h-16 items-center justify-between px-6 border-b border-app-border">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-app-accent text-white font-bold">
              T
            </div>
            <span className="text-lg font-bold text-app-heading font-heading">TaskHub</span>
          </div>
          <button 
            onClick={onClose} 
            className="rounded-lg p-1 text-app-text hover:bg-app-code md:hidden"
            aria-label="Close Sidebar"
          >
            ✕
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 space-y-1 p-4 overflow-y-auto">
          <a href="#" className="flex items-center gap-3 rounded-xl bg-app-accent/10 px-4 py-3 text-sm font-semibold text-app-accent">
            📊 Dashboard
          </a>
          <a href="#" className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-app-text hover:bg-app-code hover:text-app-heading transition-colors">
            📋 Tasks
          </a>
          <a href="#" className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-app-text hover:bg-app-code hover:text-app-heading transition-colors">
            📈 Analytics
          </a>
          <a href="#" className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-app-text hover:bg-app-code hover:text-app-heading transition-colors">
            ⚙️ Settings
          </a>
        </nav>

        {/* Footer info */}
        <div className="p-4 border-t border-app-border">
          <div className="rounded-xl bg-app-code p-3 text-xs text-app-text">
            <span className="font-semibold text-app-heading block mb-0.5">Planet Beyond</span>
            Day6-frontend Internship
          </div>
        </div>
      </aside>
    </>
  );
}