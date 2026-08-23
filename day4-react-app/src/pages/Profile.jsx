import { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export function Profile() {
  // Set browser tab title dynamically
  useDocumentTitle('User Profile | Day 4 App');

  // Persist profile form data using useLocalStorage instead of local useState
  const [formData, setFormData] = useLocalStorage('user_profile_data', {
    name: 'Sadiq Rehman',
    email: 'sadiq@example.com',
    role: 'Software Engineering Intern',
  });

  const [isSaved, setIsSaved] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setIsSaved(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000); // Hide notice after 3s
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: '600px' }}>
      <h1>Profile</h1>
      <p style={{ color: '#64748b', marginBottom: '2rem' }}>User profile information and account settings (persisted via localStorage).</p>

      {isSaved && (
        <div style={{ background: '#dcfce7', color: '#166534', padding: '0.75rem 1rem', borderRadius: '6px', marginBottom: '1.5rem', border: '1px solid #bbf7d0' }}>
          Profile updated and saved successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ background: '#ffffff', padding: '2rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #e2e8f0' }}>
        <div style={{ marginBottom: '1.25rem' }}>
          <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.5rem', color: '#1e293b' }}>Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '1rem' }}
          />
        </div>

        <div style={{ marginBottom: '1.25rem' }}>
          <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.5rem', color: '#1e293b' }}>Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '1rem' }}
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.5rem', color: '#1e293b' }}>Role</label>
          <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
            style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '1rem' }}
          />
        </div>

        <button
          type="submit"
          style={{ background: '#2563eb', color: '#ffffff', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '6px', fontSize: '1rem', fontWeight: '600', cursor: 'pointer' }}
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}