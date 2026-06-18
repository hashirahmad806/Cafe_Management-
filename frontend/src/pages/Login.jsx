import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Coffee, Eye, EyeOff, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { useAuth } from '../context/AuthContext';

export default function Login() {
    const [form, setForm] = useState({ email: '', password: '' });
    const [showPass, setShowPass] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();
    const cardRef = useRef(null);
    const leftRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
        tl.fromTo(leftRef.current, { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.9 })
            .fromTo(cardRef.current, { x: 40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.9 }, '-=0.7');
    }, []);

    const handleSubmit = async(e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await login(form.email, form.password);
            navigate('/dashboard');
        } catch (err) {
            setError(err.message || 'Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return ( <
        div style = {
            { minHeight: '100vh', display: 'flex', background: '#FAF8F4' } } > { /* Left Panel */ } <
        div ref = { leftRef }
        style = {
            {
                opacity: 0,
                flex: '1 1 45%',
                background: '#1A1A1A',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '48px 56px',
                minHeight: '100vh',
                position: 'relative',
                overflow: 'hidden',
            }
        }
        className = "hide-on-mobile" > { /* Background texture */ } <
        div style = {
            { position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 30% 70%, rgba(200,135,58,0.15) 0%, transparent 60%)', pointerEvents: 'none' } }
        />

        { /* Logo */ } <
        div style = {
            { display: 'flex', alignItems: 'center', gap: 10, position: 'relative', zIndex: 1 } } >
        <
        div style = {
            { width: 36, height: 36, background: '#C8873A', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' } } >
        <
        Coffee size = { 20 }
        color = "#fff" / >
        <
        /div> <
        span style = {
            { fontWeight: 700, fontSize: 18, color: '#fff' } } > BrewManager < span style = {
            { fontWeight: 400 } } > Pro < /span></span >
        <
        /div>

        { /* Center quote */ } <
        div style = {
            { position: 'relative', zIndex: 1 } } >
        <
        p style = {
            { fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)', color: '#fff', lineHeight: 1.4, marginBottom: 24, fontStyle: 'italic' } } >
        "Every great cup starts with a great system behind it." <
        /p> <
        p style = {
            { fontSize: 14, color: '#888' } } > —The BrewManager Team < /p> <
        /div>

        { /* Bottom stat */ } <
        div style = {
            { display: 'flex', gap: 40, position: 'relative', zIndex: 1 } } > {
            [
                ['2,400+', 'Active Cafes'],
                ['2.4m+', 'Orders / Month'],
                ['99.9%', 'Uptime']
            ].map(([n, l]) => ( <
                div key = { l } >
                <
                p style = {
                    { fontFamily: 'Playfair Display, serif', fontSize: 22, fontWeight: 700, color: '#C8873A' } } > { n } < /p> <
                p style = {
                    { fontSize: 12, color: '#666', marginTop: 2 } } > { l } < /p> <
                /div>
            ))
        } <
        /div>

        <
        style > { `@media (max-width: 768px) { .hide-on-mobile { display: none !important; } }` } < /style> <
        /div>

        { /* Right Panel — Form */ } <
        div style = {
            { flex: '1 1 55%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 24px' } } >
        <
        div ref = { cardRef }
        style = {
            { opacity: 0, width: '100%', maxWidth: 420 } } > { /* Mobile logo */ } <
        div style = {
            { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 40 } }
        className = "mobile-logo" >
        <
        div style = {
            { width: 32, height: 32, background: '#1A1A1A', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' } } >
        <
        Coffee size = { 18 }
        color = "#fff" / >
        <
        /div> <
        span style = {
            { fontWeight: 700, fontSize: 16, color: '#1A1A1A' } } > BrewManager Pro < /span> <
        /div>

        <
        h2 style = {
            { fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: 700, color: '#1A1A1A', marginBottom: 8 } } >
        Welcome back <
        /h2> <
        p style = {
            { fontSize: 14, color: '#7A7A7A', marginBottom: 36 } } > Sign in to your cafe management dashboard. < /p>

        {
            error && ( <
                div style = {
                    { background: '#FEE2E2', border: '1px solid #FECACA', borderRadius: 10, padding: '12px 14px', marginBottom: 24, fontSize: 13, color: '#991B1B' } } > { error } <
                /div>
            )
        }

        <
        form onSubmit = { handleSubmit }
        style = {
            { display: 'flex', flexDirection: 'column', gap: 20 } } >
        <
        div >
        <
        label style = {
            { display: 'block', fontSize: 13, fontWeight: 600, color: '#1A1A1A', marginBottom: 8 } } > Email Address < /label> <
        input type = "email"
        required className = "input-field"
        placeholder = "admin@brewmanager.com"
        value = { form.email }
        onChange = { e => setForm(f => ({...f, email: e.target.value })) }
        /> <
        /div>

        <
        div >
        <
        div style = {
            { display: 'flex', justifyContent: 'space-between', marginBottom: 8 } } >
        <
        label style = {
            { fontSize: 13, fontWeight: 600, color: '#1A1A1A' } } > Password < /label> <
        Link to = "/"
        style = {
            { fontSize: 12, color: '#C8873A', textDecoration: 'none', fontWeight: 500 } } > Forgot password ? < /Link> <
        /div> <
        div style = {
            { position: 'relative' } } >
        <
        input type = { showPass ? 'text' : 'password' }
        required className = "input-field"
        placeholder = "••••••••"
        value = { form.password }
        onChange = { e => setForm(f => ({...f, password: e.target.value })) }
        style = {
            { paddingRight: 44 } }
        /> <
        button type = "button"
        onClick = {
            () => setShowPass(!showPass) }
        style = {
            { position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#7A7A7A', display: 'flex' } } > { showPass ? < EyeOff size = { 18 } /> : <Eye size={18} / > } <
        /button> <
        /div> <
        /div>

        <
        button type = "submit"
        className = "btn-dark"
        style = {
            { width: '100%', justifyContent: 'center', height: 48, fontSize: 15, marginTop: 8 } }
        disabled = { loading } > {
            loading ? 'Signing in...' : < > < span > Sign In < /span><ArrowRight size={16} / > < />} <
                /button>

                <
                div style = {
                    { display: 'flex', alignItems: 'center', gap: 12, margin: '4px 0' } } >
                <
                div style = {
                    { flex: 1, height: 1, background: '#DDD8CF' } }
            /> <
            span style = {
                { fontSize: 12, color: '#B0A898' } } > or < /span> <
            div style = {
                { flex: 1, height: 1, background: '#DDD8CF' } }
            /> <
            /div>

            <
            Link to = "/menu"
            className = "btn-outline"
            style = {
                { textDecoration: 'none', width: '100%', justifyContent: 'center', height: 48, fontSize: 14 } } >
            Browse Menu <
            /Link> <
            /form>

            <
            p style = {
                { textAlign: 'center', marginTop: 32, fontSize: 13, color: '#7A7A7A' } } >
            Demo: Use < strong > admin @brewmanager.com < /strong> / < strong > password123 < /strong> <
                /p> <
                /div> <
                /div> <
                /div>
        );
    }