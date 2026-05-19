"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { 
  Zap, Shield, Rocket, Lightbulb, Users, Target, 
  Globe, Award, Code2, Heart, MessageSquare, ArrowRight
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

const stats = [
  { val: "2+", label: "Years of Excellence" },
  { val: "50+", label: "Projects Delivered" },
  { val: "100%", label: "Client Satisfaction" },
  { val: "24/7", label: "Technical Support" },
];

const values = [
  { 
    icon: <Zap size={24} />, 
    title: "Quality", 
    desc: "Uncompromising standards in code, design, and documentation. Every deliverable meets our internal quality checklist.",
    color: "#f59e0b"
  },
  { 
    icon: <Rocket size={24} />, 
    title: "Speed", 
    desc: "Rapid deployment cycles without sacrificing architectural integrity. We ship meaningful progress every week.",
    color: "#3b82f6"
  },
  { 
    icon: <Lightbulb size={24} />, 
    title: "Innovation", 
    desc: "Leveraging cutting-edge stacks to solve complex business problems. We stay ahead so you don't have to.",
    color: "#8b5cf6"
  },
  { 
    icon: <Heart size={24} />, 
    title: "Client-First", 
    desc: "Transparent communication and radical alignment with your goals. Your success is our metric.",
    color: "#ec4899"
  },
];

const timeline = [
  { year: "2023", title: "The Beginning", desc: "Founded by a team of elite engineers with a vision to bridge complex engineering and elegant design." },
  { year: "2024", title: "Scaling Up", desc: "Expanded to 15+ team members, delivered 30+ projects across multiple industries." },
  { year: "2025", title: "Global Reach", desc: "Serving clients worldwide with a remote-first, globally distributed team." },
];

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
          <span className="label-tag">About Us</span>
          <h1 style={{ fontFamily: "Poppins,sans-serif", fontSize: "clamp(36px,4.5vw,56px)", fontWeight: 800, color: "var(--text-primary)", letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 20 }}>
            Precision-Driven<br />
            <span style={{ background: "linear-gradient(135deg, var(--accent) 0%, #818cf8 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Global Agency
            </span>
          </h1>
          <p style={{ fontFamily: "Inter,sans-serif", fontSize: 17, color: "var(--text-secondary)", lineHeight: 1.75, marginBottom: 32, maxWidth: 520 }}>
            AEXSOFT is a premier digital product agency dedicated to technical excellence. 
            We combine a remote-first mindset with global standards to deliver high-performance software solutions.
          </p>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <Link href="/contact" className="btn-primary" style={{ fontSize: 15, padding: "14px 28px" }}>
              Get in Touch
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
            <Link href="#story" className="btn-secondary" style={{ fontSize: 15, padding: "14px 28px" }}>
              Our Story
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function Story() {
  const { ref, v } = useReveal(0.15);
  return (
    <section id="story" ref={ref} style={{ background: "var(--bg-surface)", padding: "96px 0" }}>
      <div className="site-container">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          <div style={fade(v, 0)}>
            <span className="label-tag">Our Story</span>
            <h2 style={{ fontFamily: "Poppins,sans-serif", fontSize: "clamp(26px,3vw,40px)", fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.02em", marginBottom: 20 }}>
              The AEXSOFT Philosophy
            </h2>
            <p style={{ fontFamily: "Inter,sans-serif", fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: 18 }}>
              Founded on the principle that technical precision is the bedrock of digital success, we have grown from a small collective of elite engineers into a full-service agency. Our journey began with a vision to bridge the gap between complex engineering and elegant product design.
            </p>
            <p style={{ fontFamily: "Inter,sans-serif", fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: 28 }}>
              We don't just build apps; we architect ecosystems. Every line of code is written with scalability and maintenance in mind, ensuring that our clients' investments remain valuable for years to come.
            </p>
            
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
              {timeline.map((t, i) => (
                <div key={t.year} style={{ padding: 16, background: "var(--bg)", borderRadius: 8, border: "1px solid var(--border)" }}>
                  <div style={{ fontFamily: "Poppins,sans-serif", fontSize: 12, fontWeight: 700, color: "var(--accent)", marginBottom: 6 }}>{t.year}</div>
                  <div style={{ fontFamily: "Poppins,sans-serif", fontSize: 14, fontWeight: 600, color: "var(--text-primary)", marginBottom: 4 }}>{t.title}</div>
                  <div style={{ fontFamily: "Inter,sans-serif", fontSize: 12, color: "var(--text-muted)", lineHeight: 1.5 }}>{t.desc}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={fade(v, 0.15)}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
              {stats.map(s => (
                <div key={s.label} className="card" style={{ padding: 24, textAlign: "center" }}>
                  <div style={{ fontFamily: "Poppins,sans-serif", fontSize: "clamp(28px,4vw,42px)", fontWeight: 800, color: "var(--accent)", letterSpacing: "-0.02em", lineHeight: 1 }}>{s.val}</div>
                  <div style={{ fontFamily: "Inter,sans-serif", fontSize: 12, fontWeight: 600, color: "var(--text-muted)", marginTop: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Values() {
  const { ref, v } = useReveal(0.1);
  return (
    <section ref={ref} style={{ background: "var(--bg)", padding: "96px 0" }}>
      <div className="site-container">
        <div style={{ ...fade(v, 0), textAlign: "center", marginBottom: 52 }}>
          <span className="label-tag">What Drives Us</span>
          <h2 style={{ fontFamily: "Poppins,sans-serif", fontSize: "clamp(24px,3vw,38px)", fontWeight: 700, color: "var(--text-primary)", marginBottom: 12 }}>
            Our Core Values
          </h2>
          <p style={{ fontFamily: "Inter,sans-serif", fontSize: 15, color: "var(--text-secondary)", maxWidth: 500, margin: "0 auto" }}>The guiding principles that define every interaction and every sprint.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 20 }}>
          {values.map((val, i) => (
            <div key={val.title} className="card" style={{ ...fade(v, i * 0.08), padding: 28, textAlign: "center" }}>
              <div style={{ width: 56, height: 56, borderRadius: 14, background: `${val.color}15`, border: `1px solid ${val.color}30`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", color: val.color }}>
                {val.icon}
              </div>
              <h3 style={{ fontFamily: "Poppins,sans-serif", fontSize: 18, fontWeight: 600, color: "var(--text-primary)", marginBottom: 12 }}>{val.title}</h3>
              <p style={{ fontFamily: "Inter,sans-serif", fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.7, margin: 0 }}>{val.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyChooseUs() {
  const { ref, v } = useReveal(0.15);
  const benefits = [
    { icon: <Code2 size={22} />, title: "Clean Code", desc: "Every project follows industry best practices with comprehensive documentation." },
    { icon: <Shield size={22} />, title: "Security First", desc: "Enterprise-grade security measures built into every line of code." },
    { icon: <Globe size={22} />, title: "Global Team", desc: "Distributed across time zones to provide 24/7 development coverage." },
    { icon: <Award size={22} />, title: "Quality Guarantee", desc: "30-day post-launch support ensures bug-free delivery every time." },
  ];
  
  return (
    <section ref={ref} style={{ background: "var(--gradient-web)", padding: "96px 0", position: "relative", overflow: "hidden" }}>
      <div className="orb" style={{ position: "absolute", top: "-20%", right: "-10%", width: 400, height: 400, background: "radial-gradient(circle, rgba(14,165,233,0.15), transparent 70%)" }} />
      <div className="site-container" style={{ position: "relative", zIndex: 1 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
          <div style={fade(v, 0)}>
            <span className="label-tag" style={{ color: "#0ea5e9" }}>Why AEXSOFT</span>
            <h2 style={{ fontFamily: "Poppins,sans-serif", fontSize: "clamp(26px,3vw,40px)", fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.02em", marginBottom: 16 }}>
              Built for businesses<br />
              <span style={{ color: "#0ea5e9" }}>that demand excellence</span>
            </h2>
            <p style={{ fontFamily: "Inter,sans-serif", fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: 24 }}>
              We don't just deliver code — we deliver confidence. Every project comes with transparent progress updates, rigorous quality assurance, and ongoing support that ensures your digital investment pays dividends for years.
            </p>
            <Link href="/contact" className="btn-primary" style={{ background: "#0ea5e9", fontSize: 14, padding: "12px 24px" }}>
              Start Your Project →
            </Link>
          </div>
          
          <div style={fade(v, 0.1)}>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {benefits.map((b, i) => (
                <div key={b.title} className="card" style={{ padding: 20, display: "flex", gap: 16, alignItems: "center" }}>
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: "#fff", border: "1px solid rgba(14,165,233,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "#0ea5e9" }}>
                    {b.icon}
                  </div>
                  <div>
                    <h4 style={{ fontFamily: "Poppins,sans-serif", fontSize: 15, fontWeight: 600, color: "var(--text-primary)", marginBottom: 4 }}>{b.title}</h4>
                    <p style={{ fontFamily: "Inter,sans-serif", fontSize: 13, color: "var(--text-muted)", margin: 0, lineHeight: 1.5 }}>{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
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
            Ready to build something extraordinary?
          </h2>
          <p style={{ fontFamily: "Inter,sans-serif", fontSize: 16, color: "rgba(255,255,255,0.75)", lineHeight: 1.7, marginBottom: 36, maxWidth: 480, margin: "0 auto 36px" }}>
            Let's discuss your next project. Our team is ready to transform your vision into reality.
          </p>
          <Link href="/contact" className="btn-primary" style={{ background: "#fff", color: "var(--accent-dark)", fontSize: 15, padding: "16px 32px" }}>
            Start a Conversation →
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function AboutPage() {
  return (
    <div>
      <Hero />
      <Story />
      <Values />
      <WhyChooseUs />
      <CTA />
    </div>
  );
}