"use client";
import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { ArrowRight, ExternalLink, CheckCircle, Code2, Sparkles } from "lucide-react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

interface Project {
  id: string;
  name: string;
  category: string;
  description: string | null;
  tags: string[];
  result: string | null;
  image_url: string | null;
  project_url: string | null;
  color: string;
  display_order: number;
  is_active: boolean;
}

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

export default function PortfolioPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const { ref: headerRef, v: headerV } = useReveal();

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    setLoading(true);
    
    if (!supabase || !isSupabaseConfigured) {
      setLoading(false);
      return;
    }
    
    const { data } = await supabase
      .from('projects')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true });
    
    setProjects(data || []);
    setLoading(false);
  }

  const categories = ["All", ...Array.from(new Set(projects.map(p => p.category)))];
  const filteredProjects = filter === "All" ? projects : projects.filter(p => p.category === filter);

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", background: "var(--bg)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ width: 40, height: 40, border: "3px solid var(--border)", borderTopColor: "var(--accent)", borderRadius: "50%", animation: "spin 1s linear infinite", margin: "0 auto 16px" }} />
          <p style={{ fontFamily: "Inter,sans-serif", color: "var(--text-muted)" }}>Loading projects...</p>
        </div>
      </div>
    );
  }

  if (!isSupabaseConfigured) {
    return (
      <div style={{ minHeight: "100vh", background: "var(--bg)", padding: "120px 24px" }}>
        <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
          <div style={{ width: 80, height: 80, background: "var(--accent-dim)", borderRadius: 20, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
            <Sparkles size={36} style={{ color: "var(--accent)" }} />
          </div>
          <h1 style={{ fontFamily: "Poppins,sans-serif", fontSize: 32, fontWeight: 700, color: "var(--text-primary)", marginBottom: 16 }}>Portfolio</h1>
          <p style={{ fontFamily: "Inter,sans-serif", fontSize: 16, color: "var(--text-secondary)", marginBottom: 32 }}>
            Configure Supabase to display your projects.
          </p>
          <Link href="/admin" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 28px", background: "var(--accent)", color: "#fff", borderRadius: 8, fontFamily: "Inter,sans-serif", fontWeight: 600, textDecoration: "none" }}>
            Go to Admin <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      {/* Hero Header */}
      <section style={{ background: "var(--gradient-hero)", padding: "40px 0 50px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -100, right: -100, width: 400, height: 400, background: "radial-gradient(circle, rgba(59,130,246,0.08), transparent 70%)", borderRadius: "50%" }} />
        <div style={{ position: "absolute", bottom: -50, left: -50, width: 300, height: 300, background: "radial-gradient(circle, rgba(139,92,246,0.06), transparent 70%)", borderRadius: "50%" }} />
        
        <div className="site-container" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ textAlign: "center", maxWidth: 700, margin: "0 auto" }}>
            <h1 style={{ fontFamily: "Poppins,sans-serif", fontSize: "clamp(32px,4vw,48px)", fontWeight: 800, color: "var(--text-primary)", letterSpacing: "-0.02em", marginBottom: 16, lineHeight: 1.2 }}>
              Projects That <span style={{ color: "var(--accent)" }}>Speak</span> For Themselves
            </h1>
            <p style={{ fontFamily: "Inter,sans-serif", fontSize: 18, color: "var(--text-secondary)", maxWidth: 540, margin: "0 auto", lineHeight: 1.8 }}>
              From SaaS platforms to e-commerce stores — every project is a testament to our commitment to excellence.
            </p>
            
            {/* Stats */}
            <div style={{ display: "flex", justifyContent: "center", gap: 48, marginTop: 48, paddingTop: 32, borderTop: "1px solid var(--border)" }}>
              {[
                { num: projects.length, label: "Projects" },
                { num: "100%", label: "Success Rate" },
                { num: "50+", label: "Happy Clients" }
              ].map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontFamily: "Poppins,sans-serif", fontSize: 32, fontWeight: 800, color: "var(--accent)" }}>{stat.num}</div>
                  <div style={{ fontFamily: "Inter,sans-serif", fontSize: 13, color: "var(--text-muted)" }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section style={{ background: "var(--bg)", padding: "40px 0", borderBottom: "1px solid var(--border)", position: "sticky", top: 64, zIndex: 10 }}>
        <div className="site-container">
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                style={{
                  padding: "12px 24px",
                  borderRadius: 99,
                  border: "none",
                  background: filter === cat ? "var(--accent)" : "var(--bg-surface)",
                  color: filter === cat ? "#fff" : "var(--text-primary)",
                  fontFamily: "Inter,sans-serif",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 200ms ease",
                  boxShadow: filter === cat ? "0 4px 20px rgba(59,130,246,0.3)" : "none"
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section style={{ background: "var(--bg)", padding: "80px 0" }}>
        <div className="site-container">
          {filteredProjects.length === 0 && !loading ? (
            <div style={{ textAlign: "center", padding: "100px 0" }}>
              <div style={{ width: 80, height: 80, background: "var(--bg-surface)", borderRadius: 20, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
                <Code2 size={36} style={{ color: "var(--text-muted)" }} />
              </div>
              <p style={{ fontFamily: "Inter,sans-serif", fontSize: 16, color: "var(--text-muted)", marginBottom: 8 }}>
                No projects in this category
              </p>
              <Link href="/admin" style={{ fontFamily: "Inter,sans-serif", fontSize: 14, fontWeight: 600, color: "var(--accent)" }}>
                Add projects in admin →
              </Link>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 24 }}>
              {filteredProjects.map((project, i) => (
                <div 
                  key={project.id} 
                  style={{ 
                    ...fade(true, i * 0.08), 
                    background: "var(--bg-card)", 
                    borderRadius: 16, 
                    overflow: "hidden", 
                    border: "1px solid var(--border)",
                    transition: "all 300ms ease",
                    cursor: "pointer"
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = "translateY(-8px)";
                    e.currentTarget.style.boxShadow = "0 20px 60px rgba(0,0,0,0.12)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  {/* Image */}
                  <div style={{ position: "relative", height: 200, overflow: "hidden" }}>
                    {project.image_url ? (
                      <div 
                        className="project-scroll"
                        onMouseEnter={e => {
                          const img = e.currentTarget.querySelector('img') as HTMLImageElement;
                          if (img) {
                            const scrollAmount = img.offsetHeight - 280;
                            img.style.transform = `translateY(-${scrollAmount}px)`;
                          }
                        }}
                        onMouseLeave={e => {
                          const img = e.currentTarget.querySelector('img') as HTMLImageElement;
                          if (img) img.style.transform = 'translateY(0)';
                        }}
                      >
                        <img 
                          src={project.image_url} 
                          alt={project.name} 
                          style={{ width: "100%", objectFit: "cover", objectPosition: "top", transition: "transform 3s ease-in-out" }}
                        />
                      </div>
                    ) : (
                      <div style={{ width: "100%", height: 200, background: `linear-gradient(135deg, ${project.color}15, ${project.color}05)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span style={{ fontFamily: "Poppins,sans-serif", fontSize: 72, fontWeight: 800, color: project.color, opacity: 0.2 }}>
                          {project.name.charAt(0)}
                        </span>
                      </div>
                    )}
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 50%)", pointerEvents: "none" }} />
                    <span style={{ position: "absolute", top: 16, left: 16, fontFamily: "Inter,sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", background: project.color, color: "#fff", padding: "6px 12px", borderRadius: 6 }}>
                      {project.category}
                    </span>
                    {project.project_url && (
                      <a 
                        href={project.project_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={e => e.stopPropagation()}
                        style={{ position: "absolute", bottom: 16, right: 16, width: 44, height: 44, background: "#fff", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 20px rgba(0,0,0,0.2)" }}
                      >
                        <ExternalLink size={20} style={{ color: "var(--text-primary)" }} />
                      </a>
                    )}
                  </div>

                  {/* Content */}
                  <div style={{ padding: 20 }}>
                    <h3 style={{ fontFamily: "Poppins,sans-serif", fontSize: 22, fontWeight: 700, color: "var(--text-primary)", marginBottom: 12 }}>
                      {project.name}
                    </h3>
                    <p style={{ fontFamily: "Inter,sans-serif", fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: 20, minHeight: 48 }}>
                      {project.description}
                    </p>
                    
                    {/* Tags */}
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24 }}>
                      {project.tags?.slice(0, 4).map((tag, idx) => (
                        <span key={idx} style={{ padding: "6px 12px", background: "var(--bg-subtle)", borderRadius: 6, fontFamily: "Inter,sans-serif", fontSize: 12, color: "var(--text-secondary)", fontWeight: 500 }}>
                          {tag}
                        </span>
                      ))}
                      {project.tags?.length > 4 && (
                        <span style={{ padding: "6px 12px", background: "var(--bg-subtle)", borderRadius: 6, fontFamily: "Inter,sans-serif", fontSize: 12, color: "var(--text-muted)" }}>
                          +{project.tags.length - 4}
                        </span>
                      )}
                    </div>

                    {/* Result */}
                    {project.result && (
                      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "16px 20px", background: "linear-gradient(135deg, rgba(34,197,94,0.1), rgba(34,197,94,0.05))", borderRadius: 12, border: "1px solid rgba(34,197,94,0.2)" }}>
                        <CheckCircle size={20} style={{ color: "#22c55e" }} />
                        <span style={{ fontFamily: "Inter,sans-serif", fontSize: 14, color: "#22c55e", fontWeight: 600 }}>
                          {project.result}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "var(--gradient-cta)", padding: "100px 0", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -100, right: -100, width: 400, height: 400, background: "radial-gradient(circle, rgba(255,255,255,0.1), transparent 70%)", borderRadius: "50%" }} />
        <div style={{ position: "absolute", bottom: -100, left: -100, width: 300, height: 300, background: "radial-gradient(circle, rgba(255,255,255,0.08), transparent 70%)", borderRadius: "50%" }} />
        
        <div className="site-container" style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          <div style={{ ...fade(true, 0), maxWidth: 600, margin: "0 auto" }}>
            <h2 style={{ fontFamily: "Poppins,sans-serif", fontSize: "clamp(32px,4vw,48px)", fontWeight: 800, color: "#fff", letterSpacing: "-0.02em", marginBottom: 20 }}>
              Ready to Build Something Amazing?
            </h2>
            <p style={{ fontFamily: "Inter,sans-serif", fontSize: 18, color: "rgba(255,255,255,0.75)", marginBottom: 40, lineHeight: 1.7 }}>
              Let&apos;s create a project that exceeds your expectations and helps your business grow.
            </p>
            <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "16px 32px", background: "#fff", color: "#1e40af", borderRadius: 10, fontFamily: "Inter,sans-serif", fontWeight: 700, fontSize: 16, textDecoration: "none", boxShadow: "0 8px 30px rgba(0,0,0,0.2)" }}>
                Start Your Project <ArrowRight size={20} />
              </Link>
              <Link href="/services" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "16px 32px", background: "rgba(255,255,255,0.1)", color: "#fff", borderRadius: 10, fontFamily: "Inter,sans-serif", fontWeight: 600, fontSize: 16, textDecoration: "none", border: "2px solid rgba(255,255,255,0.3)" }}>
                View Services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}