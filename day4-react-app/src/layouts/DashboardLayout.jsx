// src/layouts/DashboardLayout.jsx
import { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';

export function DashboardLayout() {
  // Layout-level state
  const [user, setUser] = useState({
    name: 'Sadiq Rehman',
    email: 'sadiq@planetbeyond.com',
    role: 'Software Engineering Intern',
  });

  const [settings, setSettings] = useState({
    theme: 'light',
    notificationsEnabled: true,
  });

  // Function to update layout-level settings from child pages
  const toggleTheme = () => {
    setSettings((prev) => ({
      ...prev,
      theme: prev.theme === 'light' ? 'dark' : 'light',
    }));
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      {/* Shared Sidebar */}
      <aside style={{ width: '240px', background: '#0f172a', color: '#fff', padding: '2rem 1rem' }}>
        <h2 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', paddingLeft: '0.5rem' }}>User Portal</h2>
        <p style={{ fontSize: '0.8rem', color: '#94a3b8', paddingLeft: '0.5rem', marginBottom: '2rem' }}>
          Role: {user.role}
        </p>

        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <li>
            <Link to="/dashboard" style={{ display: 'block', padding: '0.5rem 1rem', color: '#cbd5e1', textDecoration: 'none', borderRadius: '4px' }}>Overview</Link>
          </li>
          <li>
            <Link to="/dashboard/profile" style={{ display: 'block', padding: '0.5rem 1rem', color: '#cbd5e1', textDecoration: 'none', borderRadius: '4px' }}>Profile</Link>
          </li>
          <li>
            <Link to="/dashboard/settings" style={{ display: 'block', padding: '0.5rem 1rem', color: '#cbd5e1', textDecoration: 'none', borderRadius: '4px' }}>Settings</Link>
          </li>
          <li>
            <Link to="/dashboard/analytics" style={{ display: 'block', padding: '0.5rem 1rem', color: '#cbd5e1', textDecoration: 'none', borderRadius: '4px' }}>Analytics</Link>
          </li>
          <li>
            <Link to="/dashboard/users" style={{ display: 'block', padding: '0.5rem 1rem', color: '#cbd5e1', textDecoration: 'none', borderRadius: '4px' }}>User Management</Link>
          </li>
          <hr style={{ borderColor: '#334155', margin: '1rem 0' }} />
          <li>
            <Link to="/" style={{ display: 'block', padding: '0.5rem 1rem', color: '#94a3b8', textDecoration: 'none', fontSize: '0.9rem' }}>&larr; Back to Home</Link>
          </li>
        </ul>
      </aside>

      {/* Main Content Area - Pass user, settings, and update functions via Outlet context */}
      <div style={{ flex: 1, background: settings.theme === 'dark' ? '#1e293b' : '#f1f5f9', color: settings.theme === 'dark' ? '#f8fafc' : '#0f172a', padding: '2rem', transition: 'background 0.2s ease' }}>
        <Outlet context={{ user, setUser, settings, toggleTheme }} />
      </div>
    </div>
  );
}