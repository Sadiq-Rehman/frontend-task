export default function DynamicList({ items = [], onDelete, onAction }) {
  
  // 1. Empty State: Agar array khali ho toh user ko message dikhayein
  if (!items || items.length === 0) {
    return (
      <div className="empty-state">
        <h3>No Data Available</h3>
        <p>There are no items to display right now.</p>
      </div>
    );
  }

  return (
    <div className="dynamic-list-container">
      {/* 2. Dynamic Arrays with Proper Keys */}
      {items.map((item) => (
        <div key={item.id} className="list-item-card">
          <div className="item-details">
            <h4>{item.name}</h4>
            <p>{item.description}</p>
          </div>

          {/* 3. Status Badges: Status ke mutabiq dynamic class ya badge */}
          <span className={`badge ${item.status.toLowerCase()}`}>
            {item.status}
          </span>

          {/* 4. Conditional Actions: Status ya role ke base par buttons show/hide karna */}
          <div className="item-actions">
            {item.status === 'Pending' && (
              <button 
                className="action-btn approve"
                onClick={() => onAction(item.id, 'APPROVE')}
              >
                Approve
              </button>
            )}

            {item.status === 'Active' && (
              <button 
                className="action-btn suspend"
                onClick={() => onAction(item.id, 'SUSPEND')}
              >
                Suspend
              </button>
            )}

            <button 
              className="action-btn delete"
              onClick={() => onDelete(item.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}