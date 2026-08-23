import 'highlight.js/styles/github-dark.css';
import { useState } from 'react';
import ChatHeader from './components/ChatHeader';
import ChatMessageList from './components/ChatMessageList';
import ChatInput from './components/ChatInput';
import Dropdown from './components/Dropdown';
import ErrorState from './components/ErrorState';
import LoginForm from './components/LoginForm';
import Sidebar from './components/Sidebar';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  
  // Multiple chats management (Gemini Style History)
  const [chats, setChats] = useState([
    { id: 1, title: 'New Conversation', messages: [{ sender: 'ai', text: 'Hello! How can I help you today?' }] }
  ]);
  const [currentChatId, setCurrentChatId] = useState(1);

  const [input, setInput] = useState('');
  const [selectedModel, setSelectedModel] = useState('llama3.2');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const modelOptions = [
    { label: 'Llama 3.2', value: 'llama3.2' },
    { label: 'Mistral', value: 'mistral' }
  ];

  // Current active chat ke messages nikalna
  const currentChat = chats.find(c => c.id === currentChatId) || chats[0];
  const messages = currentChat.messages;

  const handleNewChat = () => {
    const newChatObj = {
      id: Date.now(),
      title: 'New Conversation',
      messages: [{ sender: 'ai', text: 'Hello! How can I help you today?' }]
    };
    setChats(prev => [newChatObj, ...prev]);
    setCurrentChatId(newChatObj.id);
    setError(null);
  };

  const handleSelectChat = (id) => {
    setCurrentChatId(id);
    setError(null);
  };

  if (!isLoggedIn) {
    return (
      <div className="login-page-container">
        <div className="login-card">
          <LoginForm 
            onSuccess={(userData) => {
              setCurrentUser(userData);
              setIsLoggedIn(true);
            }} 
          />
        </div>
      </div>
    );
  }

  const updateCurrentChatMessages = (updater) => {
    setChats(prevChats => prevChats.map(chat => {
      if (chat.id === currentChatId) {
        const updatedMessages = typeof updater === 'function' ? updater(chat.messages) : updater;
        // Pehli user message ko chat title bana dena (Gemini style)
        let title = chat.title;
        if (chat.title === 'New Conversation') {
          const firstUserMsg = updatedMessages.find(m => m.sender === 'user');
          if (firstUserMsg) {
            title = firstUserMsg.text.length > 25 ? firstUserMsg.text.substring(0, 25) + '...' : firstUserMsg.text;
          }
        }
        return { ...chat, messages: updatedMessages, title };
      }
      return chat;
    }));
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input;
    setInput('');
    setError(null);
    
    updateCurrentChatMessages(prev => [
      ...prev, 
      { sender: 'user', text: userMessage },
      { sender: 'ai', text: '' }
    ]);
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8080/api/chat/stream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: selectedModel, prompt: userMessage }),
      });

      if (!response.ok) throw new Error('Failed to connect to server');
      if (!response.body) throw new Error('Streaming response body is unavailable.');

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulatedResponse = '';

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        accumulatedResponse += chunk;

        updateCurrentChatMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1].text = accumulatedResponse;
          return newMessages;
        });
      }
    } catch (err) {
      setError(err.message || 'Error connecting to streaming server.');
      updateCurrentChatMessages(prev => prev.slice(0, -1));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-page-container">
      {/* Gemini Style Sidebar */}
      <Sidebar 
        chats={chats}
        currentChatId={currentChatId}
        onSelectChat={handleSelectChat}
        onNewChat={handleNewChat}
        currentUser={currentUser}
        onLogout={() => setIsLoggedIn(false)}
      />

      {/* Main Chat Interface */}
      <div className="main-wrapper">
        <div className="chat-container">
          <ChatHeader />
          
          <div style={{ padding: '10px 20px', backgroundColor: '#202028', borderBottom: '1px solid #3a3a48', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '0.9rem', color: '#a0a0b0' }}>AI Model:</span>
              <Dropdown 
                options={modelOptions} 
                selected={selectedModel} 
                onSelect={(val) => setSelectedModel(val)} 
              />
            </div>
          </div>

          {error && <ErrorState message={error} onRetry={() => setError(null)} />}

          <ChatMessageList messages={messages} loading={loading} />

          <ChatInput 
            input={input} 
            setInput={setInput} 
            handleSend={handleSend} 
            loading={loading} 
          />
        </div>
      </div>
    </div>
  );
}

export default App;