import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, QrCode, Monitor, BarChart3, Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const TRUSTED = ['Onyx', 'Intelligentsia', 'Stumptown', 'Blue Bottle'];

const FEATURES = [
  {
    icon: <QrCode size={24} />,
    title: 'Instant QR Ordering',
    desc: 'Let customers scan and order directly from their seats — instantly syncing with the kitchen display and inventory system.',
  },
  {
    icon: <Monitor size={24} />,
    title: 'Smart Kitchen Display',
    desc: 'Real-time order routing to the right stations with predictive timing to keep the kitchen and bar operating smoothly.',
  },
  {
    icon: <BarChart3 size={24} />,
    title: 'Predictive Analytics',
    desc: 'Track real-time sales, monitor table turnover rates, and make data-driven financial decisions automatically.',
  },
];

const STATS = [
  { value: '22%', label: 'Average Table Turnover Increase' },
  { value: '-14min', label: 'Average Kitchen Wait Reduction' },
  { value: 'Zero', label: 'Lost Paper Tickets', sub: 'Guaranteed' },
];

export default function Home() {
  const heroRef = useRef(null);
  const headlineRef = useRef(null);
  const subRef = useRef(null);
  const ctaRef = useRef(null);
  const mockupRef = useRef(null);
  const featuresRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    // Hero entrance
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.fromTo(headlineRef.current, { y: 48, opacity: 0 }, { y: 0, opacity: 1, duration: 1 })
      .fromTo(subRef.current,     { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, '-=0.6')
      .fromTo(ctaRef.current,     { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, '-=0.5')
      .fromTo(mockupRef.current,  { x: 40, opacity: 0 }, { x: 0, opacity: 1, duration: 1 }, '-=0.8');

    // Feature cards scroll reveal
    gsap.fromTo('.feature-card',
      { y: 50, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.7, stagger: 0.15,
        scrollTrigger: { trigger: featuresRef.current, start: 'top 80%' },
      }
    );

    // Stats reveal
    gsap.fromTo('.stat-item',
      { scale: 0.85, opacity: 0 },
      {
        scale: 1, opacity: 1, duration: 0.6, stagger: 0.12,
        scrollTrigger: { trigger: statsRef.current, start: 'top 85%' },
      }
    );

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <div style={{ background: '#FAF8F4' }}>

      {/* ─── HERO ─────────────────────────────────────────── */}
      <section ref={heroRef} style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        paddingTop: 100,
        paddingBottom: 80,
        background: 'linear-gradient(135deg, #FAF8F4 60%, #F0EDE6 100%)',
        overflow: 'hidden',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', width: '100%', display: 'flex', alignItems: 'center', gap: 60, flexWrap: 'wrap' }}>

          {/* Left */}
          <div style={{ flex: '1 1 440px', maxWidth: 560 }}>
            <div ref={headlineRef} style={{ opacity: 0 }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 12px', background: '#fff', border: '1px solid #DDD8CF', borderRadius: 999, marginBottom: 24 }}>
                <Star size={12} fill="#C8873A" color="#C8873A" />
                <span style={{ fontSize: 12, fontWeight: 600, color: '#7A7A7A', letterSpacing: '0.05em' }}>NEXT GEN CAFE OS</span>
              </div>
              <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2.4rem, 5vw, 3.8rem)', fontWeight: 700, color: '#1A1A1A', lineHeight: 1.12, marginBottom: 24 }}>
                Turn Chaos Into Craft. <br />
                The Operating System <br />
                for <em style={{ fontStyle: 'italic', color: '#C8873A' }}>Modern Cafes.</em>
              </h1>
            </div>

            <p ref={subRef} style={{ opacity: 0, fontSize: 16, color: '#4A4A4A', lineHeight: 1.75, marginBottom: 36, maxWidth: 460 }}>
              Ditch the paper tickets and clunky legacy POS. Sync your digital table menus, kitchen display systems, and automated inventory in one unified, beautiful dashboard.
            </p>

            <div ref={ctaRef} style={{ opacity: 0, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap', marginBottom: 48 }}>
              <Link to="/dashboard" className="btn-dark" style={{ textDecoration: 'none', padding: '14px 28px', fontSize: 15 }}>
                Start Free
              </Link>
              <Link to="/about" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 14, fontWeight: 600, color: '#4A4A4A', textDecoration: 'none' }}>
                <span>Watch demo</span>
                <ArrowRight size={16} />
              </Link>
            </div>

            {/* Trusted by */}
            <div>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#B0A898', marginBottom: 14 }}>
                Trusted by 2,000+ independent roasters
              </p>
              <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap' }}>
                {TRUSTED.map(name => (
                  <span key={name} style={{ fontSize: 13, fontWeight: 600, color: '#A0A0A0', letterSpacing: '0.04em' }}>{name}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Right – mock dashboard UI */}
          <div ref={mockupRef} style={{ opacity: 0, flex: '1 1 340px', maxWidth: 480, position: 'relative' }}>
            <div style={{ background: '#1A1A1A', borderRadius: 16, padding: '20px', boxShadow: '0 32px 80px rgba(0,0,0,0.18)', position: 'relative', zIndex: 1 }}>
              {/* Fake top bar */}
              <div style={{ display: 'flex', gap: 6, marginBottom: 16 }}>
                {['#FF5F57','#FFBD2E','#28C840'].map(c => (
                  <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />
                ))}
              </div>
              {/* Fake chart area */}
              <div style={{ background: '#232323', borderRadius: 10, padding: 16, marginBottom: 12 }}>
                <p style={{ color: '#666', fontSize: 10, marginBottom: 10 }}>Today's Revenue</p>
                <p style={{ color: '#fff', fontWeight: 700, fontSize: 22, fontFamily: 'Playfair Display, serif' }}>$1,240.50</p>
                <div style={{ display: 'flex', gap: 4, marginTop: 14, alignItems: 'flex-end', height: 48 }}>
                  {[30,60,40,80,55,90,70,100,65,85,75,95].map((h,i) => (
                    <div key={i} style={{ flex: 1, height: `${h}%`, background: i === 11 ? '#C8873A' : '#3A3A3A', borderRadius: 3, transition: 'height 0.3s' }} />
                  ))}
                </div>
              </div>
              {/* Fake order list */}
              {['Oat Milk Latte — $4.50','Avocado Toast — $8.00','Iced Americano — $3.50'].map((item, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: i < 2 ? '1px solid #2A2A2A' : 'none' }}>
                  <span style={{ color: '#DDD', fontSize: 12 }}>{item.split(' — ')[0]}</span>
                  <span style={{ color: '#C8873A', fontWeight: 600, fontSize: 12 }}>{item.split(' — ')[1]}</span>
                </div>
              ))}
            </div>

            {/* Floating badge */}
            <div style={{ position: 'absolute', top: -16, right: -16, background: '#fff', border: '1px solid #DDD8CF', borderRadius: 12, padding: '10px 14px', boxShadow: '0 8px 24px rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#22C55E', animation: 'pulse 2s infinite' }} />
              <span style={{ fontSize: 12, fontWeight: 600, color: '#1A1A1A' }}>12 Active Orders</span>
            </div>
          </div>

        </div>
      </section>

      {/* ─── FEATURES ───────────────────────────────────────── */}
      <section ref={featuresRef} style={{ background: '#fff', padding: '96px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 700, color: '#1A1A1A', marginBottom: 16 }}>
              Everything you need to run a modern cafe
            </h2>
            <p style={{ fontSize: 16, color: '#7A7A7A', maxWidth: 520, margin: '0 auto', lineHeight: 1.7 }}>
              Our suite of tools is designed specifically for independent roasters and busy cafes.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
            {FEATURES.map((f, i) => (
              <div key={i} className="feature-card card" style={{ opacity: 0 }}>
                <div style={{ width: 48, height: 48, background: '#F2EDE5', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#C8873A', marginBottom: 20 }}>
                  {f.icon}
                </div>
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 18, fontWeight: 700, color: '#1A1A1A', marginBottom: 10 }}>{f.title}</h3>
                <p style={{ fontSize: 14, color: '#7A7A7A', lineHeight: 1.7 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── STATS ──────────────────────────────────────────── */}
      <section ref={statsRef} style={{ background: '#1A1A1A', padding: '72px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 40 }}>
          {STATS.map((s, i) => (
            <div key={i} className="stat-item" style={{ opacity: 0, textAlign: 'center' }}>
              <p className="stat-num" style={{ color: '#fff', marginBottom: 8 }}>{s.value}</p>
              <p style={{ fontSize: 13, color: '#888', fontWeight: 500, lineHeight: 1.5 }}>{s.label}</p>
              {s.sub && <p style={{ fontSize: 11, color: '#C8873A', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: 4 }}>{s.sub}</p>}
            </div>
          ))}
        </div>
      </section>

      {/* ─── CTA BOTTOM ─────────────────────────────────────── */}
      <section style={{ background: '#FAF8F4', padding: '96px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', fontWeight: 700, color: '#1A1A1A', marginBottom: 16 }}>
            Ready to brew a smarter business model?
          </h2>
          <p style={{ fontSize: 15, color: '#7A7A7A', marginBottom: 36, lineHeight: 1.7 }}>
            Join 2,000+ independent roasters on the modern cafe OS.
          </p>
          <form onSubmit={e => e.preventDefault()} style={{ display: 'flex', gap: 12, maxWidth: 460, margin: '0 auto', flexWrap: 'wrap', justifyContent: 'center' }}>
            <input type="email" placeholder="Enter your email" className="input-field" style={{ flex: '1 1 240px', height: 48 }} />
            <button type="submit" className="btn-dark" style={{ height: 48, whiteSpace: 'nowrap' }}>
              Get Started Free
              <ArrowRight size={15} />
            </button>
          </form>
          <p style={{ fontSize: 12, color: '#B0A898', marginTop: 16 }}>No credit card required. 14-day free trial.</p>
        </div>
      </section>

    </div>
  );
}
