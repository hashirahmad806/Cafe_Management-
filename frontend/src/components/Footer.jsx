import React from 'react';
import { Link } from 'react-router-dom';
import { Coffee } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{ background: '#1A1A1A', color: '#fff', padding: '56px 24px 32px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 40, marginBottom: 48 }}>

          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <div style={{ width: 32, height: 32, background: '#fff', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Coffee size={18} color="#1A1A1A" />
              </div>
              <span style={{ fontWeight: 700, fontSize: 16 }}>BrewManager <span style={{ fontWeight: 400 }}>Pro</span></span>
            </div>
            <p style={{ fontSize: 13, color: '#A0A0A0', lineHeight: 1.7, maxWidth: 220 }}>
              The operating system for modern cafes. Built to streamline, scale, and serve.
            </p>
          </div>

          {/* Product */}
          <div>
            <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#666', marginBottom: 16 }}>Product</p>
            {['Features', 'Pricing', 'Changelog', 'Roadmap'].map(l => (
              <div key={l} style={{ marginBottom: 10 }}>
                <Link to="/" style={{ color: '#A0A0A0', textDecoration: 'none', fontSize: 14, transition: 'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color = '#fff'}
                  onMouseLeave={e => e.target.style.color = '#A0A0A0'}
                >{l}</Link>
              </div>
            ))}
          </div>

          {/* Company */}
          <div>
            <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#666', marginBottom: 16 }}>Company</p>
            {['About Us', 'Blog', 'Careers', 'Press'].map(l => (
              <div key={l} style={{ marginBottom: 10 }}>
                <Link to="/about" style={{ color: '#A0A0A0', textDecoration: 'none', fontSize: 14, transition: 'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color = '#fff'}
                  onMouseLeave={e => e.target.style.color = '#A0A0A0'}
                >{l}</Link>
              </div>
            ))}
          </div>

          {/* Support */}
          <div>
            <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#666', marginBottom: 16 }}>Support</p>
            {['Documentation', 'Help Center', 'Contact', 'Status'].map(l => (
              <div key={l} style={{ marginBottom: 10 }}>
                <Link to="/contact" style={{ color: '#A0A0A0', textDecoration: 'none', fontSize: 14, transition: 'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color = '#fff'}
                  onMouseLeave={e => e.target.style.color = '#A0A0A0'}
                >{l}</Link>
              </div>
            ))}
          </div>

        </div>

        {/* Bottom Bar */}
        <div style={{ borderTop: '1px solid #2A2A2A', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <p style={{ fontSize: 13, color: '#666' }}>© {new Date().getFullYear()} BrewManager Pro. All rights reserved.</p>
          <div style={{ display: 'flex', gap: 24 }}>
            {['Privacy Policy', 'Terms of Service', 'Cookie Settings'].map(l => (
              <Link key={l} to="/" style={{ fontSize: 12, color: '#666', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => e.target.style.color = '#fff'}
                onMouseLeave={e => e.target.style.color = '#666'}
              >{l}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
