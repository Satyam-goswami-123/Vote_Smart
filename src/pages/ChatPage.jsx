import { useState, useRef, useEffect } from 'react';
import { Bot, Send, RotateCcw } from 'lucide-react';
import { getGeminiResponse } from '../services/gemini';
import './ChatPage.css';

const SUGGESTIONS = [
  'How do I register as a voter?',
  'What documents are needed to vote?',
  'What is an EPIC number?',
  'How does EVM work?',
  'Can I vote with Aadhaar card?',
  'What are my rights as a voter?',
  'How to find my polling booth?',
  'What is Model Code of Conduct?',
];

function formatMsg(text) {
  // Simple markdown-like bold
  return text.split('\n').map((line, i) => (
    <span key={i}>
      {line.split(/\*\*(.*?)\*\*/g).map((part, j) =>
        j % 2 === 1 ? <strong key={j}>{part}</strong> : part
      )}
      {i < text.split('\n').length - 1 && <br />}
    </span>
  ));
}

export default function ChatPage() {
  const [messages, setMessages] = useState([
    {
      id: 1, role: 'bot', text: 'Namaste! 🙏 I\'m **VoteBot**, your AI-powered election assistant.\n\nI can help you with voter registration, eligibility, polling information, and everything about Indian elections. What would you like to know?',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const endRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const sendMessage = async (text) => {
    const txt = text || input.trim();
    if (!txt) return;
    setInput('');
    setShowSuggestions(false);

    const userMsg = {
      id: Date.now(), role: 'user', text: txt,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    // We pass the previous messages to Gemini for context, excluding the initial welcome message
    const history = messages
      .filter((m, i) => i > 0 || m.role === 'user')
      .map(m => ({ role: m.role, text: m.text }));
    
    setMessages(m => [...m, userMsg]);
    setIsTyping(true);

    try {
      const reply = await getGeminiResponse(txt, history);
      setIsTyping(false);
      setMessages(m => [...m, {
        id: Date.now() + 1, role: 'bot', text: reply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } catch (error) {
      setIsTyping(false);
      setMessages(m => [...m, {
        id: Date.now() + 1, role: 'bot', text: "Sorry, I am having trouble connecting right now. Please try again later.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }
  };

  const clearChat = () => {
    setMessages([{
      id: Date.now(), role: 'bot',
      text: 'Chat cleared! How can I help you with your election queries?',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);
    setShowSuggestions(true);
  };

  return (
    <div className="chat-page">
      <div className="chat-sidebar">
        <div className="sidebar-header">
          <h3>VoteBot AI</h3>
          <p>Election Assistant</p>
        </div>
        <div className="sidebar-suggestions">
          <p className="sidebar-title">Quick Questions</p>
          {SUGGESTIONS.map((s, i) => (
            <button key={i} className="sidebar-suggestion" onClick={() => sendMessage(s)}>
              {s}
            </button>
          ))}
        </div>
        <div className="sidebar-info glass-card">
          <p className="sidebar-info-title">About VoteBot</p>
          <p className="sidebar-info-text">Powered by AI and trained on ECI guidelines, constitutional law, and official voter documentation.</p>
          <div className="sidebar-tags">
            <span className="badge badge-blue">ECI Guidelines</span>
            <span className="badge badge-green">Constitution</span>
            <span className="badge badge-saffron">Election Law</span>
          </div>
        </div>
      </div>

      <div className="chat-main">
        {/* Header */}
        <div className="chat-main-header">
          <div className="chat-main-agent">
            <div className="agent-avatar">
              <Bot size={20} color="#fff" />
              <span className="agent-online" />
            </div>
            <div>
              <p className="agent-name">VoteBot AI</p>
              <p className="agent-status">Online · Responds instantly</p>
            </div>
          </div>
          <div className="chat-main-actions">
            <button className="icon-btn" onClick={clearChat} title="Clear chat">
              <RotateCcw size={16} />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="chat-messages-area">
          {/* Suggestion chips at top */}
          {showSuggestions && (
            <div className="top-suggestions">
              <p className="top-sug-label">Popular questions</p>
              <div className="top-sug-chips">
                {SUGGESTIONS.slice(0, 4).map((s, i) => (
                  <button key={i} className="sug-chip" onClick={() => sendMessage(s)}>{s}</button>
                ))}
              </div>
            </div>
          )}

          {messages.map(msg => (
            <div key={msg.id} className={`msg-row ${msg.role}`}>
              {msg.role === 'bot' && (
                <div className="msg-avatar bot-av">
                  <Bot size={14} color="#fff" />
                </div>
              )}
              <div className="msg-wrapper">
                <div className={`msg-bubble ${msg.role}`}>
                  {formatMsg(msg.text)}
                </div>
                <span className="msg-time">{msg.time}</span>
              </div>
              {msg.role === 'user' && (
                <div className="msg-avatar user-av">U</div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="msg-row bot">
              <div className="msg-avatar bot-av"><Bot size={14} color="#fff" /></div>
              <div className="typing-indicator">
                <span /><span /><span />
              </div>
            </div>
          )}

          <div ref={endRef} />
        </div>

        {/* Input */}
        <div className="chat-input-area">
          <div className="chat-input-wrapper">
            <input
              ref={inputRef}
              className="chat-text-input"
              placeholder="Ask anything about elections…"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
            />
            <div className="chat-input-actions">
              <button
                className={`send-btn ${input.trim() ? 'active' : ''}`}
                onClick={() => sendMessage()}
                disabled={!input.trim() && !isTyping}
              >
                <Send size={16} />
              </button>
            </div>
          </div>
          <p className="chat-disclaimer">VoteBot provides general election information. For official guidance, visit voters.eci.gov.in</p>
        </div>
      </div>
    </div>
  );
}
