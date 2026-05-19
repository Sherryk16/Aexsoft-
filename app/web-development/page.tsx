"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { 
  Zap, Globe, Shield, Code, Database, Server, Cloud, 
  PenTool, Target, Paintbrush, Rocket, CheckCircle2, 
  Layout, Smartphone, Search, FileText, ArrowRight
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
  { icon: <Paintbrush size={22} />, title: "Premium UI/UX", desc: "Award-winning interfaces optimized for conversion and user engagement." },
  { icon: <Zap size={22} />, title: "Extreme Performance", desc: "Server-side rendering achieving 95+ Lighthouse scores by default." },
  { icon: <Shield size={22} />, title: "Enterprise Security", desc: "Bank-grade data protection, secure auth, and automated backups." },
  { icon: <Target size={22} />, title: "Headless Architecture", desc: "Decoupled frontends for infinite scale and uncompromised speed." },
  { icon: <Search size={22} />, title: "SEO Optimized", desc: "Built-in SEO best practices with structured data and meta tags." },
  { icon: <Smartphone size={22} />, title: "Mobile-First", desc: "Responsive designs that work perfectly on all devices." },
];

const techStack = [
  { label: "Next.js", desc: "App Router, Server Components" },
  { label: "React", desc: "19 with hooks & context" },
  { label: "TypeScript", desc: "Full type safety" },
  { label: "Tailwind CSS", desc: "Utility-first styling" },
  { label: "Node.js", desc: "Express & REST APIs" },
  { label: "PostgreSQL", desc: "Relational databases" },
];

const process = [
  { num: "01", title: "Discovery", desc: "We analyze your requirements, user needs, and business goals." },
  { num: "02", title: "Design", desc: "Wireframes, UI mockups, and interactive prototypes." },
  { num: "03", title: "Development", desc: "Agile sprints with continuous integration and testing." },
  { num: "04", title: "Launch", desc: "Deployment, performance optimization, and post-launch support." },
];

const faq = [
  { q: "How long does a typical web project take?", a: "Standard business websites take 4-8 weeks. Complex web applications range from 12-24 weeks depending on features and integrations." },
  { q: "Do you provide post-launch support?", a: "Yes! We offer monthly maintenance packages including security updates, bug fixes, and feature additions." },
  { q: "Can you work with our existing codebase?", a: "Absolutely. We have experience integrating with legacy systems and can improve existing codebases." },
];

function Hero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { const t = setTimeout(() => setLoaded(true), 60); return () => clearTimeout(t); }, []);

  return (
    <section style={{ background: "var(--gradient-hero)", position: "relative", overflow: "hidden", padding: "100px 0" }} className="hero-noise">
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }} className="dot-grid" />
      <div className="orb" style={{ position: "absolute", top: "-15%", right: "-8%", width: 500, height: 500, background: "radial-gradient(circle, rgba(59,130,246,0.15)", animationDuration: "10s" }} />
      <div className="orb" style={{ position: "absolute", bottom: "-15%", left: "-8%", width: 400, height: 400, background: "radial-gradient(circle, rgba(96,165,250,0.1)", animationDuration: "12s", animationDelay: "-4s" }} />

      <div className="site-container" style={{ position: "relative", zIndex: 1 }}>
        <div style={{ ...fade(loaded, 0), maxWidth: 680 }}>
          <span className="label-tag" style={{ color: "#3b82f6" }}>Web Development</span>
          <h1 style={{ fontFamily: "Poppins,sans-serif", fontSize: "clamp(36px,4.5vw,56px)", fontWeight: 800, color: "var(--text-primary)", letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 20 }}>
            High-Performance<br />
            <span style={{ background: "linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Digital Platforms
            </span>
          </h1>
          <p style={{ fontFamily: "Inter,sans-serif", fontSize: 17, color: "var(--text-secondary)", lineHeight: 1.75, marginBottom: 32, maxWidth: 520 }}>
            We engineer pixel-perfect, scalable web applications using modern frameworks like React and Next.js. Blazing-fast, secure, and SEO-optimized platforms that drive real business results.
          </p>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <Link href="/contact" className="btn-primary" style={{ fontSize: 15, padding: "14px 28px" }}>
              Start Your Project
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
            <Link href="#features" className="btn-secondary" style={{ fontSize: 15, padding: "14px 28px" }}>
              Learn More
            </Link>
          </div>
        </div>

        <div style={{ ...fade(loaded, 0.25), display: "flex", gap: 40, marginTop: 56, flexWrap: "wrap" }}>
          {[{ val: "95+", label: "Lighthouse Score" }, { val: "100+", label: "Projects Delivered" }, { val: "24/7", label: "Support" }].map(s => (
            <div key={s.label}>
              <div style={{ fontFamily: "Poppins,sans-serif", fontSize: 28, fontWeight: 800, color: "#3b82f6", letterSpacing: "-0.03em" }}>{s.val}</div>
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
            What Sets Us Apart
          </h2>
          <p style={{ fontFamily: "Inter,sans-serif", fontSize: 15, color: "var(--text-secondary)", maxWidth: 500, margin: "0 auto" }}>
            We don't just write code — we build digital experiences that convert.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: 24 }}>
          {features.map((f, i) => (
            <div key={f.title} className="card" style={{ ...fade(v, i * 0.08), padding: 28 }}>
              <div style={{ width: 52, height: 52, borderRadius: 12, background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.2)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20, color: "#3b82f6" }}>
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
    <section ref={ref} style={{ background: "var(--gradient-web)", padding: "96px 0", position: "relative", overflow: "hidden" }}>
      <div className="orb" style={{ position: "absolute", top: "-20%", right: "-10%", width: 400, height: 400, background: "radial-gradient(circle, rgba(14,165,233,0.15)", }} />
      <div className="site-container" style={{ position: "relative", zIndex: 1 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
          <div style={fade(v, 0)}>
            <span className="label-tag" style={{ color: "#0ea5e9" }}>Technologies</span>
            <h2 style={{ fontFamily: "Poppins,sans-serif", fontSize: "clamp(26px,3vw,40px)", fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.02em", marginBottom: 16 }}>
              Built with Modern<br /><span style={{ color: "#0ea5e9" }}>Industry Standards</span>
            </h2>
            <p style={{ fontFamily: "Inter,sans-serif", fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: 24 }}>
              We use the latest technologies to ensure your web application is fast, secure, and maintainable. Every project follows best practices and clean code principles.
            </p>
            <Link href="/contact" className="btn-primary" style={{ background: "#0ea5e9", fontSize: 14, padding: "12px 24px" }}>
              Discuss Your Project →
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

function Process() {
  const { ref, v } = useReveal(0.1);
  return (
    <section ref={ref} style={{ background: "var(--bg)", padding: "96px 0" }}>
      <div className="site-container">
        <div style={{ ...fade(v, 0), textAlign: "center", marginBottom: 56 }}>
          <span className="label-tag">How We Work</span>
          <h2 style={{ fontFamily: "Poppins,sans-serif", fontSize: "clamp(24px,3vw,38px)", fontWeight: 700, color: "var(--text-primary)" }}>Our Development Process</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 24 }}>
          {process.map((p, i) => (
            <div key={p.num} style={{ ...fade(v, i * 0.08), textAlign: "center" }}>
              <div style={{ width: 64, height: 64, borderRadius: "50%", background: "var(--bg-card)", border: "2px solid #3b82f6", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", boxShadow: "0 0 30px rgba(59,130,246,0.2)" }}>
                <span style={{ fontFamily: "Poppins,sans-serif", fontSize: 18, fontWeight: 700, color: "#3b82f6" }}>{p.num}</span>
              </div>
              <h4 style={{ fontFamily: "Poppins,sans-serif", fontSize: 16, fontWeight: 600, color: "var(--text-primary)", marginBottom: 8 }}>{p.title}</h4>
              <p style={{ fontFamily: "Inter,sans-serif", fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6 }}>{p.desc}</p>
            </div>
          ))}
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
      <div className="orb" style={{ position: "absolute", top: "-30%", right: "-10%", width: 500, height: 500, background: "radial-gradient(circle, rgba(255,255,255,0.08)", }} />
      <div className="site-container" style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
        <div style={fade(v, 0)}>
          <h2 style={{ fontFamily: "Poppins,sans-serif", fontSize: "clamp(26px,4vw,44px)", fontWeight: 800, color: "#fff", letterSpacing: "-0.03em", marginBottom: 16 }}>
            Ready to Build Your Web App?
          </h2>
          <p style={{ fontFamily: "Inter,sans-serif", fontSize: 16, color: "rgba(255,255,255,0.75)", lineHeight: 1.7, marginBottom: 36, maxWidth: 480, margin: "0 auto 36px" }}>
            Let's discuss your project and create something amazing together.
          </p>
          <Link href="/contact" className="btn-primary" style={{ background: "#fff", color: "var(--accent-dark)", fontSize: 15, padding: "16px 32px" }}>
            Get a Quote →
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function WebDevPage() {
  return (
    <div>
      <Hero />
      <Features />
      <TechSection />
      <Process />
      <FAQ />
      <CTA />
    </div>
  );
}