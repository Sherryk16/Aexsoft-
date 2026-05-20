"use client";
import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, Loader2, AlertCircle } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi! 👋 I'm AEXSOFT's AI assistant. How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [aiError, setAiError] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    
    const userMessage = input.trim();
    setInput("");
    setLoading(true);
    setAiError(false);
    
    const history = messages.map(m => ({ role: m.role, content: m.content }));
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    
    try {
      const res = await fetch('/api/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage, history })
      });
      
      const data = await res.json();
      
      if (data.error) {
        setAiError(true);
        setMessages(prev => [...prev, { 
          role: "assistant", 
          content: "I'm having trouble connecting to AI. But you can reach us directly at aexsoftstudio@gmail.com or use our /contact page!" 
        }]);
      } else {
        setMessages(prev => [...prev, { role: "assistant", content: data.reply }]);
      }
    } catch (err) {
      setAiError(true);
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: "Something went wrong. Feel free to email us at aexsoftstudio@gmail.com!" 
      }]);
    }
    
    setLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="chatbot-btn"
      >
        <MessageCircle size={28} color="#fff" />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="chatbot-window">
          {/* Header */}
          <div style={{
            padding: "16px 20px",
            background: "linear-gradient(135deg, #3b82f6, #1e40af)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Bot size={22} color="#fff" />
              </div>
              <div>
                <div style={{ fontFamily: "Poppins,sans-serif", fontSize: 16, fontWeight: 700, color: "#fff" }}>AEXSOFT AI</div>
                <div style={{ fontFamily: "Inter,sans-serif", fontSize: 12, color: "rgba(255,255,255,0.7)" }}>Online now</div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: "rgba(255,255,255,0.1)",
                border: "none",
                borderRadius: 8,
                padding: 8,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <X size={20} color="#fff" />
            </button>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflow: "auto", padding: 20, display: "flex", flexDirection: "column", gap: 16 }}>
            {messages.map((msg, i) => (
              <div key={i} style={{
                display: "flex",
                justifyContent: msg.role === "user" ? "flex-end" : "flex-start"
              }}>
                <div style={{
                  maxWidth: "80%",
                  padding: "12px 16px",
                  borderRadius: msg.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                  background: msg.role === "user" ? "var(--accent)" : "var(--bg-subtle)",
                  color: msg.role === "user" ? "#fff" : "var(--text-primary)",
                  fontFamily: "Inter,sans-serif",
                  fontSize: 14,
                  lineHeight: 1.5,
                  whiteSpace: "pre-line"
                }}>
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ display: "flex", gap: 8, alignItems: "center", padding: "8px 0" }}>
                <Loader2 size={16} style={{ animation: "spin 1s linear infinite", color: "var(--text-muted)" }} />
                <span style={{ fontFamily: "Inter,sans-serif", fontSize: 12, color: "var(--text-muted)" }}>Typing...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div style={{ padding: 16, borderTop: "1px solid var(--border)", display: "flex", gap: 12 }}>
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              style={{
                flex: 1,
                padding: "12px 16px",
                borderRadius: 12,
                border: "1px solid var(--border)",
                background: "var(--bg)",
                color: "var(--text-primary)",
                fontFamily: "Inter,sans-serif",
                fontSize: 14,
                outline: "none"
              }}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || loading}
              style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                background: input.trim() && !loading ? "var(--accent)" : "var(--bg-subtle)",
                border: "none",
                cursor: input.trim() && !loading ? "pointer" : "not-allowed",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s ease"
              }}
            >
              <Send size={20} color={input.trim() && !loading ? "#fff" : "var(--text-muted)"} />
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .chatbot-btn {
          position: fixed;
          bottom: 24px;
          right: 24px;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: linear-gradient(135deg, #3b82f6, #1e40af);
          border: none;
          cursor: pointer;
          box-shadow: 0 8px 30px rgba(59, 130, 246, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          transition: transform 0.2s ease;
        }
        .chatbot-btn:hover {
          transform: scale(1.1);
        }
        .chatbot-window {
          position: fixed;
          bottom: 100px;
          right: 24px;
          width: 380px;
          height: 500px;
          max-height: calc(100vh - 120px);
          background: var(--bg-card);
          border-radius: 16;
          box-shadow: 0 20px 60px rgba(0,0,0,0.2);
          border: 1px solid var(--border);
          display: flex;
          flex-direction: column;
          z-index: 1000;
          overflow: hidden;
        }
        @media (max-width: 480px) {
          .chatbot-btn {
            bottom: 20px;
            left: 20px;
            right: auto;
          }
          .chatbot-window {
            bottom: 90px;
            left: 10px;
            right: 10px;
            width: auto;
            max-width: calc(100vw - 20px);
          }
        }
      `}</style>
    </>
  );
}