import { useState } from 'react';
import { Button } from './Button';
import { Badge } from './Badge';
import { Card } from './Card';
import { Input } from './Input';
import { Loader } from './Loader';
import { EmptyState } from './EmptyState';
import { ErrorState } from './ErrorState';

export function ComponentPlayground() {
  const [activeTab, setActiveTab] = useState('buttons');
  const [sampleInput, setSampleInput] = useState('');

  return (
    <div style={{ background: '#ffffff', color: '#1e293b', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '2rem', marginBottom: '2rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
      <h2>🎨 UI Component Playground & Documentation</h2>
      <p style={{ color: '#64748b', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
        Explore your design system components, inspect variants, states, and review code usage examples.
      </p>

      {/* Navigation Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', borderBottom: '2px solid #f1f5f9', paddingBottom: '0.75rem', marginBottom: '1.5rem', overflowX: 'auto' }}>
        {['buttons', 'badges', 'cards', 'inputs', 'states'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              background: activeTab === tab ? '#2563eb' : '#f8fafc',
              color: activeTab === tab ? '#ffffff' : '#475569',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: '600',
              textTransform: 'capitalize',
              fontSize: '0.9rem'
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Section 1: Buttons */}
      {activeTab === 'buttons' && (
        <div>
          <h3>Buttons & Variants</h3>
          <p style={{ fontSize: '0.85rem', color: '#64748b' }}>Reusable button component with multiple style variants.</p>
          
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', margin: '1.5rem 0', flexWrap: 'wrap' }}>
            <Button variant="primary" onClick={() => alert('Primary clicked')}>Primary Button</Button>
            <Button variant="secondary" onClick={() => alert('Secondary clicked')}>Secondary Button</Button>
            <Button variant="danger" onClick={() => alert('Danger clicked')}>Danger Button</Button>
          </div>

          <div style={{ background: '#0f172a', color: '#e2e8f0', padding: '1rem', borderRadius: '8px', fontSize: '0.85rem', fontFamily: 'monospace' }}>
            <code>{`<Button variant="primary" onClick={handleClick}>Primary Button</Button>`}</code>
          </div>
        </div>
      )}

      {/* Section 2: Badges */}
      {activeTab === 'badges' && (
        <div>
          <h3>Badges & Status Tags</h3>
          <p style={{ fontSize: '0.85rem', color: '#64748b' }}>Used for priorities, tags, and status indicators.</p>
          
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', margin: '1.5rem 0', flexWrap: 'wrap' }}>
            <Badge variant="High">High Priority</Badge>
            <Badge variant="Medium">Medium Priority</Badge>
            <Badge variant="Low">Low Priority</Badge>
          </div>

          <div style={{ background: '#0f172a', color: '#e2e8f0', padding: '1rem', borderRadius: '8px', fontSize: '0.85rem', fontFamily: 'monospace' }}>
            <code>{`<Badge variant="High">High Priority</Badge>`}</code>
          </div>
        </div>
      )}

      {/* Section 3: Cards */}
      {activeTab === 'cards' && (
        <div>
          <h3>Container Cards</h3>
          <p style={{ fontSize: '0.85rem', color: '#64748b' }}>Flexible content wrappers supporting titles, counts, and child components.</p>
          
          <div style={{ margin: '1.5rem 0' }}>
            <Card title="Sample Showcase Card" count={3} variant="primary">
              <p style={{ margin: 0 }}>This is child content rendered inside the Card wrapper component.</p>
            </Card>
          </div>

          <div style={{ background: '#0f172a', color: '#e2e8f0', padding: '1rem', borderRadius: '8px', fontSize: '0.85rem', fontFamily: 'monospace' }}>
            <code>{`<Card title="Card Title" count={3} variant="primary">\n  <p>Child content here</p>\n</Card>`}</code>
          </div>
        </div>
      )}

      {/* Section 4: Inputs */}
      {activeTab === 'inputs' && (
        <div>
          <h3>Form Inputs & Controlled States</h3>
          <p style={{ fontSize: '0.85rem', color: '#64748b' }}>Standardized form inputs with labels and event handlers.</p>
          
          <div style={{ margin: '1.5rem 0', maxWidth: '400px' }}>
            <Input 
              id="playground-input"
              label="Playground Input Field"
              value={sampleInput}
              onChange={(e) => setSampleInput(e.target.value)}
              placeholder="Type something here..."
            />
            <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>Live value: {sampleInput || '(empty)'}</p>
          </div>

          <div style={{ background: '#0f172a', color: '#e2e8f0', padding: '1rem', borderRadius: '8px', fontSize: '0.85rem', fontFamily: 'monospace' }}>
            <code>{`<Input id="name" label="Your Name" value={val} onChange={handler} />`}</code>
          </div>
        </div>
      )}

      {/* Section 5: System States */}
      {activeTab === 'states' && (
        <div>
          <h3>System Feedback & States</h3>
          <p style={{ fontSize: '0.85rem', color: '#64748b' }}>Components handling asynchronous loading, empty datasets, and error handling.</p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', margin: '1.5rem 0' }}>
            <div style={{ border: '1px solid #e2e8f0', padding: '1rem', borderRadius: '8px' }}>
              <h4>Loader State</h4>
              <Loader message="Synchronizing with server..." />
            </div>

            <div style={{ border: '1px solid #e2e8f0', padding: '1rem', borderRadius: '8px' }}>
              <h4>Empty State</h4>
              <EmptyState title="No Records Found" description="Try adjusting your filter criteria." actionLabel="Reset Filter" onAction={() => {}} />
            </div>

            <div style={{ border: '1px solid #e2e8f0', padding: '1rem', borderRadius: '8px' }}>
              <h4>Error State</h4>
              <ErrorState title="Failed to Connect" message="Database connection timeout." onRetry={() => {}} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}