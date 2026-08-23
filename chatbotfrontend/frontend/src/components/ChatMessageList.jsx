import ChatMessage from './ChatMessage';
import Loader from './Loader';
import EmptyState from './EmptyState';

function ChatMessageList({ messages, loading }) {
  return (
    <div className="chat-messages">
      {/* Agar messages khali hain toh EmptyState dikhayein */}
      {messages.length === 0 ? (
        <EmptyState 
          title="No messages yet" 
          description="Start a conversation by typing a prompt below." 
        />
      ) : (
        messages.map((msg, index) => (
          <ChatMessage key={index} message={msg} />
        ))
      )}

      {/* Jab AI soch raha ho toh Loader dikhayein */}
      {loading && <Loader />}
    </div>
  );
}

export default ChatMessageList;