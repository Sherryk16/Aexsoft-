"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { 
  Zap, Globe, Shield, Code, Database, Server, Cloud, 
  PenTool, Target, Paintbrush, Rocket, CheckCircle2, 
  Layout, Smartphone, BarChart3, Users, Lock, ArrowRight,
  TrendingUp, Workflow, Globe2, Cpu
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

const features = [
  { icon: <Users size={22} />, title: "Multi-Tenant Architecture", desc: "Secure data isolation per customer with customizable tenant configurations." },
  { icon: <BarChart3 size={22} />, title: "Analytics Dashboards", desc: "Real-time business insights with interactive charts and reports." },
  { icon: <Code size={22} />, title: "API-First Design", desc: "RESTful APIs and webhooks for seamless third-party integrations." },
  { icon: <Lock size={22} />, title: "Enterprise Security", desc: "SOC2 & GDPR compliant with role-based access control." },
  { icon: <Zap size={22} />, title: "High Performance", desc: "Optimized database queries and caching for sub-second response times." },
  { icon: <Cloud size={22} />, title: "Cloud Native", desc: "Deployed on AWS/Vercel with auto-scaling and 99.9% uptime." },
];

const techStack = [
  { label: "Next.js", desc: "Full-stack framework" },
  { label: "Supabase", desc: "Backend & Auth" },
  { label: "Stripe", desc: "Payments" },
  { label: "PostgreSQL", desc: "Database" },
  { label: "AWS", desc: "Infrastructure" },
  { label: "Prisma", desc: "ORM" },
];

const faq = [
  { q: "How long does SaaS development take?", a: "MVP development typically takes 8-16 weeks. Full-featured SaaS products range from 16-32 weeks depending on complexity." },
  { q: "Can you help with subscription billing?", a: "Yes! We integrate Stripe for flexible billing models including subscriptions, usage-based pricing, and one-time payments." },
  { q: "Do you provide onboarding for our customers?", a: "We can build custom onboarding flows, demo environments, and in-app guidance to improve user adoption." },
];

function Hero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { const t = setTimeout(() => setLoaded(true), 60); return () => clearTimeout(t); }, []);

  return (
    <section style={{ background: "var(--gradient-hero)", position: "relative", overflow: "hidden", padding: "100px 0" }} className="hero-noise">
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }} className="dot-grid" />
      <div className="orb" style={{ position: "absolute", top: "-15%", right: "-8%", width: 500, height: 500, background: "radial-gradient(circle, rgba(34,197,94,0.15)", animationDuration: "10s" }} />
      <div className="orb" style={{ position: "absolute", bottom: "-15%", left: "-8%", width: 400, height: 400, background: "radial-gradient(circle, rgba(16,185,129,0.1)", animationDuration: "12s", animationDelay: "-4s" }} />

      <div className="site-container" style={{ position: "relative", zIndex: 1 }}>
        <div style={{ ...fade(loaded, 0), maxWidth: 680 }}>
          <span className="label-tag" style={{ color: "#22c55e" }}>SaaS Development</span>
          <h1 style={{ fontFamily: "Poppins,sans-serif", fontSize: "clamp(36px,4.5vw,56px)", fontWeight: 800, color: "var(--text-primary)", letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 20 }}>
            Build Scalable<br />
            <span style={{ background: "linear-gradient(135deg, #22c55e 0%, #4ade80 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Cloud Products
            </span>
          </h1>
          <p style={{ fontFamily: "Inter,sans-serif", fontSize: 17, color: "var(--text-secondary)", lineHeight: 1.75, marginBottom: 32, maxWidth: 520 }}>
            We build multi-tenant architectures designed to scale from 100 to 1,000,000 users. Secure, high-available, and seamless third-party integrations built from day one.
          </p>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <Link href="/contact" className="btn-primary" style={{ fontSize: 15, padding: "14px 28px" }}>
              Start Your SaaS
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
            <Link href="#features" className="btn-secondary" style={{ fontSize: 15, padding: "14px 28px" }}>
              Learn More
            </Link>
          </div>
        </div>

        <div style={{ ...fade(loaded, 0.25), display: "flex", gap: 40, marginTop: 56, flexWrap: "wrap" }}>
          {[{ val: "1M+", label: "Users Supported" }, { val: "99.9%", label: "Uptime SLA" }, { val: "50+", label: "SaaS Launched" }].map(s => (
            <div key={s.label}>
              <div style={{ fontFamily: "Poppins,sans-serif", fontSize: 28, fontWeight: 800, color: "#22c55e", letterSpacing: "-0.03em" }}>{s.val}</div>
              <div style={{ fontFamily: "Inter,sans-serif", fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Features() {
  const { ref, v } = useReveal(0.1);
  return (
    <section id="features" ref={ref} style={{ background: "var(--bg)", padding: "96px 0" }}>
      <div className="site-container">
        <div style={{ ...fade(v, 0), textAlign: "center", marginBottom: 56 }}>
          <span className="label-tag">Why Choose Us</span>
          <h2 style={{ fontFamily: "Poppins,sans-serif", fontSize: "clamp(24px,3vw,38px)", fontWeight: 700, color: "var(--text-primary)", marginBottom: 12 }}>
            Enterprise-Grade SaaS Architecture
          </h2>
          <p style={{ fontFamily: "Inter,sans-serif", fontSize: 15, color: "var(--text-secondary)", maxWidth: 500, margin: "0 auto" }}>
            Built to scale. Every decision is made with your growth in mind.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: 24 }}>
          {features.map((f, i) => (
            <div key={f.title} className="card" style={{ ...fade(v, i * 0.08), padding: 28 }}>
              <div style={{ width: 52, height: 52, borderRadius: 12, background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20, color: "#22c55e" }}>
                {f.icon}
              </div>
              <h3 style={{ fontFamily: "Poppins,sans-serif", fontSize: 18, fontWeight: 600, color: "var(--text-primary)", marginBottom: 10 }}>{f.title}</h3>
              <p style={{ fontFamily: "Inter,sans-serif", fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.7 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TechSection() {
  const { ref, v } = useReveal(0.15);
  return (
    <section ref={ref} style={{ background: "var(--gradient-saas)", padding: "96px 0", position: "relative", overflow: "hidden" }}>
      <div className="orb" style={{ position: "absolute", top: "-20%", right: "-10%", width: 400, height: 400, background: "radial-gradient(circle, rgba(34,197,94,0.15)" }} />
      <div className="site-container" style={{ position: "relative", zIndex: 1 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
          <div style={fade(v, 0)}>
            <span className="label-tag" style={{ color: "#22c55e" }}>Tech Stack</span>
            <h2 style={{ fontFamily: "Poppins,sans-serif", fontSize: "clamp(26px,3vw,40px)", fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.02em", marginBottom: 16 }}>
              Built for<br /><span style={{ color: "#22c55e" }}>Scalability & Reliability</span>
            </h2>
            <p style={{ fontFamily: "Inter,sans-serif", fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: 24 }}>
              We use battle-tested technologies that handle millions of requests. Every component is chosen for reliability and ease of scaling.
            </p>
            <Link href="/contact" className="btn-primary" style={{ background: "#22c55e", fontSize: 14, padding: "12px 24px" }}>
              Build Your SaaS →
            </Link>
          </div>
          <div style={fade(v, 0.1)}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
              {techStack.map((t, i) => (
                <div key={t.label} className="card" style={{ padding: 20 }}>
                  <div style={{ fontFamily: "Poppins,sans-serif", fontSize: 16, fontWeight: 700, color: "var(--text-primary)", marginBottom: 4 }}>{t.label}</div>
                  <div style={{ fontFamily: "Inter,sans-serif", fontSize: 12, color: "var(--text-muted)" }}>{t.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const { ref, v } = useReveal(0.1);
  const [open, setOpen] = useState<number | null>(null);
  
  return (
    <section ref={ref} style={{ background: "var(--bg-surface)", padding: "96px 0" }}>
      <div className="site-container">
        <div style={{ ...fade(v, 0), textAlign: "center", marginBottom: 48 }}>
          <span className="label-tag">FAQ</span>
          <h2 style={{ fontFamily: "Poppins,sans-serif", fontSize: "clamp(24px,3vw,38px)", fontWeight: 700, color: "var(--text-primary)" }}>Common Questions</h2>
        </div>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          {faq.map((item, i) => (
            <div key={i} className="card" style={{ marginBottom: 12, overflow: "hidden" }}>
              <button onClick={() => setOpen(open === i ? null : i)} style={{ width: "100%", padding: "20px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "transparent", border: "none", cursor: "pointer" }}>
                <span style={{ fontFamily: "Poppins,sans-serif", fontSize: 15, fontWeight: 600, color: "var(--text-primary)", textAlign: "left" }}>{item.q}</span>
                <span style={{ fontSize: 20, color: "var(--accent)" }}>{open === i ? "−" : "+"}</span>
              </button>
              {open === i && (
                <div style={{ padding: "0 24px 20px" }}>
                  <p style={{ fontFamily: "Inter,sans-serif", fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.7 }}>{item.a}</p>
                </div>
              )}
            </div>
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
      <div className="orb" style={{ position: "absolute", top: "-30%", right: "-10%", width: 500, height: 500, background: "radial-gradient(circle, rgba(255,255,255,0.08)" }} />
      <div className="site-container" style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
        <div style={fade(v, 0)}>
          <h2 style={{ fontFamily: "Poppins,sans-serif", fontSize: "clamp(26px,4vw,44px)", fontWeight: 800, color: "#fff", letterSpacing: "-0.03em", marginBottom: 16 }}>
            Ready to Build Your SaaS?
          </h2>
          <p style={{ fontFamily: "Inter,sans-serif", fontSize: 16, color: "rgba(255,255,255,0.75)", lineHeight: 1.7, marginBottom: 36, maxWidth: 480, margin: "0 auto 36px" }}>
            Let's create a product that scales with your business.
          </p>
          <Link href="/contact" className="btn-primary" style={{ background: "#fff", color: "var(--accent-dark)", fontSize: 15, padding: "16px 32px" }}>
            Get Started →
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function SaaSPage() {
  return (
    <div>
      <Hero />
      <Features />
      <TechSection />
      <FAQ />
      <CTA />
    </div>
  );
}