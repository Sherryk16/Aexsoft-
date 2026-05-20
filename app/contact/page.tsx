"use client";
import React, { useState } from "react";
import { Mail, Send, CheckCircle } from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSending(true);
    
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "bb7af29c-a4bb-46ae-ab73-9041935e40d7",
          name: form.name,
          email: form.email,
          message: form.message,
          subject: "New Contact Form Submission"
        })
      });
      if (res.ok) {
        setSent(true);
        setForm({ name: "", email: "", message: "" });
      }
    } catch (err) {
      alert("Something went wrong. Try again.");
    }
    setSending(false);
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <section style={{ 
        background: "linear-gradient(135deg, var(--accent) 0%, #818cf8 100%)", 
        padding: "80px 0 60px", 
        textAlign: "center" 
      }}>
        <h1 style={{ 
          fontFamily: "Poppins,sans-serif", 
          fontSize: "clamp(32px,5vw,48px)", 
          fontWeight: 800, 
          color: "#fff",
          marginBottom: 12 
        }}>
          Get In Touch
        </h1>
        <p style={{ 
          fontFamily: "Inter,sans-serif", 
          fontSize: 17, 
          color: "rgba(255,255,255,0.85)",
          maxWidth: 500,
          margin: "0 auto" 
        }}>
          Have a project in mind? We'd love to hear from you.
        </p>
      </section>

      <div className="site-container" style={{ padding: "60px 20px" }}>
        <div className="contact-grid" style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", 
          gap: 40,
          maxWidth: 1100,
          margin: "0 auto"
        }}>
          <div>
            <h2 style={{ 
              fontFamily: "Poppins,sans-serif", 
              fontSize: 26, 
              fontWeight: 700, 
              color: "var(--text-primary)",
              marginBottom: 24 
            }}>
              Let's Talk
            </h2>
            
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <div style={{ 
                  width: 48, height: 48, borderRadius: 12, 
                  background: "var(--accent)", display: "flex", 
                  alignItems: "center", justifyContent: "center", color: "#fff" 
                }}>
                  <Mail size={22} />
                </div>
                <div>
                  <div style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 2 }}>Email</div>
                  <div style={{ fontSize: 15, color: "var(--text-primary)", fontWeight: 500 }}>aexsoftstudio@gmail.com</div>
                </div>
              </div>
              
              
            </div>
          </div>

          <div className="card" style={{ padding: 32, background: "var(--bg-surface)" }}>
            {sent ? (
              <div style={{ textAlign: "center", padding: "40px 20px" }}>
                <CheckCircle size={64} style={{ color: "#10b981", marginBottom: 16 }} />
                <h3 style={{ fontFamily: "Poppins,sans-serif", fontSize: 20, fontWeight: 600, color: "var(--text-primary)", marginBottom: 8 }}>
                  Message Sent!
                </h3>
                <p style={{ color: "var(--text-secondary)" }}>We'll get back to you soon.</p>
                <button 
                  onClick={() => setSent(false)}
                  style={{ marginTop: 20, padding: "10px 20px", background: "var(--accent)", color: "#fff", border: "none", borderRadius: 8, cursor: "pointer" }}
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3 style={{ fontFamily: "Poppins,sans-serif", fontSize: 20, fontWeight: 600, color: "var(--text-primary)", marginBottom: 20 }}>
                  Send a Message
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    style={{ 
                      padding: "14px 16px", 
                      borderRadius: 10, 
                      border: "1px solid var(--border)",
                      background: "var(--bg)",
                      color: "var(--text-primary)",
                      fontSize: 15
                    }}
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    style={{ 
                      padding: "14px 16px", 
                      borderRadius: 10, 
                      border: "1px solid var(--border)",
                      background: "var(--bg)",
                      color: "var(--text-primary)",
                      fontSize: 15
                    }}
                  />
                  <textarea
                    placeholder="Tell us about your project..."
                    rows={5}
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    style={{ 
                      padding: "14px 16px", 
                      borderRadius: 10, 
                      border: "1px solid var(--border)",
                      background: "var(--bg)",
                      color: "var(--text-primary)",
                      fontSize: 15,
                      resize: "vertical"
                    }}
                  />
                  <button
                    type="submit"
                    disabled={sending}
                    style={{ 
                      padding: "14px 24px", 
                      borderRadius: 10, 
                      border: "none",
                      background: "var(--accent)",
                      color: "#fff",
                      fontSize: 15,
                      fontWeight: 600,
                      cursor: sending ? "not-allowed" : "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 8,
                      opacity: sending ? 0.7 : 1
                    }}
                  >
                    {sending ? "Sending..." : <>Send Message <Send size={18} /></>}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}