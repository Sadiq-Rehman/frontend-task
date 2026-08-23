import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

export default function DashboardLayout({ children }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* CSS Grid + Flexbox Fallback & Breakpoints Injection */}
      <style>{`
        .dashboard-grid-layout {
          display: flex; /* Flexbox fallback for older browsers */
          flex-wrap: wrap;
          width: 100vw;
          height: 100vh;
          background-color: #121216;
          color: #fff;
          overflow: hidden;
          position: relative;
          box-sizing: border-box;
        }

        @supports (display: grid) {
          .dashboard-grid-layout {
            display: grid;
            grid-template-columns: repeat(12, minmax(0, 1fr));
          }
        }

        /* Responsive Column Spans based on breakpoints */
        .sidebar-col {
          grid-column: span 12;
        }
        .main-col {
          grid-column: span 12;
        }

        /* 576px Breakpoint */
        @media (min-width: 576px) {
          /* Small devices tweaks if needed */
        }

        /* 768px Breakpoint (Tablets) */
        @media (min-width: 768px) {
          /* Tablet view adjustments */
        }

        /* 1024px Breakpoint (Desktops / Laptops) */
        @media (min-width: 1024px) {
          .sidebar-col {
            grid-column: span 3 / span 3; /* Sidebar takes 3 out of 12 columns */
          }
          .main-col {
            grid-column: span 9 / span 9; /* Main content takes remaining 9 columns */
          }
        }
      `}</style>

      <div className="dashboard-grid-layout">
        
        {/* Mobile Backdrop Overlay when sidebar is open */}
        {isMobileMenuOpen && (
          <div 
            style={styles.backdrop} 
            onClick={() => setIsMobileMenuOpen(false)} 
          />
        )}

        {/* Responsive Sidebar (Grid Column Span + Fixed Drawer on Mobile) */}
        <aside style={{
          ...styles.sidebar,
          transform: isMobileMenuOpen ? 'translateX(0)' : 'translateX(-100px)', // Handled by media query/classes on desktop
        }} className="sidebar-col app-sidebar">
          <div style={styles.sidebarHeader}>
            <h2 style={styles.logoText}>🤖 AI Portal</h2>
            <button 
              style={styles.closeBtn} 
              onClick={() => setIsMobileMenuOpen(false)}
            >
              ✕
            </button>
          </div>

          <ul style={styles.navLinks}>
            <li><Link to="/dashboard" style={styles.link}>💬 Chat Overview</Link></li>
            <li><Link to="/dashboard/profile" style={styles.link}>👤 Profile</Link></li>
            <li><Link to="/dashboard/products" style={styles.link}>📦 Products</Link></li>
            <li><Link to="/dashboard/analytics" style={styles.link}>📊 Analytics</Link></li>
            <li><Link to="/dashboard/settings" style={styles.link}>⚙️ Settings</Link></li>
          </ul>

          <div style={styles.sidebarFooter}>
            <Link to="/" style={styles.logoutLink}>← Back to Home</Link>
          </div>
        </aside>

        {/* Main Wrapper (Topbar + Content Area) */}
        <div style={styles.mainWrapper} className="main-col">
          
          {/* Topbar */}
          <header style={styles.topbar}>
            <div style={styles.topbarLeft}>
              {/* Hamburger Menu Button for Mobile */}
              <button 
                style={styles.hamburgerBtn} 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                ☰
              </button>
              <span style={styles.portalTitle}>Workspace</span>
            </div>
          </header>

          {/* Content Area */}
          <main style={styles.contentArea}>
            {children || <Outlet />}
          </main>

        </div>
      </div>
    </>
  );
}

// Inline Styles for clean layout components
const styles = {
  sidebar: {
    backgroundColor: '#1a1a22',
    borderRight: '1px solid #3a3a48',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '20px',
    height: '100%',
    zIndex: 1000,
    boxSizing: 'border-box',
    /* Mobile drawer style override via media query or conditional transform */
  },
  sidebarHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  logoText: {
    fontSize: '1.2rem',
    color: '#f5f5f7',
    margin: 0,
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    color: '#fff',
    fontSize: '1.2rem',
    cursor: 'pointer',
    display: 'none',
  },
  navLinks: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  link: {
    color: '#a0a0b0',
    textDecoration: 'none',
    display: 'block',
    padding: '10px 12px',
    borderRadius: '6px',
    fontSize: '0.95rem',
    transition: 'background 0.2s',
  },
  sidebarFooter: {
    borderTop: '1px solid #3a3a48',
    paddingTop: '15px',
  },
  logoutLink: {
    color: '#ff4b4b',
    textDecoration: 'none',
    fontSize: '0.9rem',
    fontWeight: '500',
  },
  mainWrapper: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    boxSizing: 'border-box',
    overflow: 'hidden',
  },
  topbar: {
    height: '60px',
    backgroundColor: '#1a1a22',
    borderBottom: '1px solid #3a3a48',
    display: 'flex',
    alignItems: 'center',
    padding: '0 20px',
    flexShrink: 0,
    boxSizing: 'border-box',
  },
  topbarLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
  },
  hamburgerBtn: {
    background: 'none',
    border: '1px solid #3a3a48',
    color: '#fff',
    fontSize: '1.2rem',
    padding: '4px 8px',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  portalTitle: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#d0d0dc',
  },
  contentArea: {
    flex: 1,
    overflowY: 'auto',
    backgroundColor: '#121216',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
  },
  backdrop: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 999,
  }
};