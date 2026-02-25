import React, { useState, useRef, useEffect } from 'react';
import { useChat } from '../hooks/useChat';

export const Chatbot: React.FC = () => {
  const { messages, isLoading, sendMessage } = useChat();
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      sendMessage(input);
      setInput('');
    }
  };

  return (
    <section id="chat" style={{ backgroundColor: '#1F2937', color: 'white', padding: '64px 24px' }}>
      <div style={{ maxWidth: '512px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '32px', textAlign: 'center' }}>Ask Me Anything</h2>
        <div style={{ backgroundColor: '#111827', padding: '24px', borderRadius: '8px', display: 'flex', flexDirection: 'column', height: '384px', border: '1px solid #374151' }}>
          <div style={{ flex: 1, overflowY: 'auto', marginBottom: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {messages.length === 0 && <div style={{ textAlign: 'center', color: '#9CA3AF', marginTop: '40px' }}>👋 Ask me anything!</div>}
            {messages.map((msg, i) => (
              <div key={i}>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '8px' }}><div style={{ backgroundColor: '#3B82F6', padding: '12px', borderRadius: '8px', maxWidth: '320px' }}>{msg.user_message}</div></div>
                <div style={{ display: 'flex', justifyContent: 'flex-start' }}><div style={{ backgroundColor: '#374151', padding: '12px', borderRadius: '8px', maxWidth: '320px' }}>{msg.assistant_message}</div></div>
              </div>
            ))}
            {isLoading && <div style={{ color: '#9CA3AF' }}>Typing...</div>}
            <div ref={messagesEndRef} />
          </div>
          <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '8px' }}>
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask..." style={{ flex: 1, backgroundColor: '#374151', color: 'white', padding: '8px 16px', borderRadius: '6px', border: 'none', outline: 'none' }} disabled={isLoading} />
            <button type="submit" disabled={isLoading} style={{ backgroundColor: '#3B82F6', color: 'white', padding: '8px 24px', borderRadius: '6px', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>Send</button>
          </form>
        </div>
      </div>
    </section>
  );
};