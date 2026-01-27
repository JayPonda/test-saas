import React, { useState } from 'react';
import '../styles/Chat.css';

const Chat = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Welcome to the SaaS Demo App!',
      timestamp: new Date().toISOString(),
      sender: 'bot',
    },
    {
      id: 2,
      text: 'You can navigate using the sidebar to view Users, Subscriptions, Payments, and Analytics.',
      timestamp: new Date().toISOString(),
      sender: 'bot',
    },
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newMessage = {
      id: Date.now(),
      text: inputValue,
      timestamp: new Date().toISOString(),
      sender: 'user',
    };

    setMessages([...messages, newMessage]);
    setInputValue('');
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>Demo Chat</h2>
      </div>

      <div className="messages-list">
        {messages.map((message) => (
          <div key={message.id} className={`message ${message.sender}`}>
            <div className="message-content">
              <p>{message.text}</p>
              <span className="message-time">
                {new Date(message.timestamp).toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}
      </div>

      <form className="message-form" onSubmit={handleSendMessage}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type a message..."
          className="message-input"
        />
        <button type="submit" className="send-btn">
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;
