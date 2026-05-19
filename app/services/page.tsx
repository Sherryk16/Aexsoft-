"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { 
  Zap, Bot, Shield, Coins, Brain, TrendingUp, MessageSquare, Package, Search, Smartphone, 
  Paintbrush, Target, ShoppingCart, Globe, Rocket, CheckCircle2,
  Phone, Headphones, Workflow, Mic, BarChart3, Users, Globe2, Code2
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

const services = [
  {
    id: "web-development",
    icon: <Globe size={28} />,
    title: "Full-Stack Web Development",
    headline: "High-Performance Digital Platforms",
    desc: "We engineer pixel-perfect, scalable web applications using modern frameworks like React and Next.js. Blazing-fast, secure, and SEO-optimized platforms that drive conversions.",
    features: [
      { icon: <Paintbrush size={20} />, title: "Premium Engineering", desc: "Conversion-optimized interfaces." },
      { icon: <Zap size={20} />, title: "Extreme Performance", desc: "95+ Lighthouse scores." },
      { icon: <Shield size={20} />, title: "Enterprise Security", desc: "Bank-grade data protection." },
      { icon: <Target size={20} />, title: "Headless Architecture", desc: "Infinite scale & speed." },
    ],
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js"],
    img: "fullstack/main.png",
    gradient: "var(--gradient-web)",
    accent: "#0ea5e9",
    link: null,
  },
  {
    id: "ai-automation",
    icon: <Bot size={28} />,
    title: "AI Automations & Chatbots",
    headline: "Intelligent Systems That Work 24/7",
    desc: "Transform your business with AI-powered automation. From voice agents that handle phone calls to intelligent chatbots that qualify leads — we build systems that never sleep, never miss a lead, and continuously improve.",
    features: [
      { icon: <Phone size={20} />, title: "Voice AI Agents", desc: "Autonomous voice agents handle calls with natural cadence." },
      { icon: <MessageSquare size={20} />, title: "Omnichannel Bots", desc: "Deploy across WhatsApp, Instagram & website." },
      { icon: <Brain size={20} />, title: "Custom LLM Solutions", desc: "Train on your data for domain-specific AI." },
      { icon: <Zap size={20} />, title: "Workflow Automation", desc: "Connect AI to your tools seamlessly." },
    ],
    tags: ["OpenAI", "LangChain", "Python", "Vector DB", "WhatsApp API", "Twilio"],
    img: "aichatbotpng.png",
    gradient: "var(--gradient-ai)",
    accent: "#8b5cf6",
    link: "/aichatbots",
  },
  {
    id: "saas",
    icon: <Zap size={28} />,
    title: "SaaS Development",
    headline: "Build Scalable Cloud Products",
    desc: "Multi-tenant architectures designed to scale from 100 to 1,000,000 users. Priority on security, high availability, and seamless third-party integrations.",
    features: [
      { icon: <Users size={20} />, title: "Multi-Tenant", desc: "Secure data isolation per customer." },
      { icon: <BarChart3 size={20} />, title: "Analytics Dashboards", desc: "Real-time business insights." },
      { icon: <Code2 size={20} />, title: "API-First", desc: "Seamless third-party integrations." },
      { icon: <Shield size={20} />, title: "Enterprise Ready", desc: "SOC2 & GDPR compliance." },
    ],
    tags: ["Next.js", "Supabase", "Stripe", "PostgreSQL", "AWS"],
    img: "saas.png",
    gradient: "var(--gradient-saas)",
    accent: "#22c55e",
    link: null,
  },
  {
    id: "ecommerce",
    icon: <ShoppingCart size={28} />,
    title: "E-commerce Solutions",
    headline: "Stores That Convert & Scale",
    desc: "From boutique stores to global brands — we build high-converting web experiences. Custom themes, headless commerce, and bespoke checkout flows tailored to your brand.",
    features: [
      { icon: <Package size={20} />, title: "Inventory Engine", desc: "Real-time stock tracking." },
      { icon: <Search size={20} />, title: "SEO-Optimized", desc: "Schema markup for Google Shopping." },
      { icon: <Coins size={20} />, title: "Payment Integration", desc: "Stripe, PayPal & Apple Pay." },
      { icon: <Smartphone size={20} />, title: "Mobile-First", desc: "Lightning-fast checkout." },
    ],
    tags: ["Next.js", "Shopify Plus", "Stripe", "Vercel", "GraphQL"],
    img: "ecommerce/ecommerce.png",
    gradient: "var(--gradient-ecom)",
    accent: "#eab308",
    link: null,
  },
];

const faq = [
  {
    q: "What is your typical project timeline?",
    a: "For standard business websites, we typically deliver in 4–6 weeks. SaaS and complex AI integrations usually range from 12–24 weeks depending on technical complexity.",
  },
  {
    q: "How do you handle post-launch maintenance?",
    a: "We offer several maintenance tiers from basic security updates to dedicated monthly development hours. Every project includes a 30-day bug-free guarantee.",
  },
  {
    q: "Do you offer fixed-price or hourly billing?",
    a: "We primarily work on fixed-project basis for well-defined scopes. For ongoing R&D or undefined work, we offer flexible retainer models.",
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
      <div className="orb" style={{ position: "absolute", top: "-15%", right: "-8%", width: 500, height: 500, background: "radial-gradient(circle, rgba(59,130,246,0.15), transparent 70%)", animationDuration: "10s" }} />
      <div className="orb" style={{ position: "absolute", bottom: "-15%", left: "-8%", width: 400, height: 400, background: "radial-gradient(circle, rgba(139,92,246,0.1), transparent 70%)", animationDuration: "12s", animationDelay: "-4s" }} />

      <div className="site-container" style={{ position: "relative", zIndex: 1 }}>
        <div style={{ ...fade(loaded, 0), maxWidth: 680 }}>
          <span className="label-tag">Our Services</span>
          <h1 style={{ fontFamily: "Poppins,sans-serif", fontSize: "clamp(36px,4.5vw,56px)", fontWeight: 800, color: "var(--text-primary)", letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 20 }}>
            Building Digital<br />
            <span style={{ background: "linear-gradient(135deg, var(--accent) 0%, #818cf8 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Solutions That Scale
            </span>
          </h1>
          <p style={{ fontFamily: "Inter,sans-serif", fontSize: 17, color: "var(--text-secondary)", lineHeight: 1.75, marginBottom: 32, maxWidth: 520 }}>
            We bridge the gap between complex business challenges and high-performance engineering. 
            Our services are designed for scalability, security, and technical excellence.
          </p>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <Link href="/contact" className="btn-primary" style={{ fontSize: 15, padding: "14px 28px" }}>
              Start a Project
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
            <Link href="#services" className="btn-secondary" style={{ fontSize: 15, padding: "14px 28px" }}>
              Explore Services
            </Link>
          </div>
        </div>

        <div style={{ ...fade(loaded, 0.25), display: "flex", gap: 40, marginTop: 56, flexWrap: "wrap" }}>
          {[{ val: "2+", label: "Years Excellence" }, { val: "50+", label: "Projects Shipped" }, { val: "100%", label: "Satisfaction Rate" }].map(s => (
            <div key={s.label}>
              <div style={{ fontFamily: "Poppins,sans-serif", fontSize: 28, fontWeight: 800, color: "var(--accent)", letterSpacing: "-0.03em" }}>{s.val}</div>
              <div style={{ fontFamily: "Inter,sans-serif", fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServicesGrid() {
  const { ref, v } = useReveal(0.1);
  return (
    <section id="services" ref={ref} style={{ background: "var(--bg)", padding: "80px 0" }}>
      <div className="site-container">
        <div style={{ marginBottom: 48, opacity: v ? 1 : 0, transform: v ? "translate3d(0,0,0)" : "translate3d(0,10px,0)", transition: "opacity 0.4s ease, transform 0.4s ease" }}>
          <span className="label-tag">What We Do</span>
          <h2 style={{ fontFamily: "Poppins,sans-serif", fontSize: "clamp(24px,3vw,38px)", fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.02em", marginBottom: 12 }}>
            Comprehensive Digital Solutions
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 20 }}>
          {services.map((s, i) => (
            <Link 
              key={s.id} 
              href={`#${s.id}`}
              style={{ textDecoration: "none", color: "inherit", display: "block" }}
            >
              <div className="card" style={{ overflow: "hidden", height: "100%" }}>
                <div style={{ height: 200, overflow: "hidden", position: "relative", background: "var(--bg-surface)" }}>
                  <img 
                    src={`/${s.img}`}
                    alt={s.title} 
                    style={{ 
                      width: "100%", height: "100%", objectFit: "cover", display: "block",
                      transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                      transform: "translate3d(0,0,0)"
                    }}
                    onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.05) translate3d(0,0,0)")}
                    onMouseLeave={e => (e.currentTarget.style.transform = "translate3d(0,0,0)")}
                  />
                  <div style={{ position: "absolute", top: 16, left: 16, background: "var(--bg-card)", borderRadius: 8, width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid var(--border)", color: s.accent }}>
                    {s.icon}
                  </div>
                </div>
                <div style={{ padding: 24 }}>
                  <h3 style={{ fontFamily: "Poppins,sans-serif", fontSize: 17, fontWeight: 700, color: "var(--text-primary)", marginBottom: 10 }}>{s.title}</h3>
                  <p style={{ fontFamily: "Inter,sans-serif", fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: 16, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{s.desc}</p>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {s.tags.slice(0, 3).map(t => <span key={t} className="tech-chip" style={{ fontSize: 10, padding: "3px 8px" }}>{t}</span>)}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceSection({ service, idx }: { service: typeof services[0]; idx: number }) {
  const { ref, v } = useReveal(0.15);
  const isEven = idx % 2 === 1;
  
  return (
    <section 
      id={service.id}
      ref={ref}
      style={{ ...fade(v, 0), background: service.gradient, padding: "96px 0", position: "relative", overflow: "hidden" }}
    >
      <div className="orb" style={{ position: "absolute", top: "-20%", right: isEven ? "-10%" : "auto", left: isEven ? "auto" : "-10%", width: 400, height: 400, background: `radial-gradient(circle, ${service.accent}22, transparent 70%)` }} />
      <div className="orb" style={{ position: "absolute", bottom: "-20%", left: isEven ? "30%" : "auto", right: isEven ? "auto" : "30%", width: 300, height: 300, background: `radial-gradient(circle, ${service.accent}15, transparent 70%)` }} />
      
      <div className="site-container" style={{ position: "relative", zIndex: 1 }}>
        <div style={{ display: "grid", gridTemplateColumns: isEven ? "1fr 400px" : "400px 1fr", gap: 60, alignItems: "center" }}>
          
          {isEven && (
            <div style={fade(v, 0.1)}>
              <div style={{ borderRadius: 16, overflow: "hidden", boxShadow: `0 25px 50px ${service.accent}25` }}>
                <img 
                  src={`/${service.img}`}
                  alt={service.title}
                  style={{ width: "100%", height: "auto", display: "block" }}
                />
              </div>
            </div>
          )}

          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <span style={{ color: service.accent, fontSize: 24 }}>{service.icon}</span>
              <span className="label-tag" style={{ marginBottom: 0, color: service.accent }}>{service.title}</span>
            </div>
            <h2 style={{ fontFamily: "Poppins,sans-serif", fontSize: "clamp(26px,3vw,38px)", fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.02em", marginBottom: 16 }}>
              {service.headline}
            </h2>
            <p style={{ fontFamily: "Inter,sans-serif", fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: 24 }}>
              {service.desc}
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16, marginBottom: 24 }}>
              {service.features!.map((f, i) => (
                <div key={f.title} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <div style={{ width: 36, height: 36, borderRadius: 8, background: "#fff", border: `1px solid ${service.accent}30`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: service.accent }}>
                    {f.icon}
                  </div>
                  <div>
                    <div style={{ fontFamily: "Poppins,sans-serif", fontSize: 13, fontWeight: 600, color: "var(--text-primary)", marginBottom: 4 }}>{f.title}</div>
                    <div style={{ fontFamily: "Inter,sans-serif", fontSize: 12, color: "var(--text-muted)", lineHeight: 1.5 }}>{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
              {service.tags.map((tag) => (
                <span key={tag} className="tech-chip">{tag}</span>
              ))}
              {service.link && (
                <Link href={service.link} style={{ marginLeft: 8, fontFamily: "Inter,sans-serif", fontSize: 13, fontWeight: 600, color: service.accent, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 4 }}>
                  Learn More →
                </Link>
              )}
            </div>
          </div>

          {!isEven && (
            <div style={fade(v, 0.1)}>
              <div style={{ borderRadius: 16, overflow: "hidden", boxShadow: `0 25px 50px ${service.accent}25` }}>
                <img 
                  src={`/${service.img}`}
                  alt={service.title}
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

function FAQ() {
  const { ref, v } = useReveal();
  return (
    <section ref={ref} style={{ background: "var(--bg-surface)", padding: "96px 0" }}>
      <div className="site-container">
        <div style={{ ...fade(v, 0), textAlign: "center", marginBottom: 48 }}>
          <span className="label-tag">FAQ</span>
          <h2 style={{ fontFamily: "Poppins,sans-serif", fontSize: "clamp(24px,3vw,38px)", fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
            Everything you need to know
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
    <section ref={ref} style={{ background: "var(--gradient-cta)", padding: "100px 0", position: "relative", overflow: "hidden" }}>
      <div className="orb" style={{ position: "absolute", top: "-30%", right: "-10%", width: 500, height: 500, background: "radial-gradient(circle, rgba(255,255,255,0.08), transparent 70%)" }} />
      <div className="site-container" style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
        <div style={fade(v, 0)}>
          <h2 style={{ fontFamily: "Poppins,sans-serif", fontSize: "clamp(26px,4vw,44px)", fontWeight: 800, color: "#fff", letterSpacing: "-0.03em", marginBottom: 16 }}>
            Ready to start your project?
          </h2>
          <p style={{ fontFamily: "Inter,sans-serif", fontSize: 16, color: "rgba(255,255,255,0.75)", lineHeight: 1.7, marginBottom: 36, maxWidth: 480, margin: "0 auto 36px" }}>
            Contact us for a free quote and consultation.
          </p>
          <Link href="/contact" className="btn-primary" style={{ background: "#fff", color: "var(--accent-dark)", fontSize: 15, padding: "16px 32px" }}>
            Contact Us →
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function ServicesPage() {
  return (
    <div>
      <Hero />
      <ServicesGrid />
      {services.map((service, idx) => (
        <ServiceSection key={service.id} service={service} idx={idx} />
      ))}
      <FAQ />
      <CTA />
    </div>
  );
}