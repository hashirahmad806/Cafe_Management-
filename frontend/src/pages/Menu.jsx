import React, { useState, useEffect, useRef } from 'react';
import { useCart } from '../context/CartContext';
import { ShoppingBag, Check, Plus, Search, Droplets, Coffee, Sandwich, Cake } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { API_URL } from '../config';

gsap.registerPlugin(ScrollTrigger);

/* ─── MENU DATA ─────────────────────────────────────────────────────── */
const MENU_ITEMS = [
    /* DRINKS */
    {
        _id: 'd1',
        name: 'Espresso',
        price: 250,
        category: 'Drinks',
        tag: 'House Classic',
        description: 'A rich, full-bodied single shot pulled from our signature dark-roast blend. Bold, intense, and perfectly extracted.',
        image: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=500&q=85',
    },
    {
        _id: 'd2',
        name: 'Cappuccino',
        price: 350,
        category: 'Drinks',
        tag: 'Bestseller',
        description: 'A velvety double espresso crowned with equal parts steamed and frothed milk. Silky and perfectly balanced.',
        image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=500&q=85',
    },
    {
        _id: 'd3',
        name: 'Latte',
        price: 400,
        category: 'Drinks',
        tag: 'Most Loved',
        description: 'Smooth espresso blended with a generous pour of velvety steamed milk, topped with a delicate latte art rosetta.',
        image: 'https://images.unsplash.com/photo-1561882468-9110d70d0283?w=500&q=85',
    },
    {
        _id: 'd4',
        name: 'Americano',
        price: 300,
        category: 'Drinks',
        tag: '',
        description: 'Double shots of espresso diluted with hot water to create a smooth, bold coffee experience without bitterness.',
        image: 'https://images.unsplash.com/photo-1551030173-122aabc4489c?w=500&q=85',
    },
    {
        _id: 'd5',
        name: 'Fresh Juice',
        price: 350,
        category: 'Drinks',
        tag: 'Seasonal',
        description: 'Cold-pressed daily from a rotating selection of fresh seasonal fruits. Ask your server for today\'s blend.',
        image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=500&q=85',
    },
    {
        _id: 'd6',
        name: 'Mineral Water',
        price: 100,
        category: 'Drinks',
        tag: '',
        description: 'Chilled still or sparkling mineral water sourced from natural springs. Pure, crisp, and refreshing.',
        image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=500&q=85',
    },

    /* FOOD */
    {
        _id: 'f1',
        name: 'Club Sandwich',
        price: 550,
        category: 'Food',
        tag: 'Chef\'s Pick',
        description: 'Triple-decker toasted bread layered with grilled chicken, crispy bacon, fresh lettuce, tomato, and house mayo.',
        image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=500&q=85',
    },
    {
        _id: 'f2',
        name: 'Chicken Burger',
        price: 650,
        category: 'Food',
        tag: 'Bestseller',
        description: 'Juicy grilled chicken breast in a brioche bun with house sauce, pickled onions, cheddar and fresh greens.',
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=85',
    },
    {
        _id: 'f3',
        name: 'French Fries',
        price: 300,
        category: 'Food',
        tag: '',
        description: 'Golden, hand-cut potato fries fried twice for maximum crunch. Served with our signature seasoning and dip.',
        image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500&q=85',
    },
    {
        _id: 'f4',
        name: 'Chocolate Brownie',
        price: 250,
        category: 'Food',
        tag: 'Must Try',
        description: 'Fudgy, warm dark-chocolate brownie baked fresh daily. Dense, decadent, and served with vanilla cream.',
        image: 'https://images.unsplash.com/photo-1564355808539-22fda35bed7e?w=500&q=85',
    },

    /* CAKE */
    {
        _id: 'c1',
        name: 'Chocolate Truffle Cake',
        price: 450,
        category: 'Cake',
        tag: 'Chef\'s Pick',
        description: 'Decadent triple-layer dark chocolate cake with silky ganache and chocolate truffles. Rich, indulgent, and irresistible.',
        image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&q=85',
    },
    {
        _id: 'c2',
        name: 'Cheesecake',
        price: 400,
        category: 'Cake',
        tag: 'Bestseller',
        description: 'Creamy New York-style cheesecake with a buttery graham cracker crust and berry compote topping. Smooth and satisfying.',
        image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=500&q=85',
    },
];

const CATS = [
        { id: 'all', label: 'Full Menu', icon: null },
        {
            id: 'Drinks',
            label: 'Drinks',
            icon: < Coffee size = { 14 }
            /> }, {
                id: 'Food',
                label: 'Food',
                icon: < Sandwich size = { 14 }
                /> }, {
                    id: 'Cake',
                    label: 'Cake',
                    icon: < Cake size = { 14 }
                    /> },
                ];

                /* ─── COMPONENT ─────────────────────────────────────────────────────── */
                export default function Menu() {
                    const cart = useCart();
                    const [menuItems, setMenuItems] = useState([]);
                    const [loading, setLoading] = useState(true);
                    const [cat, setCat] = useState('all');
                    const [search, setSearch] = useState('');
                    const [added, setAdded] = useState({});
                    const headerRef = useRef(null);
                    const gridRef = useRef(null);

                    useEffect(() => {
                        fetch(`${API_URL}/menu`)
                            .then(res => res.json())
                            .then(data => {
                                setMenuItems(data);
                                setLoading(false);
                            })
                            .catch(err => {
                                console.error('Error fetching menu:', err);
                                setLoading(false);
                            });
                    }, []);

                    useEffect(() => {
                        // Header entrance
                        if (!loading) {
                            gsap.fromTo(headerRef.current, { y: 32, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' });
                        }
                    }, [loading]);

                    // Re-animate cards whenever filter changes
                    useEffect(() => {
                        if (!loading) {
                            gsap.fromTo('.menu-card', { y: 28, opacity: 0, scale: 0.97 }, { y: 0, opacity: 1, scale: 1, duration: 0.55, stagger: 0.07, ease: 'power2.out' });
                        }
                    }, [cat, search, loading]);

                    const filtered = menuItems.filter(i =>
                        (cat === 'all' || i.category === cat) &&
                        i.name.toLowerCase().includes(search.toLowerCase())
                    );

                    const handleAdd = (item) => {
                        cart.addToCart(item);
                        setAdded(p => ({...p, [item._id]: true }));
                        setTimeout(() => setAdded(p => ({...p, [item._id]: false })), 1500);
                    };

                    /* format price (PKR / local) */
                    const fmt = (p) => `Rs. ${p.toLocaleString()}`;

                    if (loading) {
                        return (
                            <div style={{ minHeight: '100vh', background: '#FAF8F4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <p style={{ fontFamily: 'Playfair Display, serif', fontSize: 24, color: '#1A1A1A' }}>Loading Menu...</p>
                            </div>
                        );
                    }

                    return ( <
                        div style = {
                            { background: '#FAF8F4', minHeight: '100vh', paddingTop: 88, paddingBottom: 80 } } >
                        <
                        div style = {
                            { maxWidth: 1280, margin: '0 auto', padding: '0 24px' } } >

                        { /* ─── HEADER ─── */ } <
                        div ref = { headerRef }
                        style = {
                            { opacity: 0, textAlign: 'center', padding: '48px 0 40px' } } >
                        <
                        span style = {
                            { fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#C8873A' } } >
                        Artisanal Selection <
                        /span> <
                        h1 style = {
                            {
                                fontFamily: 'Playfair Display, serif',
                                fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)',
                                fontWeight: 700,
                                color: '#1A1A1A',
                                marginTop: 10,
                                marginBottom: 14,
                            }
                        } >
                        Our Menu <
                        /h1> <
                        p style = {
                            { fontSize: 15, color: '#7A7A7A', maxWidth: 520, margin: '0 auto', lineHeight: 1.75 } } >
                        Every item crafted with care— from single - origin espresso pulls to freshly pressed juices and house - made kitchen classics. <
                        /p> <
                        /div>

                        { /* ─── CONTROLS BAR ─── */ } <
                        div style = {
                            { display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16, marginBottom: 36 } } >

                        { /* Category tabs */ } <
                        div style = {
                            { display: 'flex', gap: 8, flexWrap: 'wrap' } } > {
                            CATS.map(c => ( <
                                button key = { c.id }
                                onClick = {
                                    () => setCat(c.id) }
                                style = {
                                    {
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 7,
                                        padding: '9px 22px',
                                        borderRadius: 999,
                                        fontSize: 13,
                                        fontWeight: 600,
                                        cursor: 'pointer',
                                        transition: 'all 0.2s',
                                        background: cat === c.id ? '#1A1A1A' : '#fff',
                                        color: cat === c.id ? '#fff' : '#7A7A7A',
                                        border: cat === c.id ? '1.5px solid #1A1A1A' : '1.5px solid #DDD8CF',
                                    }
                                } > { c.icon } { c.label } <
                                /button>
                            ))
                        } <
                        /div>

                        { /* Search */ } <
                        div style = {
                            { position: 'relative', width: 240 } } >
                        <
                        Search size = { 14 }
                        style = {
                            { position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#A0A0A0' } }
                        /> <
                        input style = {
                            {
                                width: '100%',
                                height: 42,
                                paddingLeft: 34,
                                paddingRight: 12,
                                border: '1.5px solid #DDD8CF',
                                borderRadius: 10,
                                fontSize: 13,
                                fontFamily: 'Inter, sans-serif',
                                background: '#fff',
                                color: '#1A1A1A',
                                outline: 'none',
                                transition: 'border-color 0.2s',
                            }
                        }
                        placeholder = "Search items…"
                        value = { search }
                        onChange = { e => setSearch(e.target.value) }
                        onFocus = { e => e.target.style.borderColor = '#1A1A1A' }
                        onBlur = { e => e.target.style.borderColor = '#DDD8CF' }
                        /> <
                        /div> <
                        /div>

                        { /* ─── FLOATING CART BAR ─── */ } {
                            cart.cartCount > 0 && ( <
                                a href = "/cart"
                                style = {
                                    {
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        background: '#1A1A1A',
                                        color: '#fff',
                                        padding: '14px 22px',
                                        borderRadius: 14,
                                        marginBottom: 36,
                                        textDecoration: 'none',
                                        boxShadow: '0 12px 36px rgba(0,0,0,0.16)',
                                        transition: 'transform 0.2s',
                                    }
                                }
                                onMouseEnter = { e => e.currentTarget.style.transform = 'translateY(-1px)' }
                                onMouseLeave = { e => e.currentTarget.style.transform = 'translateY(0)' } >
                                <
                                div style = {
                                    { display: 'flex', alignItems: 'center', gap: 12 } } >
                                <
                                div style = {
                                    { width: 34, height: 34, borderRadius: 8, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' } } >
                                <
                                ShoppingBag size = { 16 }
                                color = "#1A1A1A" / >
                                <
                                /div> <
                                div >
                                <
                                p style = {
                                    { fontSize: 14, fontWeight: 700 } } > { cart.cartCount }
                                item { cart.cartCount !== 1 ? 's' : '' } in your bag < /p> <
                                p style = {
                                    { fontSize: 12, color: '#888', marginTop: 1 } } > Tap to review your order < /p> <
                                /div> <
                                /div> <
                                div style = {
                                    { display: 'flex', alignItems: 'center', gap: 14 } } >
                                <
                                span style = {
                                    { fontFamily: 'Playfair Display, serif', fontSize: 18, fontWeight: 700, color: '#C8873A' } } > { fmt(cart.cartTotal) } < /span> <
                                span style = {
                                    { background: '#C8873A', color: '#fff', padding: '7px 16px', borderRadius: 8, fontSize: 13, fontWeight: 600 } } > View Order→ < /span> <
                                /div> <
                                /a>
                            )
                        }

                        { /* ─── SECTION DIVIDERS + GRID ─── */ } {
                            ['Drinks', 'Food', 'Cake'].map(section => {
                                const sectionItems = filtered.filter(i => i.category === section);
                                if (sectionItems.length === 0) return null;
                                return ( <
                                    div key = { section }
                                    style = {
                                        { marginBottom: 56 } } > { /* Section heading */ } <
                                    div style = {
                                        { display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28 } } >
                                    <
                                    div style = {
                                        { width: 36, height: 36, background: section === 'Drinks' ? '#FEF3E2' : section === 'Cake' ? '#FEF2F2' : '#F0F9F4', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' } } > { section === 'Drinks' ? < Coffee size = { 18 }
                                        color = "#C8873A" / > : section === 'Cake' ? < Cake size = { 18 }
                                        color = "#D94040" / >: < Sandwich size = { 18 }
                                        color = "#2D9A56" / > } <
                                    /div> <
                                    div >
                                    <
                                    h2 style = {
                                        { fontFamily: 'Playfair Display, serif', fontSize: 22, fontWeight: 700, color: '#1A1A1A' } } > { section } < /h2> <
                                    p style = {
                                        { fontSize: 12, color: '#A0A0A0', marginTop: 1 } } > { sectionItems.length }
                                    item { sectionItems.length !== 1 ? 's' : '' } < /p> <
                                    /div> <
                                    div style = {
                                        { flex: 1, height: 1, background: '#E8E1D6', marginLeft: 8 } }
                                    /> <
                                    /div>

                                    { /* Grid */ } <
                                    div ref = { gridRef }
                                    style = {
                                        { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))', gap: 22 } } > {
                                        sectionItems.map(item => ( <
                                            MenuCard key = { item._id }
                                            item = { item }
                                            added = { added[item._id] }
                                            onAdd = { handleAdd }
                                            fmt = { fmt }
                                            />
                                        ))
                                    } <
                                    /div> <
                                    /div>
                                );
                            })
                        }

                        { /* All items when search active */ } {
                            search && filtered.length > 0 && cat === 'all' && ( <
                                div >
                                <
                                div style = {
                                    { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))', gap: 22 } } > {
                                    filtered.map(item => ( <
                                        MenuCard key = { item._id }
                                        item = { item }
                                        added = { added[item._id] }
                                        onAdd = { handleAdd }
                                        fmt = { fmt }
                                        />
                                    ))
                                } <
                                /div> <
                                /div>
                            )
                        }

                        {
                            filtered.length === 0 && ( <
                                div style = {
                                    { textAlign: 'center', padding: '80px 24px' } } >
                                <
                                p style = {
                                    { fontSize: 40, marginBottom: 16 } } > ☕ < /p> <
                                p style = {
                                    { fontSize: 15, color: '#A0A0A0', fontWeight: 500 } } > No items match your search. < /p> <
                                /div>
                            )
                        }

                        <
                        /div> <
                        /div>
                    );
                }

                /* ─── CARD COMPONENT ─────────────────────────────────────────────── */
                function MenuCard({ item, added, onAdd, fmt }) {
                    const [imgError, setImgError] = useState(false);

                    const tagColors = {
                        'Bestseller': { bg: '#FFF0E8', color: '#C8873A' },
                        'Most Loved': { bg: '#FFF0E8', color: '#C8873A' },
                        "Chef's Pick": { bg: '#F0F9F4', color: '#2D9A56' },
                        'House Classic': { bg: '#F0F0FF', color: '#4B6BFB' },
                        'Seasonal': { bg: '#F0F9F4', color: '#2D9A56' },
                        'Must Try': { bg: '#FEF2F2', color: '#D94040' },
                    };
                    const tagStyle = tagColors[item.tag] || {};

                    return ( <
                        div className = "menu-card"
                        style = {
                            {
                                opacity: 0,
                                background: '#fff',
                                border: '1px solid #E8E1D6',
                                borderRadius: 16,
                                overflow: 'hidden',
                                display: 'flex',
                                flexDirection: 'column',
                                transition: 'box-shadow 0.25s, transform 0.25s',
                                cursor: 'default',
                            }
                        }
                        onMouseEnter = { e => { e.currentTarget.style.boxShadow = '0 12px 36px rgba(0,0,0,0.09)';
                                e.currentTarget.style.transform = 'translateY(-3px)'; } }
                        onMouseLeave = { e => { e.currentTarget.style.boxShadow = 'none';
                                e.currentTarget.style.transform = 'translateY(0)'; } } >
                        { /* Image */ } <
                        div style = {
                            { position: 'relative', height: 190, overflow: 'hidden', background: '#F2EDE5', flexShrink: 0 } } > {!imgError ? ( <
                                img src = { item.image }
                                alt = { item.name }
                                onError = {
                                    () => setImgError(true) }
                                style = {
                                    { width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease', display: 'block' } }
                                onMouseEnter = { e => e.target.style.transform = 'scale(1.05)' }
                                onMouseLeave = { e => e.target.style.transform = 'scale(1)' }
                                />
                            ) : ( <
                                div style = {
                                    { width: '100%', height: '100%', background: 'linear-gradient(135deg, #F2EDE5, #DDD8CF)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 56 } } > { item.category === 'Drinks' ? '☕' : item.category === 'Cake' ? '🍰' : '🍽️' } <
                                /div>
                            )
                        }

                        { /* Tag badge */ } {
                            item.tag && ( <
                                div style = {
                                    {
                                        position: 'absolute',
                                        top: 12,
                                        left: 12,
                                        background: tagStyle.bg,
                                        color: tagStyle.color,
                                        padding: '4px 10px',
                                        borderRadius: 999,
                                        fontSize: 11,
                                        fontWeight: 700,
                                        letterSpacing: '0.04em',
                                    }
                                } > { item.tag } <
                                /div>
                            )
                        }

                        { /* Price overlay */ } <
                        div style = {
                            {
                                position: 'absolute',
                                top: 12,
                                right: 12,
                                background: 'rgba(26,26,26,0.85)',
                                backdropFilter: 'blur(6px)',
                                color: '#fff',
                                padding: '5px 12px',
                                borderRadius: 8,
                                fontSize: 13,
                                fontWeight: 700,
                            }
                        } > { fmt(item.price) } <
                        /div> <
                        /div>

                        { /* Content */ } <
                        div style = {
                            { padding: '18px 20px 20px', flex: 1, display: 'flex', flexDirection: 'column' } } >
                        <
                        div style = {
                            { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 } } >
                        <
                        h3 style = {
                            { fontFamily: 'Playfair Display, serif', fontSize: 18, fontWeight: 700, color: '#1A1A1A', lineHeight: 1.3 } } > { item.name } <
                        /h3> <
                        span style = {
                            {
                                fontSize: 10,
                                fontWeight: 700,
                                letterSpacing: '0.08em',
                                textTransform: 'uppercase',
                                padding: '3px 8px',
                                borderRadius: 4,
                                background: item.category === 'Drinks' ? '#FEF3E2' : '#F0F9F4',
                                color: item.category === 'Drinks' ? '#C8873A' : '#2D9A56',
                                flexShrink: 0,
                                marginLeft: 8,
                                marginTop: 2,
                            }
                        } > { item.category } <
                        /span> <
                        /div>

                        <
                        p style = {
                            { fontSize: 13, color: '#7A7A7A', lineHeight: 1.65, flex: 1, marginBottom: 18 } } > { item.description } <
                        /p>

                        { /* Add button */ } <
                        button onClick = {
                            () => onAdd(item) }
                        style = {
                            {
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: 8,
                                width: '100%',
                                height: 44,
                                borderRadius: 10,
                                border: 'none',
                                cursor: 'pointer',
                                fontSize: 13,
                                fontWeight: 600,
                                letterSpacing: '0.01em',
                                transition: 'all 0.25s',
                                background: added ? '#DCFCE7' : '#1A1A1A',
                                color: added ? '#2D9A56' : '#fff',
                                transform: added ? 'scale(0.98)' : 'scale(1)',
                            }
                        } > { added ? < > < Check size = { 15 } /> Added to Order!</ > : < > < Plus size = { 15 }
                            /> Add to Order &nbsp;·&nbsp; {fmt(item.price)}</ > } <
                        /button> <
                        /div> <
                        /div>
                    );
                }