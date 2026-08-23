export default function TaskList({ items, onAction, onDelete }) {
  // Empty State
  if (!items || items.length === 0) {
    return (
      <div className="empty-state" style={{ padding: '20px' }}>
        <h3>No Tasks Available</h3>
        <p>All items have been cleared from the queue.</p>
      </div>
    );
  }

  return (
    <div className="dynamic-list-container">
      {items.map((item) => (
        <div key={item.id} className="list-item-card">
          <div className="item-details">
            <h4>{item.name}</h4>
            <p>{item.description}</p>
          </div>

          {/* Status Badge */}
          <span className={`badge ${item.status.toLowerCase()}`}>
            {item.status}
          </span>

          {/* Conditional Actions */}
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