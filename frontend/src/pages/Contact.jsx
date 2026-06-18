import React, { useState, useRef, useEffect } from 'react';
import { Mail, Phone, MapPin, ArrowRight, CheckCircle2 } from 'lucide-react';
import gsap from 'gsap';

export default function Contact() {
  const [form, setForm] = useState({ fullName: '', businessName: '', locations: '', message: '' });
  const [sent, setSent] = useState(false);
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.fromTo(leftRef.current,  { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.9 })
      .fromTo(rightRef.current, { x:  40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.9 }, '-=0.7');
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setTimeout(() => setSent(true), 600);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#FAF8F4', paddingTop: 68 }}>

      {/* Top label */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '16px 0', borderBottom: '1px solid #E8E1D6' }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#22C55E', animation: 'pulse 2s infinite' }} />
          <span style={{ fontSize: 12, color: '#22C55E', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Sales Team Is Online & Operational</span>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 80, alignItems: 'flex-start' }}>

        {/* ─── LEFT ──────────────────────────────────── */}
        <div ref={leftRef} style={{ opacity: 0 }}>
          <span className="section-label">Connect with Sales</span>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, color: '#1A1A1A', lineHeight: 1.2, marginBottom: 24, marginTop: 8 }}>
            Let's refine your <br />workflow.
          </h1>
          <p style={{ fontSize: 15, color: '#7A7A7A', lineHeight: 1.8, marginBottom: 48, maxWidth: 400 }}>
            Whether you're opening your first cafe or scaling to a dozen, our sales team is ready to answer operational questions and tailor BrewManager to your workflow and team.
          </p>

          {/* Contact details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {[
              { icon: <Mail size={18} />, label: 'Email Outreach', value: 'hello@brewmanager.com', sub: 'Typically replies within 1 business day' },
              { icon: <Phone size={18} />, label: 'Direct Line', value: '+1 (650) 555-0190', sub: 'Mon–Fri, 9am–6pm PST' },
              { icon: <MapPin size={18} />, label: 'Headquarters', value: '100 Roaster Ave, San Francisco CA', sub: 'Tours by appointment only' },
            ].map(item => (
              <div key={item.label} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <div style={{ width: 40, height: 40, background: '#F2EDE5', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#C8873A', flexShrink: 0, marginTop: 2 }}>
                  {item.icon}
                </div>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 700, color: '#1A1A1A', marginBottom: 3 }}>{item.label}</p>
                  <p style={{ fontSize: 14, color: '#4A4A4A', fontWeight: 500, marginBottom: 2 }}>{item.value}</p>
                  <p style={{ fontSize: 12, color: '#A0A0A0' }}>{item.sub}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Visual accent */}
          <div style={{ marginTop: 48, borderRadius: 14, overflow: 'hidden', height: 200, background: '#E8E1D6', position: 'relative' }}>
            <div style={{ width: '100%', height: '100%', background: 'url("https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80") center/cover no-repeat' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.4), transparent)' }} />
            <div style={{ position: 'absolute', bottom: 16, left: 20 }}>
              <p style={{ color: '#fff', fontWeight: 600, fontSize: 15 }}>Come visit us</p>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12 }}>San Francisco, CA</p>
            </div>
          </div>
        </div>

        {/* ─── RIGHT – Form ───────────────────────────── */}
        <div ref={rightRef} style={{ opacity: 0 }}>
          <div style={{ background: '#fff', border: '1px solid #DDD8CF', borderRadius: 16, padding: '40px 36px', boxShadow: '0 8px 32px rgba(0,0,0,0.05)' }}>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 22, fontWeight: 700, color: '#1A1A1A', marginBottom: 6 }}>Connect with Sales</h2>
            <p style={{ fontSize: 13, color: '#7A7A7A', marginBottom: 32 }}>Fill out the form below and someone from our sales team will follow up with you via email.</p>

            {sent ? (
              <div style={{ textAlign: 'center', padding: '48px 16px' }}>
                <CheckCircle2 size={48} color="#2D9A56" style={{ margin: '0 auto 20px' }} />
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 20, fontWeight: 700, color: '#1A1A1A', marginBottom: 12 }}>Message Received!</h3>
                <p style={{ fontSize: 14, color: '#7A7A7A', lineHeight: 1.7 }}>Our team will be in touch within one business day. We look forward to connecting!</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#1A1A1A', marginBottom: 6 }}>Full Name</label>
                  <input className="input-field" placeholder="Jane Doe" required value={form.fullName} onChange={e => setForm(f => ({ ...f, fullName: e.target.value }))} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#1A1A1A', marginBottom: 6 }}>Business / Brand Name</label>
                  <input className="input-field" placeholder="Artisanal Coffee Co." required value={form.businessName} onChange={e => setForm(f => ({ ...f, businessName: e.target.value }))} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#1A1A1A', marginBottom: 6 }}>Number of Locations</label>
                  <select className="input-field" value={form.locations} onChange={e => setForm(f => ({ ...f, locations: e.target.value }))}>
                    <option value="">Select range...</option>
                    <option value="1">1 location</option>
                    <option value="2-5">2–5 locations</option>
                    <option value="6-15">6–15 locations</option>
                    <option value="16+">16+ locations</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#1A1A1A', marginBottom: 6 }}>How can we help?</label>
                  <textarea
                    className="input-field"
                    style={{ minHeight: 100, resize: 'vertical' }}
                    placeholder="Tell us about your current workflow and key challenges..."
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  />
                </div>
                <button type="submit" className="btn-dark" style={{ width: '100%', justifyContent: 'center', height: 50, fontSize: 14, marginTop: 4 }}>
                  Send Message to Sales Team <ArrowRight size={16} />
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
