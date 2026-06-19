import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Coffee } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  // Hide navbar on dashboard (it has its own sidebar layout)
  const isDashboard = location.pathname.startsWith('/dashboard');

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  if (isDashboard) return null;

  const links = [
    { to: '/',        label: 'Home' },
    { to: '/menu',    label: 'Menu' },
    { to: '/about',   label: 'About' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: scrolled ? 'rgba(250,248,244,0.95)' : '#FAF8F4',
        borderBottom: scrolled ? '1px solid #DDD8CF' : '1px solid transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        transition: 'all 0.3s ease',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', height: 68, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
          <div style={{ width: 32, height: 32, background: '#1A1A1A', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Coffee size={18} color="#fff" />
          </div>
          <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 16, color: '#1A1A1A', letterSpacing: '-0.01em' }}>
            BrewManager <span style={{ fontWeight: 400 }}>Pro</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: 32 }} className="hidden-mobile">
          {links.map(l => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              style={({ isActive }) => ({
                textDecoration: 'none',
                fontSize: 14,
                fontWeight: 500,
                color: isActive ? '#1A1A1A' : '#7A7A7A',
                borderBottom: isActive ? '2px solid #1A1A1A' : '2px solid transparent',
                paddingBottom: 2,
                transition: 'color 0.2s',
              })}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        {/* Right Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Link to="/login" style={{ fontSize: 14, fontWeight: 500, color: '#4A4A4A', textDecoration: 'none', padding: '8px 16px', transition: 'color 0.2s' }}
            onMouseEnter={e => e.target.style.color = '#1A1A1A'}
            onMouseLeave={e => e.target.style.color = '#4A4A4A'}
          >
            Log In
          </Link>
          <Link to="/dashboard" className="btn-dark" style={{ padding: '10px 20px', fontSize: 13, borderRadius: 8, textDecoration: 'none' }}>
            Start Now
          </Link>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}
            className="mobile-toggle"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div style={{ background: '#FAF8F4', borderTop: '1px solid #DDD8CF', padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {links.map(l => (
            <Link key={l.to} to={l.to} onClick={() => setMobileOpen(false)}
              style={{ textDecoration: 'none', fontSize: 15, fontWeight: 500, color: '#1A1A1A', padding: '8px 0', borderBottom: '1px solid #E8E1D6' }}
            >{l.label}</Link>
          ))}
          <Link to="/login" onClick={() => setMobileOpen(false)} className="btn-outline" style={{ marginTop: 8, textAlign: 'center', textDecoration: 'none' }}>Log In</Link>
          <Link to="/dashboard" onClick={() => setMobileOpen(false)} className="btn-dark" style={{ textAlign: 'center', textDecoration: 'none' }}>Start Now</Link>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
      `}</style>
    </header>
  );
}
