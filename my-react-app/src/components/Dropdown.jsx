import React, { useState } from 'react';

export function Dropdown({ label, options, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          padding: '0.5rem 1rem',
          backgroundColor: '#475569',
          color: '#fff',
          border: 'none',
          borderRadius: '0.375rem',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}
      >
        {label} ▼
      </button>
      {isOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          backgroundColor: '#1e293b',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '0.375rem',
          marginTop: '0.25rem',
          minWidth: '150px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
          zIndex: 10
        }}>
          {options.map((option, index) => (
            <div
              key={index}
              onClick={() => {
                onSelect(option);
                setIsOpen(false);
              }}
              style={{
                padding: '0.5rem 1rem',
                cursor: 'pointer',
                color: '#f8fafc'
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}