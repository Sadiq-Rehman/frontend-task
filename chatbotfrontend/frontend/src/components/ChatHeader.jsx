import Badge from './Badge';

function ChatHeader() {
  return (
    <div className="chat-header">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Local AI Chatbot (Streaming Llama 3.2)</h2>
        <Badge label="Online" variant="success" />
      </div>
    </div>
  );
}

export default ChatHeader;