"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { 
  Zap, Bot, Shield, Rocket, ShoppingCart, Globe, Target, ShieldCheck, Code, Server, Database, Coins, Sparkles, Paintbrush, Cloud, GitBranch, PenTool, Wrench, Trophy, Lightbulb, Handshake
} from "lucide-react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

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

/* ─────── HERO ─────── */
function Hero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { const t = setTimeout(() => setLoaded(true), 60); return () => clearTimeout(t); }, []);

  return (
    <section style={{ background: "var(--gradient-hero)", position: "relative", overflow: "hidden", minHeight: "92vh", display: "flex", alignItems: "center" }} className="hero-noise">
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }} className="dot-grid" />
      <div className="orb" style={{ position: "absolute", top: "-10%", right: "-5%", width: 600, height: 600, background: "radial-gradient(circle, rgba(59,130,246,0.18), transparent 70%)", animationDuration: "10s" }} />
      <div className="orb" style={{ position: "absolute", bottom: "-10%", left: "-5%", width: 500, height: 500, background: "radial-gradient(circle, rgba(96,165,250,0.12), transparent 70%)", animationDuration: "13s", animationDelay: "-4s" }} />
      <div className="orb" style={{ position: "absolute", top: "30%", left: "40%", width: 300, height: 300, background: "radial-gradient(circle, rgba(139,92,246,0.08)", animationDuration: "9s", animationDelay: "-2s" }} />

      <div className="site-container" style={{ position: "relative", zIndex: 1, paddingTop: 80, paddingBottom: 80, width: "100%" }}>
        <div className="hero-grid grid grid-cols-1 lg:grid-cols-2" style={{ gap: 80, alignItems: "center" }}>
          <div>
            <h1 style={{ ...fade(loaded, 0.08), fontFamily: "Poppins,sans-serif", fontSize: "clamp(36px,4.8vw,62px)", fontWeight: 800, color: "var(--text-primary)", lineHeight: 1.08, letterSpacing: "-0.03em", marginBottom: 24 }}>
              We Build Digital<br />Solutions That{" "}
              <span style={{ background: "linear-gradient(135deg, var(--accent) 0%, #818cf8 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                Drive Results
              </span>
            </h1>
            <p style={{ ...fade(loaded, 0.15), fontFamily: "Inter,sans-serif", fontSize: 18, color: "var(--text-secondary)", lineHeight: 1.75, marginBottom: 40, maxWidth: 480 }}>
              Full-stack development agency specializing in high-performance web apps, scalable SaaS products, and enterprise solutions built for modern businesses.
            </p>
            <div style={{ ...fade(loaded, 0.22), display: "flex", gap: 14, flexWrap: "wrap" }}>
              <Link href="/contact" className="btn-primary" style={{ fontSize: 15, padding: "14px 28px" }}>
                Start Your Project
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
              <Link href="/portfolio" className="btn-secondary" style={{ fontSize: 15, padding: "14px 28px" }}>
                View Our Work
              </Link>
            </div>
            <div className="hero-stats" style={{ ...fade(loaded, 0.3), display: "flex", gap: 40, marginTop: 56, paddingTop: 40, borderTop: "1px solid var(--border)", flexWrap: "wrap" }}>
              {[{ val: "2+", label: "Years Excellence" }, { val: "50+", label: "Projects Shipped" }, { val: "100%", label: "Satisfaction Rate" }].map(s => (
                <div key={s.label}>
                  <div style={{ fontFamily: "Poppins,sans-serif", fontSize: 30, fontWeight: 800, color: "var(--accent)", letterSpacing: "-0.03em" }}>{s.val}</div>
                  <div style={{ fontFamily: "Inter,sans-serif", fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ ...fade(loaded, 0.18), display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ position: "relative" }}>
              <img src="/hero.png" alt="AEXSOFT Hero" style={{ width: "100%", height: "auto", maxHeight: 500, objectFit: "contain", display: "block" }} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: 12 }}>
              {[
                { icon: <Zap size={20} />, label: "Next.js 15", sub: "App Router" },
                { icon: <Shield size={20} />, label: "Enterprise", sub: "Grade Security" },
                { icon: <Rocket size={20} />, label: "Fast Deploy", sub: "CI/CD Ready" },
                { icon: <Code size={20} />, label: "Clean Code", sub: "Best Practices" },
              ].map(c => (
                <div key={c.label} style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 10, padding: "14px 16px", display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>{c.icon}</span>
                  <div>
                    <div style={{ fontFamily: "Inter,sans-serif", fontSize: 13, fontWeight: 700, color: "var(--text-primary)" }}>{c.label}</div>
                    <div style={{ fontFamily: "Inter,sans-serif", fontSize: 11, color: "var(--text-muted)" }}>{c.sub}</div>
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

/* ─────── SERVICES ─────── */
const services = [
  { id: "web-development", icon: <Globe size={28} />, title: "Full-Stack Web Development", desc: "Pixel-perfect, scalable web applications built for extreme performance with Next.js, React, and modern frameworks.", tags: ["Next.js", "React", "TypeScript", "Node.js"], color: "#3b82f6", img: "/fullstack.png" },
  { id: "saas", icon: <Zap size={28} />, title: "SaaS Development", desc: "End-to-end cloud applications designed to scale from 100 to 1,000,000 users with auth, payments, and analytics.", tags: ["Next.js", "Supabase", "Stripe", "PostgreSQL"], color: "#22c55e", img: "/saas.png" },
  { id: "ecommerce", icon: <ShoppingCart size={28} />, title: "E-commerce Solutions", desc: "Modern storefronts with seamless payment processing, inventory management, and conversion optimization.", tags: ["Next.js", "Stripe", "Shopify Plus"], color: "#eab308", img: "/ecommerce.png" },
  { id: "ai-automation", icon: <Bot size={28} />, title: "AI Automation", desc: "Intelligent chatbots and workflow automation powered by LLMs to streamline your business operations.", tags: ["OpenAI", "LangChain", "Python"], color: "#8b5cf6", img: "/aichatbot.png", link: "/aichatbots" },
];

function Services() {
  const { ref, v } = useReveal();
  return (
    <section id="services" ref={ref} style={{ background: "var(--bg)", padding: "96px 0" }}>
      <div className="site-container">
        <div style={{ ...fade(v, 0), textAlign: "center", marginBottom: 60 }}>
          <span className="label-tag">What We Do</span>
          <h2 style={{ fontFamily: "Poppins,sans-serif", fontSize: "clamp(28px,3.5vw,44px)", fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.02em", marginBottom: 14 }}>Our Core Services</h2>
          <p style={{ fontFamily: "Inter,sans-serif", fontSize: 17, color: "var(--text-secondary)", maxWidth: 520, margin: "0 auto" }}>We build high-performance digital solutions tailored to your business needs.</p>
        </div>
        <div className="services-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 28 }}>
          {services.map((s, i) => (
            <div key={s.id} style={{ ...fade(v, i * 0.08), background: "var(--bg-card)", borderRadius: 16, overflow: "hidden", border: "1px solid var(--border)", transition: "all 300ms ease" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 16px 40px rgba(0,0,0,0.1)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
              <Link href={s.link ? s.link : `/services#${s.id}`} style={{ textDecoration: "none", color: "inherit", display: "block" }}>
                <div style={{ position: "relative", height: 160, overflow: "hidden" }}>
                  <img src={s.img} alt={s.title} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 500ms ease" }}
                    onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.05)")}
                    onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")} />
                  <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, var(--bg-card) 0%, ${s.color}30 100%)` }} />
                  <div style={{ position: "absolute", top: 16, left: 16, width: 48, height: 48, borderRadius: 12, background: `${s.color}`, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}>
                    {s.icon}
                  </div>
                </div>
                <div style={{ padding: 24 }}>
                  <h3 style={{ fontFamily: "Poppins,sans-serif", fontSize: 18, fontWeight: 700, color: "var(--text-primary)", marginBottom: 10 }}>{s.title}</h3>
                  <p style={{ fontFamily: "Inter,sans-serif", fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: 16, minHeight: 52 }}>{s.desc}</p>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 20 }}>
                    {s.tags.slice(0, 3).map(t => <span key={t} className="tech-chip" style={{ fontSize: 10, padding: "3px 8px" }}>{t}</span>)}
                  </div>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: "Inter,sans-serif", fontSize: 13, fontWeight: 600, color: s.color }}>
                    Learn More <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </span>
                </div>
              </Link>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: 48, ...fade(v, 0.35) }}>
          <Link href="/services" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 28px", background: "var(--accent)", color: "#fff", borderRadius: 8, fontFamily: "Inter,sans-serif", fontSize: 14, fontWeight: 600, textDecoration: "none" }}>
            View All Services <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─────── WHY US ─────── */
const whyItems = [
  { icon: <Target size={22} />, title: "Technical Expertise", desc: "2+ years delivering production-grade software. We obsess over code quality and architecture." },
  { icon: <Rocket size={22} />, title: "Speed & Agility", desc: "Agile sprints with daily updates. We ship meaningful progress every week." },
  { icon: <ShieldCheck size={22} />, title: "30-Day Guarantee", desc: "Every project ships with a 30-day bug-free guarantee and full documentation." },
];

function WhyUs() {
  const { ref, v } = useReveal();
  return (
    <section ref={ref} style={{ background: "var(--bg-surface)", padding: "96px 0" }}>
      <div className="site-container">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr]" style={{ gap: 80, alignItems: "center" }}>
          <div style={fade(v, 0)}>
            <span className="label-tag">Why AEXSOFT</span>
            <h2 style={{ fontFamily: "Poppins,sans-serif", fontSize: "clamp(26px,3.5vw,42px)", fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.02em", marginBottom: 20 }}>
              Built for businesses that don't settle for average
            </h2>
            <p style={{ fontFamily: "Inter,sans-serif", fontSize: 16, color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: 32 }}>
              From startups to global enterprises — we help businesses build software they're proud of.
            </p>
            <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80&auto=format" alt="Team" style={{ width: "100%", borderRadius: 14, border: "1px solid var(--border)", boxShadow: "var(--shadow-lift)" }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 20, ...fade(v, 0.12) }}>
            {whyItems.map(w => (
              <div key={w.title} className="card" style={{ padding: 28, display: "flex", gap: 20, alignItems: "flex-start" }}>
                <div style={{ width: 48, height: 48, borderRadius: 10, background: "var(--accent-dim)", border: "1px solid var(--accent-glow)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>
                  {w.icon}
                </div>
                <div>
                  <h3 style={{ fontFamily: "Poppins,sans-serif", fontSize: 17, fontWeight: 700, color: "var(--text-primary)", marginBottom: 8 }}>{w.title}</h3>
                  <p style={{ fontFamily: "Inter,sans-serif", fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.7, margin: 0 }}>{w.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────── TECH STACK ─────── */
const techStack = [
  { label: "Next.js", color: "#000000", icon: "▲" },
  { label: "React", color: "#61dafb", icon: <Code size={14} /> },
  { label: "TypeScript", color: "#3178c6", icon: "TS" },
  { label: "Supabase", color: "#3ecf8e", icon: <Zap size={14} /> },
  { label: "PostgreSQL", color: "#336791", icon: <Database size={14} /> },
  { label: "Stripe", color: "#635bff", icon: <Coins size={14} /> },
  { label: "Tailwind", color: "#38bdf8", icon: <Paintbrush size={14} /> },
  { label: "AWS", color: "#ff9900", icon: <Cloud size={14} /> },
  { label: "Vercel", color: "#000000", icon: "▲" },
  { label: "Docker", color: "#2496ed", icon: <Server size={14} /> },
];

function TechStack() {
  const { ref, v } = useReveal();
  return (
    <section ref={ref} style={{ background: "var(--bg)", padding: "80px 0" }}>
      <div className="site-container">
        <div style={{ ...fade(v, 0), textAlign: "center", marginBottom: 48 }}>
          <span className="label-tag">Tech Expertise</span>
          <h2 style={{ fontFamily: "Poppins,sans-serif", fontSize: "clamp(24px,3vw,38px)", fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.02em" }}>Technologies We Master</h2>
        </div>
        <div style={{ ...fade(v, 0.1), display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center" }}>
          {techStack.map(t => (
            <div key={t.label} className="tech-chip">
              <span style={{ fontWeight: 700, fontSize: 14, color: t.color === "#000000" ? "var(--accent)" : t.color }}>{t.icon}</span>
              <span>{t.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────── PROJECTS ─────── */
function Projects() {
  const { ref, v } = useReveal();
  const [projects, setProjects] = React.useState<any[]>([]);
  
  React.useEffect(() => {
    async function fetchProjects() {
      if (!supabase || !isSupabaseConfigured) return;
      const { data } = await supabase
        .from('projects')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true })
        .limit(6);
      if (data) setProjects(data);
    }
    fetchProjects();
  }, []);

  return (
    <section id="projects" ref={ref} style={{ background: "var(--bg-surface)", padding: "96px 0" }}>
      <div className="site-container">
        <div style={{ ...fade(v, 0), display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 56, flexWrap: "wrap", gap: 16 }}>
          <div>
            <span className="label-tag">Featured Work</span>
            <h2 style={{ fontFamily: "Poppins,sans-serif", fontSize: "clamp(28px,3.5vw,44px)", fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.02em" }}>Real Solutions, Real Results</h2>
          </div>
          <Link href="/portfolio" style={{ fontFamily: "Inter,sans-serif", fontSize: 14, fontWeight: 600, color: "var(--accent)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6 }}>
            Explore Portfolio <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
        </div>
        <div className="projects-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: 24 }}>
          {projects.map((p, i) => (
            <div key={p.id} className="card" style={{ ...fade(v, i * 0.1), borderRadius: 16, overflow: "hidden", border: "1px solid var(--border)", transition: "all 300ms ease" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-8px)"; e.currentTarget.style.boxShadow = "0 20px 60px rgba(0,0,0,0.12)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
              <div style={{ position: "relative", height: 200, overflow: "hidden" }}>
                {p.image_url ? (
                  <div className="project-scroll" onMouseEnter={e => { const img = e.currentTarget.querySelector('img') as HTMLImageElement; if (img) { const scrollAmount = img.offsetHeight - 200; img.style.transform = `translateY(-${scrollAmount}px)`; } }} onMouseLeave={e => { const img = e.currentTarget.querySelector('img') as HTMLImageElement; if (img) img.style.transform = 'translateY(0)'; }}>
                    <img src={p.image_url} alt={p.name} style={{ width: "100%", objectFit: "cover", objectPosition: "top", transition: "transform 3s ease-in-out" }} />
                  </div>
                ) : (
                  <div style={{ width: "100%", height: 200, background: `linear-gradient(135deg, ${p.color}15, ${p.color}05)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontFamily: "Poppins,sans-serif", fontSize: 56, fontWeight: 800, color: p.color, opacity: 0.2 }}>{p.name?.charAt(0)}</span>
                  </div>
                )}
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 50%)", pointerEvents: "none" }} />
                <span style={{ position: "absolute", top: 12, left: 12, fontFamily: "Inter,sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", background: p.color, color: "#fff", padding: "4px 8px", borderRadius: 4 }}>{p.category}</span>
                {p.project_url && (
                  <a href={p.project_url} target="_blank" rel="noopener noreferrer" style={{ position: "absolute", bottom: 12, right: 12, width: 36, height: 36, background: "#fff", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(0,0,0,0.2)" }}>
                    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#0f0f0f" strokeWidth={2}><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/></svg>
                  </a>
                )}
              </div>
              <div style={{ padding: 20 }}>
                <h3 style={{ fontFamily: "Poppins,sans-serif", fontSize: 18, fontWeight: 700, color: "var(--text-primary)", marginBottom: 8 }}>{p.name}</h3>
                <p style={{ fontFamily: "Inter,sans-serif", fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: 14, minHeight: 40 }}>{p.description}</p>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>
                  {p.tags?.slice(0, 3).map((t: string, idx: number) => <span key={idx} style={{ padding: "4px 8px", background: "var(--bg-subtle)", borderRadius: 4, fontFamily: "Inter,sans-serif", fontSize: 11, color: "var(--text-secondary)" }}>{t}</span>)}
                </div>
                {p.result && (
                  <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 16px", background: "linear-gradient(135deg, rgba(34,197,94,0.1), rgba(34,197,94,0.05))", borderRadius: 8, border: "1px solid rgba(34,197,94,0.2)" }}>
                    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth={2.5}><path d="M20 6L9 17l-5-5"/></svg>
                    <span style={{ fontFamily: "Inter,sans-serif", fontSize: 12, color: "#22c55e", fontWeight: 600 }}>{p.result}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────── CTA ─────── */
function CTA() {
  const { ref, v } = useReveal();
  return (
    <section ref={ref} style={{ background: "var(--gradient-cta)", padding: "100px 0", position: "relative", overflow: "hidden" }}>
      <div className="orb" style={{ position: "absolute", top: "-50%", right: "-10%", width: 600, height: 600, background: "radial-gradient(circle, rgba(255,255,255,0.06), transparent 70%)" }} />
      <div className="site-container" style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
        <div style={fade(v, 0)}>
          <h2 style={{ fontFamily: "Poppins,sans-serif", fontSize: "clamp(28px,4vw,52px)", fontWeight: 800, color: "#fff", letterSpacing: "-0.03em", marginBottom: 18 }}>
            Ready to Start Your Project?
          </h2>
          <p style={{ fontFamily: "Inter,sans-serif", fontSize: 18, color: "rgba(255,255,255,0.75)", lineHeight: 1.7, marginBottom: 44, maxWidth: 520, margin: "0 auto 44px" }}>
            Whether you have a fully formed brief or just the spark of an idea — let's build something incredible together.
          </p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/contact" style={{ fontFamily: "Inter,sans-serif", fontWeight: 700, fontSize: 15, color: "#1e40af", background: "#fff", textDecoration: "none", padding: "14px 32px", borderRadius: 6, boxShadow: "0 4px 20px rgba(0,0,0,0.2)" }}>
              Start Your Project →
            </Link>
            <Link href="/about" style={{ fontFamily: "Inter,sans-serif", fontWeight: 600, fontSize: 15, color: "#fff", border: "2px solid rgba(255,255,255,0.35)", background: "rgba(255,255,255,0.08)", textDecoration: "none", padding: "14px 32px", borderRadius: 6 }}>
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────── PAGE ─────── */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <WhyUs />
      <TechStack />
      <Projects />
      <CTA />
    </>
  );
}