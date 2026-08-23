import  'react';

export default function Sidebar({ chats, currentChatId, onSelectChat, onNewChat, currentUser, onLogout }) {
  return (
    <aside className="app-sidebar">
      <div className="sidebar-top">
        <button className="new-chat-btn" onClick={onNewChat}>
          <span>+</span> New chat
        </button>
      </div>

      <div className="sidebar-history">
        <div className="sidebar-section-title">Recent</div>
        <div className="history-list">
          {chats.map(chat => (
            <div 
              key={chat.id} 
              className={`history-item ${chat.id === currentChatId ? 'active' : ''}`}
              onClick={() => onSelectChat(chat.id)}
            >
              <span className="history-text">{chat.title}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="sidebar-footer">
        <div className="user-profile-info">
          <span className="user-avatar">👤</span>
          <span className="user-email">{currentUser?.email || 'User'}</span>
        </div>
        <button className="sidebar-logout-btn" onClick={onLogout}>
          Logout
        </button>
      </div>
    </aside>
  );
}