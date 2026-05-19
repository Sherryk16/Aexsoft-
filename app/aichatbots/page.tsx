"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { 
  Bot, Phone, MessageSquare, Globe, Brain, Cpu, Zap, 
  Shield, Headphones, Mic, FileText, Users, Workflow,
  TrendingUp, CheckCircle2, ArrowRight
} from "lucide-react";

function useReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); o.disconnect(); } }, { threshold });
    o.observe(el); return () => o.disconnect();
  }, [threshold]);
  return { ref, v };
}

const fade = (v: boolean, d = 0): React.CSSProperties => ({
  opacity: v ? 1 : 0,
  transform: v ? "translate3d(0, 0, 0)" : "translate3d(0, 28px, 0)",
  transition: `opacity 0.6s ease ${d}s, transform 0.6s ease ${d}s`,
});

const solutions = [
  {
    id: "voice-agents",
    icon: <Phone size={28} />,
    title: "Voice AI Agents",
    headline: "Autonomous Voice Conversations",
    desc: "Our voice AI agents handle inbound and outbound calls with natural human-like cadence. They understand context, handle objections, and seamlessly transfer to human agents when needed.",
    features: [
      { icon: <Mic size={20} />, title: "Natural Speech", desc: "Advanced TTS and STT with human-like intonation and pauses." },
      { icon: <Brain size={20} />, title: "Context Aware", desc: "Remembers conversation history and adapts responses accordingly." },
      { icon: <Workflow size={20} />, title: "Multi-Turn Dialog", desc: "Handles complex conversations with proper fallback logic." },
      { icon: <Shield size={20} />, title: "GDPR Compliant", desc: "Enterprise-grade security with call recording and consent management." },
    ],
    tags: ["OpenAI", "ElevenLabs", "Twilio", "Python", "WebSockets"],
    img: "aichatbot/callingagent.png",
  },
  {
    id: "whatsapp-bots",
    icon: <MessageSquare size={28} />,
    title: "WhatsApp & Omnichannel Bots",
    headline: "Scale Customer Support Globally",
    desc: "Deploy intelligent chatbots across WhatsApp, Instagram, Facebook Messenger, and your website. Handle orders, answer FAQs, and provide 24/7 support in multiple languages.",
    showcases: [
      { 
        title: "E-commerce Assistant", 
        desc: "Product recommendations, order tracking, and cart recovery. Integrate with Shopify and Stripe for seamless checkout.",
        img: "aichatbot/whatsapp.png"
      },
      { 
        title: "Lead Qualification Bot", 
        desc: "Auto-qualify leads with conversational forms, schedule meetings directly to your calendar, and push data to CRM.",
        img: "aichatbot/whatsapp.png"
      }
    ],
    tags: ["WhatsApp API", "Meta Business", "Rasa", "LangChain", "Vector DB"],
    img: "aichatbot/whatsapp.png",
  },
  {
    id: "custom-llm",
    icon: <Brain size={28} />,
    title: "Custom LLM Solutions",
    headline: "Your Own AI Brain",
    desc: "Train custom language models on your proprietary data. Build internal knowledge bases, document assistants, and domain-specific AI that understands your business.",
    showcases: [
      { 
        title: "Document Q&A System", 
        desc: "Upload PDFs, docs, and knowledge bases. Employees ask questions and get instant, accurate answers with source citations.",
        img: "aichatbot/image.png"
      },
      { 
        title: "Code Assistant", 
        desc: "Train on your codebase and internal docs. Developers get instant answers about architecture, APIs, and coding standards.",
        img: "aichatbot/image.png"
      }
    ],
    tags: ["LangChain", "Pinecone", "OpenAI", "Fine-tuning", "Docker"],
    img: "aichatbot/image.png",
  },
  {
    id: "automation",
    icon: <Zap size={28} />,
    title: "Workflow Automation",
    headline: "Automate Repetitive Tasks",
    desc: "Connect AI to your existing tools. Automate data entry, generate reports, send notifications, and trigger actions across your entire tech stack.",
    features: [
      { icon: <Workflow size={20} />, title: "No-Code Integration", desc: "Connect 5000+ apps via Zapier, Make, or custom APIs." },
      { icon: <FileText size={20} />, title: "Smart Document Processing", desc: "Extract data from invoices, forms, and contracts automatically." },
      { icon: <Users size={20} />, title: "Team Notifications", desc: "AI alerts your team via Slack, Email, or SMS when action is needed." },
      { icon: <TrendingUp size={20} />, title: "Analytics Dashboard", desc: "Track automation ROI, response times, and customer satisfaction." },
    ],
    tags: ["n8n", "Python", "Webhooks", "Slack API", "AWS Lambda"],
    img: "aichatbot/image.png",
  },
];

const benefits = [
  { icon: <Headphones size={22} />, title: "24/7 Availability", desc: "Never miss a lead. Your AI works around the clock, even on holidays." },
  { icon: <TrendingUp size={22} />, title: "3x More Leads", desc: "Instant response times and proactive follow-up convert more prospects." },
  { icon: <Zap size={22} />, title: "70% Cost Reduction", desc: "Automate 70% of routine inquiries without sacrificing quality." },
  { icon: <Shield size={22} />, title: "Enterprise Security", desc: "SOC 2 compliant, encrypted data, and GDPR ready." },
];

const faq = [
  {
    q: "How long does it take to deploy a chatbot?",
    a: "Basic FAQ bots can be live in 1-2 weeks. Complex voice agents and custom LLMs typically take 4-8 weeks depending on integration requirements.",
  },
  {
    q: "Can the AI be trained on our proprietary data?",
    a: "Absolutely. We use vector databases to embed your documents, ensuring your data never leaves your infrastructure and is never used to train public models.",
  },
  {
    q: "What languages are supported?",
    a: "Our models support 50+ languages out of the box. We can also fine-tune for specific dialects or industry-specific terminology.",
  },
  {
    q: "What happens when the AI can't handle a query?",
    a: "The bot intelligently detects when human intervention is needed and seamlessly transfers the conversation with full context to your team.",
  },
];

function FAQItem({ item, idx }: { item: { q: string; a: string }; idx: number }) {
  const [open, setOpen] = useState(false);
  const { ref, v } = useReveal(0.2);
  return (
    <div ref={ref} className="card" style={{ ...fade(v, idx * 0.08), overflow: "hidden" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{ width: "100%", padding: "20px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, textAlign: "left", background: "transparent", border: "none", cursor: "pointer" }}
      >
        <span style={{ fontFamily: "Poppins,sans-serif", fontSize: 15, fontWeight: 600, color: "var(--text-primary)" }}>{item.q}</span>
        <span style={{ 
          width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", 
          background: open ? "var(--accent-dim)" : "var(--bg-subtle)", 
          borderRadius: 6, color: "var(--accent)", fontSize: 18, flexShrink: 0, transition: "background 200ms" 
        }}>
          {open ? "−" : "+"}
        </span>
      </button>
      {open && (
        <div style={{ padding: "0 24px 20px" }}>
          <p style={{ fontFamily: "Inter,sans-serif", fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.7 }}>{item.a}</p>
        </div>
      )}
    </div>
  );
}

function Hero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { const t = setTimeout(() => setLoaded(true), 60); return () => clearTimeout(t); }, []);

  return (
    <section style={{ background: "var(--gradient-hero)", position: "relative", overflow: "hidden", padding: "100px 0" }} className="hero-noise">
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }} className="dot-grid" />
      <div className="orb" style={{ position: "absolute", top: "-15%", right: "-8%", width: 500, height: 500, background: "radial-gradient(circle, rgba(139,92,246,0.15), transparent 70%)", animationDuration: "10s" }} />
      <div className="orb" style={{ position: "absolute", bottom: "-15%", left: "-8%", width: 400, height: 400, background: "radial-gradient(circle, rgba(59,130,246,0.1), transparent 70%)", animationDuration: "12s", animationDelay: "-4s" }} />

      <div className="site-container" style={{ position: "relative", zIndex: 1 }}>
        <div style={{ ...fade(loaded, 0), maxWidth: 680 }}>
          <span className="label-tag">AI Automation</span>
          <h1 style={{ fontFamily: "Poppins,sans-serif", fontSize: "clamp(36px,4.5vw,56px)", fontWeight: 800, color: "var(--text-primary)", letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 20 }}>
            Intelligent AI That<br />
            <span style={{ background: "linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Works 24/7
            </span>
          </h1>
          <p style={{ fontFamily: "Inter,sans-serif", fontSize: 17, color: "var(--text-secondary)", lineHeight: 1.75, marginBottom: 32, maxWidth: 520 }}>
            From voice agents that handle calls to chatbots that qualify leads — we build AI systems that scale with your business and never sleep.
          </p>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <Link href="/contact" className="btn-primary" style={{ fontSize: 15, padding: "14px 28px" }}>
              Build Your AI
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
            <Link href="#solutions" className="btn-secondary" style={{ fontSize: 15, padding: "14px 28px" }}>
              See Solutions
            </Link>
          </div>
        </div>

        <div style={{ ...fade(loaded, 0.25), display: "flex", gap: 40, marginTop: 56, flexWrap: "wrap" }}>
          {[{ val: "50M+", label: "Conversations" }, { val: "98%", label: "Accuracy Rate" }, { val: "24/7", label: "Active Time" }].map(s => (
            <div key={s.label}>
              <div style={{ fontFamily: "Poppins,sans-serif", fontSize: 28, fontWeight: 800, color: "#8b5cf6", letterSpacing: "-0.03em" }}>{s.val}</div>
              <div style={{ fontFamily: "Inter,sans-serif", fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Benefits() {
  const { ref, v } = useReveal();
  return (
    <section ref={ref} style={{ background: "var(--bg-surface)", padding: "80px 0" }}>
      <div className="site-container">
        <div style={{ ...fade(v, 0), textAlign: "center", marginBottom: 48 }}>
          <span className="label-tag">Why AI</span>
          <h2 style={{ fontFamily: "Poppins,sans-serif", fontSize: "clamp(24px,3vw,38px)", fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.02em", marginBottom: 12 }}>
            Transform Your Business
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 20 }}>
          {benefits.map((b, i) => (
            <div key={b.title} className="card" style={{ ...fade(v, i * 0.08), padding: 28, textAlign: "center" }}>
              <div style={{ width: 56, height: 56, borderRadius: 12, background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.2)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 18px", color: "#8b5cf6" }}>
                {b.icon}
              </div>
              <h3 style={{ fontFamily: "Poppins,sans-serif", fontSize: 16, fontWeight: 600, color: "var(--text-primary)", marginBottom: 8 }}>{b.title}</h3>
              <p style={{ fontFamily: "Inter,sans-serif", fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6 }}>{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SolutionDetail({ solution, idx }: { solution: typeof solutions[0]; idx: number }) {
  const { ref, v } = useReveal(0.2);
  const isEven = idx % 2 === 1;
  
  return (
    <section 
      id={solution.id}
      ref={ref}
      style={{ ...fade(v, 0), background: idx % 2 === 0 ? "var(--bg)" : "var(--bg-surface)", padding: "96px 0" }}
    >
      <div className="site-container">
        <div style={{ display: "grid", gridTemplateColumns: isEven ? "1fr 380px" : "380px 1fr", gap: 60, alignItems: "start" }}>
          
          {isEven && (
            <div style={{ position: "relative" }}>
              <div className="card" style={{ overflow: "hidden", padding: 0 }}>
                <img 
                  src={`/${solution.img}`}
                  alt={solution.title}
                  style={{ width: "100%", height: "auto", display: "block" }}
                />
              </div>
            </div>
          )}

          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <span style={{ color: "#8b5cf6", fontSize: 24 }}>{solution.icon}</span>
              <span className="label-tag" style={{ marginBottom: 0 }}>{solution.title}</span>
            </div>
            <h2 style={{ fontFamily: "Poppins,sans-serif", fontSize: "clamp(26px,3vw,38px)", fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.02em", marginBottom: 16 }}>
              {solution.headline}
            </h2>
            <p style={{ fontFamily: "Inter,sans-serif", fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: 24 }}>
              {solution.desc}
            </p>

            {solution.features && (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16, marginBottom: 24 }}>
                {solution.features.map((f, i) => (
                  <div key={f.title} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <div style={{ width: 36, height: 36, borderRadius: 8, background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "#8b5cf6" }}>
                      {f.icon}
                    </div>
                    <div>
                      <div style={{ fontFamily: "Poppins,sans-serif", fontSize: 13, fontWeight: 600, color: "var(--text-primary)", marginBottom: 4 }}>{f.title}</div>
                      <div style={{ fontFamily: "Inter,sans-serif", fontSize: 12, color: "var(--text-muted)", lineHeight: 1.5 }}>{f.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {solution.showcases && (
              <div style={{ marginBottom: 24 }}>
                {solution.showcases.map((showcase, sIdx) => (
                  <div 
                    key={showcase.title}
                    className="card"
                    style={{ padding: 20, marginBottom: sIdx < solution.showcases!.length - 1 ? 12 : 0 }}
                  >
                    <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                      <div style={{ flex: 1 }}>
                        <h4 style={{ fontFamily: "Poppins,sans-serif", fontSize: 15, fontWeight: 600, color: "var(--text-primary)", marginBottom: 6 }}>{showcase.title}</h4>
                        <p style={{ fontFamily: "Inter,sans-serif", fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6 }}>{showcase.desc}</p>
                      </div>
                      <div style={{ width: 80, height: 60, borderRadius: 6, overflow: "hidden", flexShrink: 0, border: "1px solid var(--border)" }}>
                        <img src={`/${showcase.img}`} alt={showcase.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {solution.tags.map((tag) => (
                <span key={tag} className="tech-chip">{tag}</span>
              ))}
            </div>
          </div>

          {!isEven && (
            <div style={{ position: "relative" }}>
              <div className="card" style={{ overflow: "hidden", padding: 0 }}>
                <img 
                  src={`/${solution.img}`}
                  alt={solution.title}
                  style={{ width: "100%", height: "auto", display: "block" }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function Process() {
  const { ref, v } = useReveal();
  const steps = [
    { num: "01", title: "Discovery", desc: "We analyze your use case, data sources, and business goals." },
    { num: "02", title: "Design", desc: "We architect the solution and define conversation flows." },
    { num: "03", title: "Build", desc: "We train custom models and integrate with your systems." },
    { num: "04", title: "Launch", desc: "We deploy, monitor, and continuously optimize performance." },
  ];
  
  return (
    <section ref={ref} style={{ background: "var(--bg)", padding: "96px 0" }}>
      <div className="site-container">
        <div style={{ ...fade(v, 0), marginBottom: 48 }}>
          <span className="label-tag">How We Work</span>
          <h2 style={{ fontFamily: "Poppins,sans-serif", fontSize: "clamp(24px,3vw,38px)", fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
            From Concept to Deployment
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 20, position: "relative" }}>
          {steps.map((s, i) => (
            <div key={s.num} style={{ ...fade(v, i * 0.08), textAlign: "center", position: "relative", zIndex: 1 }}>
              <div style={{ width: 64, height: 64, borderRadius: "50%", background: "var(--bg-card)", border: "2px solid #8b5cf6", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", boxShadow: "0 0 30px rgba(139,92,246,0.2)" }}>
                <span style={{ fontFamily: "Poppins,sans-serif", fontSize: 18, fontWeight: 700, color: "#8b5cf6" }}>{s.num}</span>
              </div>
              <h4 style={{ fontFamily: "Poppins,sans-serif", fontSize: 16, fontWeight: 600, color: "var(--text-primary)", marginBottom: 8 }}>{s.title}</h4>
              <p style={{ fontFamily: "Inter,sans-serif", fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const { ref, v } = useReveal();
  return (
    <section ref={ref} style={{ background: "var(--bg-surface)", padding: "96px 0" }}>
      <div className="site-container">
        <div style={{ ...fade(v, 0), textAlign: "center", marginBottom: 48 }}>
          <span className="label-tag">FAQ</span>
          <h2 style={{ fontFamily: "Poppins,sans-serif", fontSize: "clamp(24px,3vw,38px)", fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
            Common Questions
          </h2>
        </div>
        <div style={{ maxWidth: 680, margin: "0 auto", display: "flex", flexDirection: "column", gap: 12 }}>
          {faq.map((item, idx) => (
            <FAQItem key={item.q} item={item} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  const { ref, v } = useReveal();
  return (
    <section ref={ref} style={{ background: "linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)", padding: "100px 0", position: "relative", overflow: "hidden" }}>
      <div className="orb" style={{ position: "absolute", top: "-30%", right: "-10%", width: 500, height: 500, background: "radial-gradient(circle, rgba(255,255,255,0.08), transparent 70%)" }} />
      <div className="site-container" style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
        <div style={fade(v, 0)}>
          <h2 style={{ fontFamily: "Poppins,sans-serif", fontSize: "clamp(26px,4vw,44px)", fontWeight: 800, color: "#fff", letterSpacing: "-0.03em", marginBottom: 16 }}>
            Ready to build your AI?
          </h2>
          <p style={{ fontFamily: "Inter,sans-serif", fontSize: 16, color: "rgba(255,255,255,0.75)", lineHeight: 1.7, marginBottom: 36, maxWidth: 480, margin: "0 auto 36px" }}>
            Contact us to see how AI can transform your business.
          </p>
          <Link href="/contact" className="btn-primary" style={{ background: "#fff", color: "#7c3aed", fontSize: 15, padding: "16px 32px" }}>
            Contact Us →
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function AIChatbotsPage() {
  return (
    <div>
      <Hero />
      <Benefits />
      {solutions.map((solution, idx) => (
        <SolutionDetail key={solution.id} solution={solution} idx={idx} />
      ))}
      <Process />
      <FAQ />
      <CTA />
    </div>
  );
}