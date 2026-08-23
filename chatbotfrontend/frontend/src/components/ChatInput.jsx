import Button from './Button';

function ChatInput({ input, setInput, handleSend, loading }) {
  return (
    <form className="chat-input-form" onSubmit={handleSend}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message..."
        disabled={loading}
      />
      <Button disabled={loading}>
        {loading ? 'Sending...' : 'Send'}
      </Button>
    </form>
  );
}

export default ChatInput;