import React, { useState, useEffect, useRef } from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Minus, Plus, Trash2, CheckCircle2, FileText, CreditCard, Landmark, ChefHat } from 'lucide-react';
import gsap from 'gsap';

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, clearCart, cartTotal } = useCart();
  const [payMethod, setPayMethod] = useState('counter'); // 'counter' | 'now'
  const [notes, setNotes] = useState('');
  const [placing, setPlacing] = useState(false);
  const [placed, setPlaced] = useState(false);
  const navigate = useNavigate();
  const cardRef = useRef(null);
  const successRef = useRef(null);

  const tax = cartTotal * 0.08;
  const total = cartTotal + tax;

  useEffect(() => {
    gsap.fromTo(cardRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' });
  }, []);

  const handlePlace = () => {
    setPlacing(true);
    const orderData = {
      items: cart.map(i => ({ name: i.name, quantity: i.quantity, menuItem: i._id })),
      totalAmount: total,
      specialNotes: notes,
      paymentMethod: payMethod,
    };

    fetch('http://localhost:5000/api/orders', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(orderData)
    }).catch(() => {}).finally(() => {
      setTimeout(() => {
        setPlacing(false);
        setPlaced(true);
        clearCart();
        gsap.fromTo(successRef.current, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.7)' });
      }, 1000);
    });
  };

  if (placed) return (
    <div style={{ minHeight: '100vh', background: '#FAF8F4', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, paddingTop: 100 }}>
      <div ref={successRef} style={{ background: '#fff', border: '1px solid #DDD8CF', borderRadius: 20, padding: '48px 40px', maxWidth: 400, width: '100%', textAlign: 'center', boxShadow: '0 16px 48px rgba(0,0,0,0.08)' }}>
        <div style={{ width: 64, height: 64, background: '#DCFCE7', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
          <CheckCircle2 size={32} color="#2D9A56" />
        </div>
        <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 26, fontWeight: 700, color: '#1A1A1A', marginBottom: 12 }}>Order Sent to Kitchen!</h2>
        <p style={{ fontSize: 14, color: '#7A7A7A', lineHeight: 1.7, marginBottom: 32 }}>
          Your order is being prepared. We'll bring it right to your table shortly.
        </p>
        <Link to="/menu" style={{ display: 'block', textDecoration: 'none' }}>
          <button className="btn-dark" style={{ width: '100%', justifyContent: 'center', height: 48 }}>Order More</button>
        </Link>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: '#FAF8F4', paddingTop: 88, paddingBottom: 48, display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: 480, padding: '0 16px' }}>

        {/* Header */}
        <div ref={cardRef} style={{ opacity: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Link to="/menu" style={{ color: '#7A7A7A', display: 'flex', alignItems: 'center', gap: 4, fontSize: 14, textDecoration: 'none' }}>
                  <ArrowLeft size={16} /> 
                </Link>
                <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 22, fontWeight: 700, color: '#1A1A1A' }}>Artisanal Brew</h1>
              </div>
            </div>
            <div style={{ background: '#F2EDE5', padding: '6px 14px', borderRadius: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: 12, color: '#7A7A7A' }}>Table</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#1A1A1A' }}>93</span>
            </div>
          </div>

          <p style={{ fontSize: 13, fontWeight: 700, color: '#1A1A1A', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 16 }}>Your Order</p>

          {/* Empty state */}
          {cart.length === 0 && (
            <div style={{ textAlign: 'center', padding: '64px 24px', background: '#fff', borderRadius: 14, border: '1px solid #E8E1D6', marginBottom: 20 }}>
              <ChefHat size={40} color="#DDD8CF" style={{ margin: '0 auto 16px' }} />
              <p style={{ color: '#7A7A7A', marginBottom: 20 }}>Your order is empty</p>
              <Link to="/menu" className="btn-outline" style={{ textDecoration: 'none', display: 'inline-flex' }}>Browse Menu</Link>
            </div>
          )}

          {/* Cart Items */}
          {cart.map((item, i) => (
            <div key={item._id} style={{
              background: '#fff', border: '1px solid #E8E1D6', borderRadius: 12,
              padding: '16px 18px', marginBottom: 10,
              display: 'flex', alignItems: 'center', gap: 14,
            }}>
              {/* Item image placeholder */}
              <div style={{ width: 52, height: 52, borderRadius: 10, background: 'linear-gradient(135deg, #E8E1D6, #D4C4AA)', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>
                ☕
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: 14, fontWeight: 600, color: '#1A1A1A', marginBottom: 3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.name}</p>
                <p style={{ fontSize: 12, color: '#7A7A7A', marginBottom: 10, textTransform: 'capitalize' }}>{item.category || 'Special'}</p>

                {/* Quantity controls */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <button onClick={() => updateQuantity(item._id, -1)}
                    style={{ width: 28, height: 28, borderRadius: '50%', border: '1.5px solid #DDD8CF', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4A4A4A', transition: 'border-color 0.15s' }}>
                    <Minus size={12} />
                  </button>
                  <span style={{ fontSize: 14, fontWeight: 600, color: '#1A1A1A', minWidth: 20, textAlign: 'center' }}>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item._id, 1)}
                    style={{ width: 28, height: 28, borderRadius: '50%', border: '1.5px solid #DDD8CF', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4A4A4A', transition: 'border-color 0.15s' }}>
                    <Plus size={12} />
                  </button>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 12 }}>
                <p style={{ fontSize: 15, fontWeight: 700, color: '#1A1A1A' }}>${(item.price * item.quantity).toFixed(2)}</p>
                <button onClick={() => removeFromCart(item._id)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#C8C8C8', transition: 'color 0.15s', display: 'flex' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#D94040'}
                  onMouseLeave={e => e.currentTarget.style.color = '#C8C8C8'}>
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}

          {cart.length > 0 && (
            <>
              {/* Special Notes */}
              <div style={{ background: '#fff', border: '1px solid #E8E1D6', borderRadius: 12, padding: '16px 18px', marginBottom: 10, marginTop: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                  <FileText size={15} color="#7A7A7A" />
                  <p style={{ fontSize: 13, fontWeight: 600, color: '#4A4A4A' }}>Special Notes</p>
                </div>
                <textarea
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  placeholder="Special notes for the barista/chef (e.g., allergies, extra hot)"
                  style={{ width: '100%', border: '1.5px solid #E8E1D6', borderRadius: 8, padding: '10px 14px', fontSize: 13, color: '#4A4A4A', resize: 'none', outline: 'none', fontFamily: 'Inter, sans-serif', minHeight: 72, background: '#FAFAF9' }}
                  onFocus={e => e.target.style.borderColor = '#1A1A1A'}
                  onBlur={e => e.target.style.borderColor = '#E8E1D6'}
                />
              </div>

              {/* Payment Method */}
              <div style={{ background: '#fff', border: '1px solid #E8E1D6', borderRadius: 12, padding: '16px 18px', marginBottom: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                  <CreditCard size={15} color="#7A7A7A" />
                  <p style={{ fontSize: 13, fontWeight: 600, color: '#4A4A4A' }}>Payment Method</p>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  {[
                    { id: 'counter', icon: <Landmark size={15} />, label: 'Pay at Counter' },
                    { id: 'now',     icon: <CreditCard size={15} />, label: 'Pay Now' },
                  ].map(p => (
                    <button key={p.id} onClick={() => setPayMethod(p.id)}
                      style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
                        padding: '11px', borderRadius: 8, cursor: 'pointer', fontSize: 13, fontWeight: 500,
                        transition: 'all 0.2s',
                        background: payMethod === p.id ? '#1A1A1A' : '#F8F6F2',
                        color: payMethod === p.id ? '#fff' : '#4A4A4A',
                        border: payMethod === p.id ? '1.5px solid #1A1A1A' : '1.5px solid #DDD8CF',
                      }}>
                      {p.icon} {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Totals */}
              <div style={{ background: '#fff', border: '1px solid #E8E1D6', borderRadius: 12, padding: '20px 18px', marginBottom: 24 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                  <span style={{ fontSize: 14, color: '#7A7A7A' }}>Subtotal</span>
                  <span style={{ fontSize: 14, color: '#4A4A4A', fontWeight: 500 }}>${cartTotal.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 14, borderBottom: '1px solid #F0EDE8', marginBottom: 14 }}>
                  <span style={{ fontSize: 14, color: '#7A7A7A' }}>Tax (8%)</span>
                  <span style={{ fontSize: 14, color: '#4A4A4A', fontWeight: 500 }}>${tax.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 16, fontWeight: 700, color: '#1A1A1A' }}>Total</span>
                  <span style={{ fontFamily: 'Playfair Display, serif', fontSize: 20, fontWeight: 700, color: '#C8873A' }}>${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Place Order Button */}
              <button
                onClick={handlePlace}
                disabled={placing}
                style={{
                  width: '100%', height: 56, borderRadius: 12, border: 'none',
                  background: placing ? '#888' : '#1A1A1A', color: '#fff',
                  fontSize: 15, fontWeight: 700, cursor: placing ? 'not-allowed' : 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '0 24px', transition: 'background 0.2s',
                }}>
                <span>{placing ? 'Sending to Kitchen...' : 'Place Order & Send to Kitchen'}</span>
                <span style={{ fontFamily: 'Playfair Display, serif', fontSize: 16, fontWeight: 700, color: '#C8873A' }}>${total.toFixed(2)}</span>
              </button>
            </>
          )}
        </div>

      </div>
    </div>
  );
}
