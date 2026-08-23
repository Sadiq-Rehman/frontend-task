import { useState } from 'react';

export function Tabs({ tabs }) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      <div style={{ display: 'flex', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', marginBottom: '1rem' }}>
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            style={{
              padding: '0.5rem 1rem',
              background: 'none',
              border: 'none',
              borderBottom: activeTab === index ? '2px solid #38bdf8' : 'none',
              color: activeTab === index ? '#38bdf8' : '#94a3b8',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div style={{ color: '#f8fafc' }}>
        {tabs[activeTab].content}
      </div>
    </div>
  );
}