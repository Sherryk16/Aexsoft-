"use client";
import React from "react";
import Link from "next/link";
import { Mail } from "lucide-react";

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
    <path d="M9 18c-4.51 2-5-2-7-2"/>
  </svg>
);
const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const sections = [
  { title: "Services", links: [{ l: "Web Development", h: "/services#web-development" }, { l: "AI & Chatbots", h: "/services#chatbots" }, { l: "SaaS Platforms", h: "/services#saas" }, { l: "E-commerce", h: "/services#ecommerce" }] },
  { title: "Agency", links: [{ l: "About Us", h: "/about" }, { l: "Our Work", h: "/#projects" }, { l: "Process", h: "/#process" }, { l: "Contact", h: "/contact" }] },
  { title: "Legal", links: [{ l: "Privacy Policy", h: "#" }, { l: "Terms of Service", h: "#" }, { l: "Cookie Policy", h: "#" }] },
];

export function Footer() {
  return (
    <footer style={{ background: "var(--bg-surface)", borderTop: "1px solid var(--border)" }}>
      <div className="site-container" style={{ paddingTop: 64, paddingBottom: 40 }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48, marginBottom: 48 }}>
          {/* Brand */}
          <div>
            <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <img src="/logo.png" alt="AEXSOFT Logo" className="logo-light" style={{ height: 48, width: "auto", objectFit: "contain" }} />
              <img src="/logodark.png" alt="AEXSOFT Logo" className="logo-dark" style={{ height: 48, width: "auto", objectFit: "contain" }} />
            </Link>
            <p style={{ fontFamily: "Inter,sans-serif", fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.75, maxWidth: 260, marginBottom: 24 }}>
              Building the next generation of technical solutions with precision and craft. Serving globally.
            </p>
            <div style={{ display: "flex", gap: 8 }}>
              {[{ Icon: GithubIcon, href: "https://github.com/Sherryk16", label: "GitHub" }, { Icon: InstagramIcon, href: "https://instagram.com/aexsoft_studio", label: "Instagram" }, { Icon: () => <Mail size={18} />, href: "mailto:aexsoftstudio@gmail.com", label: "Email" }].map(({ Icon, href, label }) => (
                <a key={label} href={href} aria-label={label} style={{ width: 36, height: 36, borderRadius: 8, border: "1px solid var(--border)", background: "var(--bg-subtle)", color: "var(--text-secondary)", display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none", transition: "border-color 150ms, color 150ms, background 150ms, transform 150ms" }}
                  onMouseEnter={e => { const el = e.currentTarget; el.style.borderColor = "var(--accent)"; el.style.color = "var(--accent)"; el.style.background = "var(--accent-dim)"; el.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={e => { const el = e.currentTarget; el.style.borderColor = "var(--border)"; el.style.color = "var(--text-secondary)"; el.style.background = "var(--bg-subtle)"; el.style.transform = ""; }}>
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {sections.map(sec => (
            <div key={sec.title}>
              <h6 style={{ fontFamily: "Inter,sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 16 }}>{sec.title}</h6>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                {sec.links.map(({ l, h }) => (
                  <li key={l}>
                    <Link href={h} style={{ fontFamily: "Inter,sans-serif", fontSize: 14, color: "var(--text-secondary)", textDecoration: "none", transition: "color 150ms", display: "inline-flex", alignItems: "center", gap: 4 }}
                      onMouseEnter={e => (e.currentTarget.style.color = "var(--accent)")}
                      onMouseLeave={e => (e.currentTarget.style.color = "var(--text-secondary)")}>{l}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: "1px solid var(--border)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <p style={{ fontFamily: "Inter,sans-serif", fontSize: 13, color: "var(--text-muted)" }}>
            © {new Date().getFullYear()} AEXSOFT. Built for technical precision.
          </p>
          <div style={{ display: "flex", gap: 20 }}>
            {["Privacy Policy", "Terms of Service"].map(l => (
              <a key={l} href="#" style={{ fontFamily: "Inter,sans-serif", fontSize: 13, color: "var(--text-muted)", textDecoration: "none", transition: "color 150ms" }}
                onMouseEnter={e => (e.currentTarget.style.color = "var(--accent)")}
                onMouseLeave={e => (e.currentTarget.style.color = "var(--text-muted)")}>{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
