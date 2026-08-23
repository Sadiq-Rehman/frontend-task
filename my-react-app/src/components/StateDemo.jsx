// src/components/StateDemo.jsx
import  { useState } from 'react';

export function StateDemo() {
  // 1. Counter State
  const [count, setCount] = useState(0);

  // 2. Toggle State
  const [isVisible, setIsVisible] = useState(false);

  // 3. Tabs State
  const [activeTab, setActiveTab] = useState('profile');

  // 4. Form State
  const [formData, setFormData] = useState({ name: '', email: '' });

  // 5. Modal State
  const [isOpen, setIsOpen] = useState(false);

  // 6. Selected Records State
  const items = [
    { id: 1, title: 'Learn React Hooks' },
    { id: 2, title: 'Master Spring Boot' }
  ];
  const [selectedRecord, setSelectedRecord] = useState(null);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    alert(`Submitted: ${formData.name} (${formData.email})`);
  };

  return (
    <div style={{ padding: '1rem', border: '2px dashed #38bdf8', borderRadius: '8px', marginTop: '2rem' }}>
      <h2>useState Hooks Showcase</h2>

      {/* 1. Counter */}
      <div style={{ marginBottom: '1rem', padding: '0.5rem', background: '#f8fafc', color: '#000', borderRadius: '4px' }}>
        <h4>1. Counter: {count}</h4>
        <button onClick={() => setCount(count + 1)} style={{ marginRight: '0.5rem' }}>Increment</button>
        <button onClick={() => setCount(count - 1)} style={{ marginRight: '0.5rem' }}>Decrement</button>
        <button onClick={() => setCount(0)}>Reset</button>
      </div>

      {/* 2. Toggle */}
      <div style={{ marginBottom: '1rem', padding: '0.5rem', background: '#f8fafc', color: '#000', borderRadius: '4px' }}>
        <h4>2. Toggle</h4>
        <button onClick={() => setIsVisible(!isVisible)}>
          {isVisible ? 'Hide Details' : 'Show Details'}
        </button>
        {isVisible && <p style={{ marginTop: '0.5rem' }}>Surprise! Here are the hidden details.</p>}
      </div>

      {/* 3. Tabs */}
      <div style={{ marginBottom: '1rem', padding: '0.5rem', background: '#f8fafc', color: '#000', borderRadius: '4px' }}>
        <h4>3. Tabs</h4>
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <button onClick={() => setActiveTab('profile')} style={{ fontWeight: activeTab === 'profile' ? 'bold' : 'normal' }}>Profile</button>
          <button onClick={() => setActiveTab('settings')} style={{ fontWeight: activeTab === 'settings' ? 'bold' : 'normal' }}>Settings</button>
        </div>
        <div>
          {activeTab === 'profile' && <p>Viewing User Profile panel.</p>}
          {activeTab === 'settings' && <p>Viewing Account Settings panel.</p>}
        </div>
      </div>

      {/* 4. Form */}
      <form onSubmit={handleFormSubmit} style={{ marginBottom: '1rem', padding: '0.5rem', background: '#f8fafc', color: '#000', borderRadius: '4px' }}>
        <h4>4. Form State</h4>
        <div style={{ marginBottom: '0.5rem' }}>
          <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleFormChange} />
        </div>
        <div style={{ marginBottom: '0.5rem' }}>
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleFormChange} />
        </div>
        <button type="submit">Submit Form</button>
      </form>

      {/* 5. Modal Trigger */}
      <div style={{ marginBottom: '1rem', padding: '0.5rem', background: '#f8fafc', color: '#000', borderRadius: '4px' }}>
        <h4>5. Modal</h4>
        <button onClick={() => setIsOpen(true)}>Open Modal</button>
        {isOpen && (
          <div style={{ background: 'rgba(0,0,0,0.6)', position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
            <div style={{ background: '#fff', padding: '2rem', borderRadius: '8px', color: '#000' }}>
              <h3>Modal Title</h3>
              <p>This is a popup modal controlled by useState.</p>
              <button onClick={() => setIsOpen(false)}>Close Modal</button>
            </div>
          </div>
        )}
      </div>

      {/* 6. Selected Records */}
      <div style={{ padding: '0.5rem', background: '#f8fafc', color: '#000', borderRadius: '4px' }}>
        <h4>6. Selected Records</h4>
        <ul>
          {items.map(item => (
            <li key={item.id} onClick={() => setSelectedRecord(item)} style={{ cursor: 'pointer', color: selectedRecord?.id === item.id ? 'blue' : 'black', textDecoration: 'underline' }}>
              {item.title} {selectedRecord?.id === item.id && '(Selected)'}
            </li>
          ))}
        </ul>
        {selectedRecord && <p><strong>Currently Viewing:</strong> {selectedRecord.title}</p>}
      </div>
    </div>
  );
}