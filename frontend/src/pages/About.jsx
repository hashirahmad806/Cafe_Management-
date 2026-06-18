import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Zap, Target, Gem, Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const PRINCIPLES = [
  { icon: <Zap size={20} />, title: 'Speed', desc: 'Every second counts in a busy cafe. Our system is architected for sub-50ms response times, even during peak brunch rush.' },
  { icon: <Target size={20} />, title: 'Precision', desc: 'From complex modification orders to sophisticated allergy flags, we keep every detail perfectly synchronized across all stations.' },
  { icon: <Gem size={20} />, title: 'Craft', desc: 'We obsess over the craft of hospitality. The technology quietly supports the human moments that make a great cafe experience.' },
];

const TESTIMONIALS = [
  { name: 'Maya Chen', role: 'Owner, Ritual Coffee', text: 'BrewManager transformed our operations. Table turn increased 28% in the first month alone.', rating: 5 },
  { name: 'James Okafor', role: 'GM, Stumptown Roasters', text: 'Finally, a product that truly understands the chaos and complexity of running a modern cafe.', rating: 5 },
  { name: 'Leila Moradi', role: 'Operations, Blue Bottle', text: 'The kitchen display and QR ordering system alone paid for itself within two weeks of launch.', rating: 5 },
];

export default function About() {
  const heroRef = useRef(null);
  const principlesRef = useRef(null);
  const storyRef = useRef(null);
  const testimonialsRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(heroRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
    );

    gsap.fromTo('.principle-card',
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, stagger: 0.15, ease: 'power2.out',
        scrollTrigger: { trigger: principlesRef.current, start: 'top 80%' } }
    );

    gsap.fromTo(storyRef.current,
      { x: -40, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: storyRef.current, start: 'top 80%' } }
    );

    gsap.fromTo('.testimonial-card',
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, stagger: 0.12,
        scrollTrigger: { trigger: testimonialsRef.current, start: 'top 80%' } }
    );

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <div style={{ background: '#FAF8F4', paddingTop: 68 }}>

      {/* ─── HERO ─────────────────────────────────────────── */}
      <section style={{ padding: '80px 24px 0', textAlign: 'center' }}>
        <div ref={heroRef} style={{ maxWidth: 720, margin: '0 auto', opacity: 0, marginBottom: 48 }}>
          <span className="section-label">Our Story</span>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 700, color: '#1A1A1A', marginBottom: 20 }}>
            Crafting the Future of Hospitality
          </h1>
          <p style={{ fontSize: 16, color: '#7A7A7A', lineHeight: 1.8, maxWidth: 600, margin: '0 auto' }}>
            Founded by a team of baristas and engineers, we build systems that balance the rigorousness of technology with the humanity of a truly great cafe experience.
          </p>
        </div>

        {/* Large cafe image placeholder */}
        <div style={{ maxWidth: 1000, margin: '0 auto', borderRadius: 20, overflow: 'hidden', position: 'relative', height: 420, background: '#E8E1D6' }}>
          <div style={{
            width: '100%', height: '100%',
            background: 'linear-gradient(145deg, #D4C4AA 0%, #B8A890 40%, #9A8870 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            position: 'relative',
          }}>
            {/* Simulated cafe scene */}
            <div style={{ position: 'absolute', inset: 0, background: 'url("https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1000&q=80") center/cover no-repeat' }} />
            <div style={{ position: 'absolute', bottom: 20, left: 28, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', padding: '8px 16px', borderRadius: 8 }}>
              <p style={{ color: '#fff', fontSize: 13, fontWeight: 500 }}>Designed in the environment it's meant to serve.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CORE PRINCIPLES ────────────────────────────────── */}
      <section ref={principlesRef} style={{ padding: '96px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <span className="section-label">Our Core Principles</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 28 }}>
            {PRINCIPLES.map((p, i) => (
              <div key={i} className="principle-card" style={{ opacity: 0, padding: '32px 28px', border: '1px solid #DDD8CF', borderRadius: 14, background: '#fff' }}>
                <div style={{ width: 40, height: 40, background: '#F2EDE5', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#C8873A', marginBottom: 18 }}>
                  {p.icon}
                </div>
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 20, fontWeight: 700, color: '#1A1A1A', marginBottom: 12 }}>{p.title}</h3>
                <p style={{ fontSize: 14, color: '#7A7A7A', lineHeight: 1.75 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── STORY + STAT ───────────────────────────────────── */}
      <section style={{ background: '#fff', padding: '96px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 64, alignItems: 'center' }}>

          <div ref={storyRef} style={{ opacity: 0 }}>
            <span className="section-label">Born Behind the Bar</span>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 700, color: '#1A1A1A', marginTop: 8, marginBottom: 20 }}>
              Born Behind the Bar
            </h2>
            <p style={{ fontSize: 15, color: '#4A4A4A', lineHeight: 1.8, marginBottom: 16 }}>
              BrewManager wasn't designed in a boardroom — it was sketched on the backs of order tickets by the same people who spent years behind the bar, running coffee shifts, navigating kitchen chaos.
            </p>
            <p style={{ fontSize: 15, color: '#7A7A7A', lineHeight: 1.8 }}>
              By bridging the gap between reality cafe operations and scalable SaaS architecture, we've built the tool we always wished we had.
            </p>
          </div>

          <div style={{ textAlign: 'center' }}>
            <p className="stat-num" style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)', color: '#C8873A' }}>2.4m+</p>
            <p style={{ fontSize: 15, color: '#7A7A7A', marginTop: 8 }}>Orders processed monthly</p>
          </div>

        </div>
      </section>

      {/* ─── TESTIMONIALS ───────────────────────────────────── */}
      <section ref={testimonialsRef} style={{ background: '#FAF8F4', padding: '96px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <span className="section-label">Voices from the Counter</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="testimonial-card card" style={{ opacity: 0 }}>
                <div style={{ display: 'flex', gap: 3, marginBottom: 16 }}>
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} size={14} fill="#C8873A" color="#C8873A" />
                  ))}
                </div>
                <p style={{ fontSize: 14, color: '#4A4A4A', lineHeight: 1.75, marginBottom: 20, fontStyle: 'italic' }}>"{t.text}"</p>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 700, color: '#1A1A1A' }}>{t.name}</p>
                  <p style={{ fontSize: 12, color: '#7A7A7A', marginTop: 3 }}>{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
