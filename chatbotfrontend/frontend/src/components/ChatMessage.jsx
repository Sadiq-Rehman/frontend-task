import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';
import { useState } from 'react';
import Toast from './Toast'; // <-- Toast component import kiya hai

function ChatMessage({ message }) {
  const isUser = message.sender === 'user';
  const [showToast, setShowToast] = useState(false); // <-- Toast state add ki hai

  const handleCopy = (codeText) => {
    navigator.clipboard.writeText(codeText);
    setShowToast(true); // Alert ki jagah Toast trigger hoga
  };

  return (
    <div className={`message-row ${message.sender}`}>
      <div className="avatar">
        {isUser ? '👤' : '🤖'}
      </div>
      <div className={`message ${message.sender}`}>
        <div className="bubble">
          {isUser ? (
            <p>{message.text}</p>
          ) : (
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]} 
              rehypePlugins={[rehypeHighlight]}
              components={{
                code({ className, children, ...props }) {
                  const codeContent = String(children).replace(/\n$/, '');
                  const isCodeBlock = className && (className.includes('language-') || className.includes('hljs'));

                  if (isCodeBlock) {
                    return (
                      <div className="code-block-wrapper">
                        <button 
                          className="copy-btn" 
                          onClick={() => handleCopy(codeContent)}
                        >
                          Copy
                        </button>
                        <pre>
                          <code className={className} {...props}>
                            {children}
                          </code>
                        </pre>
                      </div>
                    );
                  }
                  return <code className={className} {...props}>{children}</code>;
                }
              }}
            >
              {message.text}
            </ReactMarkdown>
          )}
        </div>
      </div>

      {/* Toast Notification Component */}
      {showToast && (
        <Toast 
          message="Code copied to clipboard!" 
          type="success" 
          onClose={() => setShowToast(false)} 
        />
      )}
    </div>
  );
}

export default ChatMessage;