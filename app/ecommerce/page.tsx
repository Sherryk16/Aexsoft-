"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { 
  ShoppingCart, Package, Search, Smartphone, Coins, CreditCard,
  PenTool, Target, Rocket, Globe, BarChart3, Lock, ArrowRight,
  Truck, Store, QrCode, Wallet
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
  { icon: <Package size={22} />, title: "Inventory Management", desc: "Real-time stock tracking with automated low-stock alerts and warehouse integration." },
  { icon: <Search size={22} />, title: "SEO Optimized", desc: "Built with structured data markup for Google Shopping and better rankings." },
  { icon: <Coins size={22} />, title: "Payment Integration", desc: "Stripe, PayPal, Apple Pay, and local payment methods for global reach." },
  { icon: <Smartphone size={22} />, title: "Mobile-First Design", desc: "Lightning-fast responsive checkout that converts on any device." },
  { icon: <BarChart3 size={22} />, title: "Sales Analytics", desc: "Track revenue, conversion rates, and customer behavior in real-time." },
  { icon: <Globe size={22} />, title: "Multi-Currency", desc: "Support for multiple currencies and languages for international sales." },
];

const techStack = [
  { label: "Next.js", desc: "Frontend" },
  { label: "Shopify Plus", desc: "E-commerce" },
  { label: "Stripe", desc: "Payments" },
  { label: "Vercel", desc: "Deployment" },
  { label: "GraphQL", desc: "API" },
  { label: "Tailwind", desc: "Styling" },
];

const faq = [
  { q: "How long does it take to build an online store?", a: "Standard stores take 4-8 weeks. Custom builds with advanced features range from 8-16 weeks." },
  { q: "Can you migrate our existing store?", a: "Yes! We have experience migrating from WooCommerce, Magento, Shopify, and other platforms." },
  { q: "Do you integrate with shipping providers?", a: "Absolutely. We integrate with FedEx, UPS, DHL, and local carriers for real-time shipping rates." },
];

function Hero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { const t = setTimeout(() => setLoaded(true), 60); return () => clearTimeout(t); }, []);

  return (
    <section style={{ background: "var(--gradient-hero)", position: "relative", overflow: "hidden", padding: "100px 0" }} className="hero-noise">
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }} className="dot-grid" />
      <div className="orb" style={{ position: "absolute", top: "-15%", right: "-8%", width: 500, height: 500, background: "radial-gradient(circle, rgba(234,179,8,0.15)", animationDuration: "10s" }} />
      <div className="orb" style={{ position: "absolute", bottom: "-15%", left: "-8%", width: 400, height: 400, background: "radial-gradient(circle, rgba(250,204,21,0.1)", animationDuration: "12s", animationDelay: "-4s" }} />

      <div className="site-container" style={{ position: "relative", zIndex: 1 }}>
        <div style={{ ...fade(loaded, 0), maxWidth: 680 }}>
          <span className="label-tag" style={{ color: "#eab308" }}>E-commerce Solutions</span>
          <h1 style={{ fontFamily: "Poppins,sans-serif", fontSize: "clamp(36px,4.5vw,56px)", fontWeight: 800, color: "var(--text-primary)", letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 20 }}>
            Stores That Convert<br />
            <span style={{ background: "linear-gradient(135deg, #eab308 0%, #facc15 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              & Scale Globally
            </span>
          </h1>
          <p style={{ fontFamily: "Inter,sans-serif", fontSize: 17, color: "var(--text-secondary)", lineHeight: 1.75, marginBottom: 32, maxWidth: 520 }}>
            From boutique stores to global brands — we build high-converting e-commerce experiences with seamless checkout, inventory management, and payment processing.
          </p>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <Link href="/contact" className="btn-primary" style={{ fontSize: 15, padding: "14px 28px" }}>
              Start Your Store
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
            <Link href="#features" className="btn-secondary" style={{ fontSize: 15, padding: "14px 28px" }}>
              Learn More
            </Link>
          </div>
        </div>

        <div style={{ ...fade(loaded, 0.25), display: "flex", gap: 40, marginTop: 56, flexWrap: "wrap" }}>
          {[{ val: "30%", label: "Higher Conversions" }, { val: "2x", label: "Mobile Sales" }, { val: "50+", label: "Stores Launched" }].map(s => (
            <div key={s.label}>
              <div style={{ fontFamily: "Poppins,sans-serif", fontSize: 28, fontWeight: 800, color: "#eab308", letterSpacing: "-0.03em" }}>{s.val}</div>
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
            Everything You Need to Sell Online
          </h2>
          <p style={{ fontFamily: "Inter,sans-serif", fontSize: 15, color: "var(--text-secondary)", maxWidth: 500, margin: "0 auto" }}>
            Complete e-commerce solution from product catalog to checkout optimization.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: 24 }}>
          {features.map((f, i) => (
            <div key={f.title} className="card" style={{ ...fade(v, i * 0.08), padding: 28 }}>
              <div style={{ width: 52, height: 52, borderRadius: 12, background: "rgba(234,179,8,0.1)", border: "1px solid rgba(234,179,8,0.2)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20, color: "#eab308" }}>
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
    <section ref={ref} style={{ background: "var(--gradient-ecom)", padding: "96px 0", position: "relative", overflow: "hidden" }}>
      <div className="orb" style={{ position: "absolute", top: "-20%", right: "-10%", width: 400, height: 400, background: "radial-gradient(circle, rgba(234,179,8,0.15)" }} />
      <div className="site-container" style={{ position: "relative", zIndex: 1 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
          <div style={fade(v, 0)}>
            <span className="label-tag" style={{ color: "#eab308" }}>Technologies</span>
            <h2 style={{ fontFamily: "Poppins,sans-serif", fontSize: "clamp(26px,3vw,40px)", fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.02em", marginBottom: 16 }}>
              Built with<br /><span style={{ color: "#eab308" }}>Conversion in Mind</span>
            </h2>
            <p style={{ fontFamily: "Inter,sans-serif", fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: 24 }}>
              We use the best e-commerce technologies optimized for higher conversion rates and better customer experience.
            </p>
            <Link href="/contact" className="btn-primary" style={{ background: "#eab308", fontSize: 14, padding: "12px 24px" }}>
              Build Your Store →
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
            Ready to Launch Your Store?
          </h2>
          <p style={{ fontFamily: "Inter,sans-serif", fontSize: 16, color: "rgba(255,255,255,0.75)", lineHeight: 1.7, marginBottom: 36, maxWidth: 480, margin: "0 auto 36px" }}>
            Let's build an e-commerce store that drives sales.
          </p>
          <Link href="/contact" className="btn-primary" style={{ background: "#fff", color: "var(--accent-dark)", fontSize: 15, padding: "16px 32px" }}>
            Get Started →
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function EcommercePage() {
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