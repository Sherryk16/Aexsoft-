"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/components/ThemeProvider";

const SunIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
);
const MoonIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);
const MenuIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
);
const CloseIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services", hasDropdown: true },
  { label: "About", href: "/about" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Contact", href: "/contact" },
];

const servicesDropdown = [
  { label: "Full-Stack Web Development", href: "/services#web-development", desc: "Custom web apps with Next.js & React" },
  { label: "AI Automation & Chatbots", href: "/aichatbots", desc: "Voice AI, chatbots & workflow automation" },
  { label: "SaaS Development", href: "/services#saas", desc: "Scalable multi-tenant cloud products" },
  { label: "E-commerce Solutions", href: "/services#ecommerce", desc: "Online stores with payments & inventory" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = usePathname();
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isDark = theme === "dark";

  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 100,
      background: "var(--nav-bg)",
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      borderBottom: scrolled ? "1px solid var(--nav-border)" : "1px solid transparent",
      boxShadow: scrolled ? "0 1px 12px rgba(0,0,0,0.08)" : "none",
      transition: "border-color 250ms, box-shadow 250ms",
    }}>
      <div className="site-container" style={{ height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>

        {/* Logo */}
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
          <img src="/logo.png" alt="AEXSOFT Logo" className="logo-light" style={{ height: 80, width: "auto", objectFit: "contain" }} />
          <img src="/logodark.png" alt="AEXSOFT Logo" className="logo-dark" style={{ height: 80, width: "auto", objectFit: "contain" }} />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex" style={{ alignItems: "center", gap: 2 }}>
          {navLinks.map(l => {
            const active = pathname === l.href;
            
            if (l.hasDropdown) {
              return (
                <div key={l.href} style={{ position: "relative" }}>
                  <Link 
                    href={l.href}
                    onClick={(e) => { if (pathname === l.href) { e.preventDefault(); setServicesOpen(!servicesOpen); } }}
                    onMouseEnter={() => setServicesOpen(true)}
                    style={{
                      fontFamily: "Inter,sans-serif", fontSize: 14, fontWeight: 500,
                      color: servicesOpen ? "var(--accent)" : "var(--text-secondary)",
                      textDecoration: "none", padding: "6px 14px", borderRadius: 6,
                      display: "flex", alignItems: "center", gap: 6,
                      background: servicesOpen ? "var(--accent-dim)" : "transparent",
                    }}
                  >
                    {l.label}
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ transform: servicesOpen ? "rotate(180deg)" : "none", transition: "transform 200ms" }}>
                      <polyline points="6 9 12 15 18 9"/>
                    </svg>
                  </Link>
                  
                  {/* Dropdown */}
                  {servicesOpen && (
                    <div 
                      onMouseLeave={() => setServicesOpen(false)}
                      style={{
                        position: "absolute", top: "100%", left: 0, marginTop: 8,
                        background: "var(--bg-surface)", border: "1px solid var(--border)",
                        borderRadius: 10, padding: "8px", minWidth: 280,
                        boxShadow: "0 10px 40px rgba(0,0,0,0.15)", zIndex: 50,
                      }}
                    >
                      {servicesDropdown.map(s => (
                        <Link 
                          key={s.href} 
                          href={s.href}
                          onClick={() => setServicesOpen(false)}
                          style={{
                            display: "block", padding: "12px 16px", borderRadius: 8,
                            textDecoration: "none",
                          }}
                          onMouseEnter={e => { e.currentTarget.style.background = "var(--bg-subtle)"; }}
                          onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
                        >
                          <div style={{ fontFamily: "Inter,sans-serif", fontSize: 14, fontWeight: 600, color: "var(--text-primary)", marginBottom: 2 }}>{s.label}</div>
                          <div style={{ fontFamily: "Inter,sans-serif", fontSize: 12, color: "var(--text-muted)" }}>{s.desc}</div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }
            
            return (
              <Link key={l.href} href={l.href} style={{
                fontFamily: "Inter,sans-serif", fontSize: 14, fontWeight: 500,
                color: active ? "var(--accent)" : "var(--text-secondary)",
                textDecoration: "none", padding: "6px 14px", borderRadius: 6,
                transition: "color 150ms, background 150ms",
                background: active ? "var(--accent-dim)" : "transparent",
              }}
                onMouseEnter={e => { const el = e.currentTarget; if (!active) { el.style.color = "var(--accent)"; el.style.background = "var(--accent-dim)"; } }}
                onMouseLeave={e => { const el = e.currentTarget; if (!active) { el.style.color = "var(--text-secondary)"; el.style.background = "transparent"; } }}
              >{l.label}</Link>
            );
          })}

          {/* Theme toggle */}
          <button onClick={toggle} aria-label="Toggle theme" style={{
            marginLeft: 8, width: 38, height: 38,
            borderRadius: 8, border: "1.5px solid var(--border)",
            background: "var(--bg-subtle)", color: "var(--text-secondary)",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", transition: "border-color 200ms, color 200ms, background 200ms",
          }}
            onMouseEnter={e => { const el = e.currentTarget; el.style.borderColor = "var(--accent)"; el.style.color = "var(--accent)"; }}
            onMouseLeave={e => { const el = e.currentTarget; el.style.borderColor = "var(--border)"; el.style.color = "var(--text-secondary)"; }}
          >
            {isDark ? <SunIcon /> : <MoonIcon />}
          </button>

          <Link href="/contact" style={{
            marginLeft: 8, fontFamily: "Inter,sans-serif", fontWeight: 600, fontSize: 14,
            color: "#fff", background: "var(--accent)", textDecoration: "none",
            padding: "9px 20px", borderRadius: 6,
            transition: "background 200ms, transform 150ms, box-shadow 200ms",
            boxShadow: "0 2px 8px var(--accent-glow)",
          }}
            onMouseEnter={e => { const el = e.currentTarget; el.style.background = "var(--accent-dark)"; el.style.transform = "translateY(-1px)"; }}
            onMouseLeave={e => { const el = e.currentTarget; el.style.background = "var(--accent)"; el.style.transform = ""; }}
          >
            Get Started
          </Link>
        </nav>

        {/* Mobile toggle */}
        <div className="flex md:hidden" style={{ alignItems: "center", gap: 8 }}>
          <button onClick={toggle} aria-label="Toggle theme" style={{
            display: "flex", width: 36, height: 36, borderRadius: 6,
            border: "1px solid var(--border)", background: "var(--bg-subtle)",
            color: "var(--text-secondary)", alignItems: "center", justifyContent: "center", cursor: "pointer",
          }}>
            {isDark ? <SunIcon /> : <MoonIcon />}
          </button>
          <button onClick={() => setOpen(!open)} aria-label="Toggle menu" style={{
            display: "flex", width: 36, height: 36, borderRadius: 6,
            border: "1px solid var(--border)", background: "transparent",
            color: "var(--text-primary)", alignItems: "center", justifyContent: "center", cursor: "pointer",
          }}>
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{ background: "var(--bg-surface)", borderTop: "1px solid var(--border)", padding: "16px 20px 24px" }}>
          {navLinks.map(l => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} style={{
              display: "block", fontFamily: "Inter,sans-serif", fontSize: 15, fontWeight: 500,
              color: "var(--text-primary)", textDecoration: "none", padding: "11px 12px", borderRadius: 6,
            }}>{l.label}</Link>
          ))}
          <Link href="/contact" onClick={() => setOpen(false)} style={{
            display: "block", marginTop: 10, textAlign: "center",
            fontFamily: "Inter,sans-serif", fontWeight: 600, fontSize: 14,
            color: "#fff", background: "var(--accent)", textDecoration: "none",
            padding: "11px 20px", borderRadius: 6,
          }}>Get Started →</Link>
        </div>
      )}
    </header>
  );
}
