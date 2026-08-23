export default function Tabs({ tabs = [], activeTab, onChange }) {
  // Agar tabs array khali hai ya activeTab valid nahi hai toh null return karein
  if (!tabs || tabs.length === 0) return null;

  return (
    <div className="tabs-container">
      <div className="tabs-header">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`tab-btn ${activeTab === index ? 'active' : ''}`}
            onClick={() => onChange(index)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="tabs-content">
        {tabs[activeTab] && tabs[activeTab].content}
      </div>
    </div>
  );
}