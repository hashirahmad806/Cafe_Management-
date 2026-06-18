import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import {
    LayoutDashboard,
    UtensilsCrossed,
    Table,
    Users,
    Settings,
    LogOut,
    Plus,
    Pencil,
    Trash2,
    Coffee,
    X,
    Check,
    Search,
    UserPlus
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const MOCK_MENU = [
    { _id: 'd1', name: 'Espresso', category: 'Drinks', price: 250, status: 'available', image: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=500&q=85', description: 'A rich, full-bodied single shot pulled from our signature dark-roast blend.' },
    { _id: 'd2', name: 'Cappuccino', category: 'Drinks', price: 350, status: 'available', image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=500&q=85', description: 'A velvety double espresso crowned with equal parts steamed and frothed milk.' },
    { _id: 'd3', name: 'Latte', category: 'Drinks', price: 400, status: 'available', image: 'https://images.unsplash.com/photo-1561882468-9110d70d0283?w=500&q=85', description: 'Smooth espresso blended with a generous pour of velvety steamed milk.' },
    { _id: 'd4', name: 'Americano', category: 'Drinks', price: 300, status: 'available', image: 'https://images.unsplash.com/photo-1551030173-122aabc4489c?w=500&q=85', description: 'Double shots of espresso diluted with hot water to create a smooth, bold coffee.' },
    { _id: 'f1', name: 'Club Sandwich', category: 'Food', price: 550, status: 'available', image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=500&q=85', description: 'Triple-decker toasted bread layered with grilled chicken, crispy bacon, fresh lettuce.' },
    { _id: 'f2', name: 'Chicken Burger', category: 'Food', price: 650, status: 'available', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=85', description: 'Juicy grilled chicken breast in a brioche bun with house sauce.' },
];

const MOCK_STAFF = [
    { id: '1', name: 'Maya Chen', role: 'Manager', shift: 'Morning', status: 'On Shift', phone: '555-0192' },
    { id: '2', name: 'James Okafor', role: 'Head Barista', shift: 'Morning', status: 'On Shift', phone: '555-0184' },
    { id: '3', name: 'Leila Moradi', role: 'Chef', shift: 'Afternoon', status: 'Off Shift', phone: '555-0177' },
    { id: '4', name: 'Alex Thompson', role: 'Barista', shift: 'Afternoon', status: 'Off Shift', phone: '555-0165' },
];

const MOCK_TABLES = Array.from({ length: 12 }, (_, i) => ({
    id: `T${i + 1}`,
    number: i + 1,
    status: i % 4 === 0 ? 'Occupied' : i % 5 === 0 ? 'Reserved' : 'Available',
    capacity: i < 4 ? 2 : i < 8 ? 4 : 6,
    currentBill: i % 4 === 0 ? Math.floor(Math.random() * 1500 + 500) : 0
}));

const NAV_ITEMS = [{
        id: 'dashboard',
        label: 'Dashboard',
        icon: < LayoutDashboard size = { 18 }
        />
    },
    {
        id: 'menu',
        label: 'Menu',
        icon: < UtensilsCrossed size = { 18 }
        />
    },
    {
        id: 'tables',
        label: 'Tables',
        icon: < Table size = { 18 }
        />
    },
    {
        id: 'staff',
        label: 'Staff',
        icon: < Users size = { 18 }
        />
    },
    {
        id: 'settings',
        label: 'Settings',
        icon: < Settings size = { 18 }
        />
    }
];

export default function Dashboard() {
    const [activeNav, setActiveNav] = useState('dashboard');
    const [menuItems, setMenuItems] = useState(MOCK_MENU);
    const [staffList, setStaffList] = useState(MOCK_STAFF);
    const [tablesList, setTablesList] = useState(MOCK_TABLES);
    const [settings, setSettings] = useState({ cafeName: 'BrewManager Pro', taxRate: 8.0, contactEmail: 'hello@brewmanager.com' });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Modals
    const [showMenuModal, setShowMenuModal] = useState(false);
    const [editItem, setEditItem] = useState(null);
    const [newItem, setNewItem] = useState({ name: '', category: 'Drinks', price: '', status: 'available', image: '', description: '' });

    const [showStaffModal, setShowStaffModal] = useState(false);
    const [newStaff, setNewStaff] = useState({ name: '', role: 'Barista', shift: 'Morning', status: 'On Shift', phone: '' });

    const navigate = useNavigate();
    const { admin } = useAuth();

    // Fetch data from backend on mount
    useEffect(() => {
        const fetchData = async() => {
            try {
                const token = admin ? .token;
                if (!token) {
                    setError('No authentication token found');
                    setLoading(false);
                    return;
                }

                const headers = { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' };

                // Fetch menu items
                const menuRes = await fetch('http://localhost:5000/api/menu', { headers });
                if (menuRes.ok) {
                    const menuData = await menuRes.json();
                    setMenuItems(menuData);
                }

                // Fetch staff (protected)
                const staffRes = await fetch('http://localhost:5000/api/staff', { headers });
                if (staffRes.ok) {
                    const staffData = await staffRes.json();
                    setStaffList(staffData);
                }

                // Fetch tables (protected)
                const tablesRes = await fetch('http://localhost:5000/api/tables', { headers });
                if (tablesRes.ok) {
                    const tablesData = await tablesRes.json();
                    setTablesList(tablesData);
                }

                // Fetch settings (protected)
                const settingsRes = await fetch('http://localhost:5000/api/settings', { headers });
                if (settingsRes.ok) {
                    const settingsData = await settingsRes.json();
                    setSettings(settingsData);
                }

                setLoading(false);
            } catch (err) {
                console.error('Error fetching data:', err);
                setError('Failed to load data from server');
                setLoading(false);
            }
        };

        fetchData();
    }, [admin]);

    // --- MENU HANDLERS ---
    const handleSaveMenu = async() => {
        if (!newItem.name || !newItem.price) return;
        try {
            const token = admin ? .token;
            const headers = { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' };

            if (editItem) {
                const res = await fetch(`http://localhost:5000/api/menu/${editItem._id}`, {
                    method: 'PUT',
                    headers,
                    body: JSON.stringify({...newItem, price: parseFloat(newItem.price) })
                });
                if (res.ok) {
                    const updated = await res.json();
                    setMenuItems(prev => prev.map(i => i._id === editItem._id ? updated : i));
                } else {
                    setError('Failed to update menu item');
                }
            } else {
                const res = await fetch('http://localhost:5000/api/menu', {
                    method: 'POST',
                    headers,
                    body: JSON.stringify({...newItem, price: parseFloat(newItem.price) })
                });
                if (res.ok) {
                    const newItemData = await res.json();
                    setMenuItems(prev => [...prev, newItemData]);
                } else {
                    setError('Failed to add menu item');
                }
            }
            setShowMenuModal(false);
            setEditItem(null);
            setNewItem({ name: '', category: 'Drinks', price: '', status: 'available', image: '', description: '' });
        } catch (err) {
            setError('Error saving menu item: ' + err.message);
        }
    };

    const openEditMenu = (item) => {
        setEditItem(item);
        setNewItem({ name: item.name, category: item.category, price: item.price, status: item.status, image: item.image || '', description: item.description || '' });
        setShowMenuModal(true);
    };

    const handleDeleteMenu = async(id) => {
        try {
            const token = admin ? .token;
            const res = await fetch(`http://localhost:5000/api/menu/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                setMenuItems(prev => prev.filter(i => i._id !== id));
            } else {
                setError('Failed to delete menu item');
            }
        } catch (err) {
            setError('Error deleting menu item: ' + err.message);
        }
    };

    // --- STAFF HANDLERS ---
    const handleSaveStaff = async() => {
        if (!newStaff.name) return;
        try {
            const token = admin ? .token;
            const res = await fetch('http://localhost:5000/api/staff', {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                body: JSON.stringify(newStaff)
            });
            if (res.ok) {
                const newStaffData = await res.json();
                setStaffList(prev => [...prev, newStaffData]);
            } else {
                setError('Failed to add staff member');
            }
            setShowStaffModal(false);
            setNewStaff({ name: '', role: 'Barista', shift: 'Morning', status: 'On Shift', phone: '' });
        } catch (err) {
            setError('Error saving staff: ' + err.message);
        }
    };

    const handleDeleteStaff = async(id) => {
        try {
            const token = admin ? .token;
            const res = await fetch(`http://localhost:5000/api/staff/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                setStaffList(prev => prev.filter(s => s._id !== id));
            } else {
                setError('Failed to delete staff member');
            }
        } catch (err) {
            setError('Error deleting staff: ' + err.message);
        }
    };

    const handleSaveSettings = async() => {
        try {
            const token = admin ? .token;
            const res = await fetch('http://localhost:5000/api/settings', {
                method: 'PUT',
                headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                body: JSON.stringify(settings)
            });
            if (res.ok) {
                const updated = await res.json();
                setSettings(updated);
                alert('Settings saved successfully!');
            } else {
                setError('Failed to save settings');
            }
        } catch (err) {
            setError('Error saving settings: ' + err.message);
        }
    };

    // --- RENDER HELPERS ---
    const renderDashboard = () => ( <
        >
        <
        div style = {
            { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20, marginBottom: 36 }
        } >
        <
        div className = "dash-anim"
        style = {
            { background: '#fff', borderRadius: 12, padding: '24px 28px', border: '1px solid #E8E1D6' }
        } >
        <
        p style = {
            { fontSize: 12, fontWeight: 600, color: '#7A7A7A', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 12 }
        } > Total Daily Sales < /p> <
        p style = {
            { fontFamily: 'Playfair Display, serif', fontSize: 32, fontWeight: 700, color: '#1A1A1A' }
        } > Rs .14, 240 < /p> < /
        div > <
        div className = "dash-anim"
        style = {
            { background: '#fff', borderRadius: 12, padding: '24px 28px', border: '1px solid #E8E1D6' }
        } >
        <
        p style = {
            { fontSize: 12, fontWeight: 600, color: '#7A7A7A', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 12 }
        } > Active Orders < /p> <
        div style = {
            { display: 'flex', alignItems: 'center', gap: 10 }
        } >
        <
        p style = {
            { fontFamily: 'Playfair Display, serif', fontSize: 32, fontWeight: 700, color: '#1A1A1A' }
        } > 12 < /p> <
        div style = {
            { width: 10, height: 10, borderRadius: '50%', background: '#22C55E', boxShadow: '0 0 0 3px rgba(34,197,94,0.2)' }
        }
        /> < /
        div > <
        /div> <
        div className = "dash-anim"
        style = {
            { background: '#fff', borderRadius: 12, padding: '24px 28px', border: '1px solid #E8E1D6' }
        } >
        <
        p style = {
            { fontSize: 12, fontWeight: 600, color: '#7A7A7A', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 12 }
        } > Occupied Tables < /p> <
        p style = {
            { fontFamily: 'Playfair Display, serif', fontSize: 32, fontWeight: 700, color: '#1A1A1A' }
        } > { tablesList.filter(t => t.status === 'Occupied').length }
        / {tablesList.length}</p >
        <
        /div> < /
        div > <
        div className = "dash-anim"
        style = {
            { background: '#fff', borderRadius: 14, border: '1px solid #E8E1D6', padding: '32px', textAlign: 'center' }
        } >
        <
        Coffee size = { 48 }
        color = "#E8E1D6"
        style = {
            { margin: '0 auto 16px' }
        }
        /> <
        h3 style = {
            { fontSize: 18, fontWeight: 700, color: '#1A1A1A', marginBottom: 8 }
        } > Welcome to BrewManager Pro < /h3> <
        p style = {
            { fontSize: 14, color: '#7A7A7A' }
        } > Select a module from the sidebar to manage your cafe operations. < /p> < /
        div > <
        />
    );

    const renderMenu = () => ( <
            div className = "dash-anim"
            style = {
                { background: '#fff', borderRadius: 14, border: '1px solid #E8E1D6', overflow: 'hidden' }
            } >
            <
            div style = {
                { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 28px', borderBottom: '1px solid #E8E1D6' }
            } >
            <
            h2 style = {
                { fontSize: 16, fontWeight: 700, color: '#1A1A1A' }
            } > Menu Items < /h2> <
            button onClick = {
                () => {
                    setEditItem(null);
                    setNewItem({ name: '', category: 'Drinks', price: '', status: 'available', image: '', description: '' });
                    setShowMenuModal(true);
                }
            }
            className = "btn-dark"
            style = {
                { padding: '9px 16px', fontSize: 13, display: 'flex', alignItems: 'center', gap: 6 }
            } >
            <
            Plus size = { 15 }
            /> Add Item < /
            button > <
            /div> <
            table style = {
                { width: '100%', borderCollapse: 'collapse' }
            } >
            <
            thead >
            <
            tr style = {
                { background: '#FAFAF9' }
            } > {
                ['Item Name', 'Category', 'Price', 'Status', 'Actions'].map(col => ( <
                    th key = { col }
                    style = {
                        { padding: '12px 28px', fontSize: 12, fontWeight: 700, color: '#7A7A7A', textAlign: 'left', letterSpacing: '0.06em', textTransform: 'uppercase', borderBottom: '1px solid #E8E1D6' }
                    } > { col } < /th>
                ))
            } <
            /tr> < /
            thead > <
            tbody > {
                menuItems.map((item, i) => ( <
                        tr key = { item._id }
                        style = {
                            { borderBottom: i < menuItems.length - 1 ? '1px solid #F0EDE8' : 'none' }
                        } >
                        <
                        td style = {
                            { padding: '16px 28px', display: 'flex', alignItems: 'center', gap: 12 }
                        } >
                        <
                        div style = {
                            { width: 40, height: 40, borderRadius: 8, background: '#F2EDE5', overflow: 'hidden' }
                        } > {
                            item.image ? < img src = { item.image }
                            alt = { item.name }
                            style = {
                                { width: '100%', height: '100%', objectFit: 'cover' }
                            }
                            /> : <Coffee size={20} color="#C8873A" style={{ margin: '10px' }} / >
                        } <
                        /div> <
                        div >
                        <
                        p style = {
                            { fontSize: 14, color: '#1A1A1A', fontWeight: 600 }
                        } > { item.name } < /p> <
                        p style = {
                            { fontSize: 12, color: '#7A7A7A', width: 200, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }
                        } > { item.description || 'No description' } < /p> < /
                        div > <
                        /td> <
                        td style = {
                            { padding: '16px 28px' }
                        } > < span className = "badge-gray" > { item.category } < /span></td >
                        <
                        td style = {
                            { padding: '16px 28px', fontSize: 14, color: '#4A4A4A', fontWeight: 500 }
                        } > Rs. { item.price } < /td> <
                        td style = {
                            { padding: '16px 28px' }
                        } > { item.status === 'available' ? < span className = "badge-green" > Available < /span> : <span className="badge-red">Out of Stock</span > } <
                        /td> <
                        td style = {
                            { padding: '16px 28px' }
                        } >
                        <
                        div style = {
                            { display: 'flex', gap: 10 }
                        } >
                        <
                        button onClick = {
                            () => openEditMenu(item)
                        }
                        style = {
                            { background: 'none', border: 'none', cursor: 'pointer', color: '#7A7A7A' } <
                            button onClick = {
                                () => openEditMenu(item)
                            }
                            style = {
                                { background: 'none', border: 'none', cursor: 'pointer', color: '#7A7A7A' }
                            } > < Pencil size = { 16 }
                            /></button >
                            <
                            button onClick = {
                                () => handleDeleteMenu(item._id)
                            }
                            style = {
                                { background: 'none', border: 'none', cursor: 'pointer', color: '#D94040' }
                            } > < Trash2 size = { 16 }
                            /></button >
                            <
                            /div> < /
                            td > <
                            /tr>
                        ))
                } <
                /tbody> < /
                table > <
                /div>
            );

            const renderTables = () => ( <
                div className = "dash-anim" >
                <
                div style = {
                    { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }
                } >
                <
                h2 style = {
                    { fontSize: 18, fontWeight: 700, color: '#1A1A1A' }
                } > Floor Plan & Tables < /h2> <
                div style = {
                    { display: 'flex', gap: 12 }
                } >
                <
                span className = "badge-green" > Available: { tablesList.filter(t => t.status === 'Available').length } < /span> <
                span className = "badge-red"
                style = {
                    { background: '#FEF2F2', color: '#D94040' }
                } > Occupied: { tablesList.filter(t => t.status === 'Occupied').length } < /span> <
                span className = "badge-gray"
                style = {
                    { background: '#FEF3E2', color: '#C8873A' }
                } > Reserved: { tablesList.filter(t => t.status === 'Reserved').length } < /span> < /
                div > <
                /div> <
                div style = {
                    { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 20 }
                } > {
                    tablesList.map(table => ( <
                        div key = { table.id }
                        style = {
                            {
                                background: '#fff',
                                border: '1px solid #E8E1D6',
                                borderRadius: 14,
                                padding: '20px',
                                borderTop: `4px solid ${table.status === 'Available' ? '#2D9A56' : table.status === 'Occupied' ? '#D94040' : '#C8873A'}`
                            }
                        } >
                        <
                        div style = {
                            { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }
                        } >
                        <
                        div >
                        <
                        h3 style = {
                            { fontSize: 18, fontWeight: 700, color: '#1A1A1A' }
                        } > Table { table.number } < /h3> <
                        p style = {
                            { fontSize: 12, color: '#7A7A7A' }
                        } > { table.capacity }
                        Seats < /p> < /
                        div > <
                        span style = {
                            {
                                fontSize: 11,
                                fontWeight: 700,
                                padding: '3px 8px',
                                borderRadius: 4,
                                background: table.status === 'Available' ? '#DCFCE7' : table.status === 'Occupied' ? '#FEE2E2' : '#FEF3E2',
                                color: table.status === 'Available' ? '#2D9A56' : table.status === 'Occupied' ? '#D94040' : '#C8873A'
                            }
                        } > { table.status } <
                        /span> < /
                        div > <
                        div style = {
                            { background: '#FAFAF9', borderRadius: 8, padding: '12px', textAlign: 'center' }
                        } >
                        <
                        p style = {
                            { fontSize: 12, color: '#7A7A7A', marginBottom: 4 }
                        } > Current Bill < /p> <
                        p style = {
                            { fontFamily: 'Playfair Display, serif', fontSize: 20, fontWeight: 700, color: '#1A1A1A' }
                        } > { table.status === 'Occupied' ? `Rs. ${table.currentBill}` : '---' } <
                        /p> < /
                        div > <
                        /div>
                    ))
                } <
                /div> < /
                div >
            );

            const renderStaff = () => ( <
                div className = "dash-anim"
                style = {
                    { background: '#fff', borderRadius: 14, border: '1px solid #E8E1D6', overflow: 'hidden' }
                } >
                <
                div style = {
                    { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 28px', borderBottom: '1px solid #E8E1D6' }
                } >
                <
                h2 style = {
                    { fontSize: 16, fontWeight: 700, color: '#1A1A1A' }
                } > Staff Directory < /h2> <
                button onClick = {
                    () => setShowStaffModal(true)
                }
                className = "btn-dark"
                style = {
                    { padding: '9px 16px', fontSize: 13, display: 'flex', alignItems: 'center', gap: 6 }
                } >
                <
                UserPlus size = { 15 }
                /> Add Staff < /
                button > <
                /div> <
                table style = {
                    { width: '100%', borderCollapse: 'collapse' }
                } >
                <
                thead >
                <
                tr style = {
                    { background: '#FAFAF9' }
                } > {
                    ['Name', 'Role', 'Shift', 'Status', 'Contact', ''].map(col => ( <
                        th key = { col }
                        style = {
                            { padding: '12px 28px', fontSize: 12, fontWeight: 700, color: '#7A7A7A', textAlign: 'left', letterSpacing: '0.06em', textTransform: 'uppercase', borderBottom: '1px solid #E8E1D6' }
                        } > { col } < /th>
                    ))
                } <
                /tr> < /
                thead > <
                tbody > {
                    staffList.map((staff, i) => ( <
                        tr key = { staff.id }
                        style = {
                            { borderBottom: i < staffList.length - 1 ? '1px solid #F0EDE8' : 'none' }
                        } >
                        <
                        td style = {
                            { padding: '16px 28px', fontSize: 14, color: '#1A1A1A', fontWeight: 600 }
                        } > { staff.name } < /td> <
                        td style = {
                            { padding: '16px 28px' }
                        } > < span className = "badge-gray" > { staff.role } < /span></td >
                        <
                        td style = {
                            { padding: '16px 28px', fontSize: 14, color: '#4A4A4A' }
                        } > { staff.shift } < /td> <
                        td style = {
                            { padding: '16px 28px' }
                        } > { staff.status === 'On Shift' ? < span className = "badge-green" > On Shift < /span> : <span className="badge-gray">Off Shift</span > } <
                        /td> <
                        td style = {
                            { padding: '16px 28px', fontSize: 14, color: '#4A4A4A' }
                        } > { staff.phone } < /td> <
                        td style = {
                            { padding: '16px 28px' }
                        } >
                        <
                        button onClick = {
                            () => handleDeleteStaff(staff._id)
                        }
                        style = {
                            { background: 'none', border: 'none', cursor: 'pointer', color: '#D94040' }
                        } > < Trash2 size = { 16 }
                        /></button >
                        <
                        /td> < /
                        tr >
                    ))
                } <
                /tbody> < /
                table > <
                /div>
            );

            const renderSettings = () => ( <
                div className = "dash-anim"
                style = {
                    { background: '#fff', borderRadius: 14, border: '1px solid #E8E1D6', padding: '32px', maxWidth: 600 }
                } >
                <
                h2 style = {
                    { fontSize: 18, fontWeight: 700, color: '#1A1A1A', marginBottom: 28 }
                } > Cafe Settings < /h2> <
                div style = {
                    { display: 'flex', flexDirection: 'column', gap: 22 }
                } >
                <
                div >
                <
                label style = {
                    { display: 'block', fontSize: 13, fontWeight: 600, color: '#1A1A1A', marginBottom: 8 }
                } > Cafe Name < /label> <
                input className = "input-field"
                value = { settings.cafeName }
                onChange = { e => setSettings(f => ({...f, cafeName: e.target.value })) }
                placeholder = "e.g. BrewManager Pro" / >
                <
                /div> <
                div >
                <
                label style = {
                    { display: 'block', fontSize: 13, fontWeight: 600, color: '#1A1A1A', marginBottom: 8 }
                } > Tax Rate( % ) < /label> <
                input className = "input-field"
                type = "number"
                step = "0.1"
                value = { settings.taxRate }
                onChange = { e => setSettings(f => ({...f, taxRate: parseFloat(e.target.value) })) }
                placeholder = "e.g. 8.0" / >
                <
                /div> <
                div >
                <
                label style = {
                    { display: 'block', fontSize: 13, fontWeight: 600, color: '#1A1A1A', marginBottom: 8 }
                } > Contact Email < /label> <
                input className = "input-field"
                type = "email"
                value = { settings.contactEmail }
                onChange = { e => setSettings(f => ({...f, contactEmail: e.target.value })) }
                placeholder = "e.g. hello@cafe.com" / >
                <
                /div> <
                button onClick = {
                    () => handleSaveSettings()
                }
                style = {
                    { background: '#1A1A1A', color: '#fff', padding: '12px 24px', borderRadius: 10, border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 600, marginTop: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }
                } > Save Settings < /button> < /
                div > <
                /div>
            );

            return ( <
                    div style = {
                        { display: 'flex', minHeight: '100vh', background: '#F8F6F2', fontFamily: 'Inter, sans-serif' }
                    } >

                    { /* ─── SIDEBAR ─── */ } <
                    aside style = {
                        { width: 220, background: '#fff', borderRight: '1px solid #E8E1D6', display: 'flex', flexDirection: 'column', padding: '28px 0', position: 'fixed', top: 0, bottom: 0, left: 0, zIndex: 50 }
                    } >
                    <
                    div style = {
                        { padding: '0 20px', marginBottom: 32, display: 'flex', alignItems: 'center', gap: 10 }
                    } >
                    <
                    div style = {
                        { width: 36, height: 36, borderRadius: 8, background: '#1A1A1A', display: 'flex', alignItems: 'center', justifyContent: 'center' }
                    } > < Coffee size = { 18 }
                    color = "#fff" / > < /div> <
                    div > < p style = {
                        { fontSize: 14, fontWeight: 700, color: '#1A1A1A' }
                    } > Cafe Manager < /p><p style={{ fontSize: 11, color: '#7A7A7A', marginTop: 1 }}>Admin Panel</p > < /div> < /
                    div > <
                    nav style = {
                        { flex: 1 }
                    } > {
                        NAV_ITEMS.map(item => ( <
                            button key = { item.id }
                            onClick = {
                                () => setActiveNav(item.id)
                            }
                            style = {
                                {
                                    width: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 12,
                                    padding: '11px 20px',
                                    fontSize: 14,
                                    fontWeight: 500,
                                    textAlign: 'left',
                                    border: 'none',
                                    cursor: 'pointer',
                                    transition: 'background 0.15s, color 0.15s',
                                    background: activeNav === item.id ? '#F0EDE8' : 'transparent',
                                    color: activeNav === item.id ? '#1A1A1A' : '#7A7A7A',
                                    borderLeft: activeNav === item.id ? '3px solid #1A1A1A' : '3px solid transparent'
                                }
                            } > { item.icon } { item.label } <
                            /button>
                        ))
                    } <
                    /nav> <
                    button onClick = {
                        () => navigate('/login')
                    }
                    style = {
                        { display: 'flex', alignItems: 'center', gap: 10, padding: '12px 20px', background: 'none', border: 'none', cursor: 'pointer', color: '#D94040', fontSize: 14, width: '100%' }
                    } >
                    <
                    LogOut size = { 18 }
                    /> Logout < /
                    button > <
                    /aside>

                    { /* ─── MAIN CONTENT ─── */ } <
                    main style = {
                        { marginLeft: 220, flex: 1, padding: '36px 40px' }
                    } >
                    <
                    div style = {
                        { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 36 }
                    } >
                    <
                    h1 style = {
                        { fontSize: 24, fontWeight: 700, color: '#1A1A1A', textTransform: 'capitalize' }
                    } > { activeNav } < /h1> <
                    div style = {
                        { display: 'flex', alignItems: 'center', gap: 12 }
                    } >
                    <
                    div style = {
                        { width: 36, height: 36, borderRadius: '50%', background: '#C8873A', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 13, fontWeight: 700 }
                    } > CM < /div> < /
                    div > <
                    /div>

                    { activeNav === 'dashboard' && renderDashboard() } { activeNav === 'menu' && renderMenu() } { activeNav === 'tables' && renderTables() } { activeNav === 'staff' && renderStaff() } { activeNav === 'settings' && renderSettings() } <
                    /main>

                    { /* ─── MODALS ─── */ }

                    { /* Menu Modal */ } {
                        showMenuModal && ( <
                                div style = {
                                    { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(4px)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }
                                } >
                                <
                                div style = {
                                    { background: '#fff', borderRadius: 16, padding: '32px', width: '100%', maxWidth: 540, boxShadow: '0 24px 64px rgba(0,0,0,0.12)', maxHeight: '90vh', overflowY: 'auto' }
                                } >
                                <
                                div style = {
                                    { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }
                                } >
                                <
                                h3 style = {
                                    { fontSize: 18, fontWeight: 700, color: '#1A1A1A' }
                                } > { editItem ? 'Edit Menu Item' : 'Add New Item' } < /h3> <
                                button onClick = {
                                    () => setShowMenuModal(false)
                                }
                                style = {
                                    { background: 'none', border: 'none', cursor: 'pointer', color: '#7A7A7A' }
                                } > < X size = { 20 }
                                /></button >
                                <
                                /div> <
                                div style = {
                                    { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }
                                } >
                                <
                                div style = {
                                    { gridColumn: 'span 2' }
                                } >
                                <
                                label style = {
                                    { display: 'block', fontSize: 13, fontWeight: 600, color: '#1A1A1A', marginBottom: 6 }
                                } > Item Name < /label> <
                                input className = "input-field"
                                value = { newItem.name }
                                onChange = { e => setNewItem(f => ({...f, name: e.target.value })) }
                                placeholder = "e.g. Oat Milk Latte" / >
                                <
                                /div> <
                                div style = {
                                    { gridColumn: 'span 2' }
                                } >
                                <
                                label style = {
                                    { display: 'block', fontSize: 13, fontWeight: 600, color: '#1A1A1A', marginBottom: 6 }
                                } > Description < /label> <
                                textarea className = "input-field"
                                style = {
                                    { minHeight: 80, resize: 'vertical' }
                                }
                                value = { newItem.description }
                                onChange = { e => setNewItem(f => ({...f, description: e.target.value })) }
                                placeholder = "Brief description of the item..." / >
                                <
                                /div> <
                                div style = {
                                    { gridColumn: 'span 2' }
                                } >
                                <
                                label style = {
                                    { display: 'block', fontSize: 13, fontWeight: 600, color: '#1A1A1A', marginBottom: 6 }
                                } > Image URL < /label> <
                                input className = "input-field"
                                value = { newItem.image }
                                onChange = { e => setNewItem(f => ({...f, image: e.target.value })) }
                                placeholder = "https://images.unsplash.com/..." / >
                                <
                                /div> <
                                div >
                                <
                                label style = {
                                    { display: 'block', fontSize: 13, fontWeight: 600, color: '#1A1A1A', marginBottom: 6 }
                                } > Category < /label> <
                                select className = "input-field"
                                value = { newItem.category }
                                onChange = { e => setNewItem(f => ({...f, category: e.target.value })) } > {
                                    ['Drinks', 'Food', 'Pastry', 'Cake'].map(c => < option key = { c } > { c } < /option>)} < /
                                        select > <
                                        /div> <
                                        div >
                                        <
                                        label style = {
                                            { display: 'block', fontSize: 13, fontWeight: 600, color: '#1A1A1A', marginBottom: 6 }
                                        } > Price(Rs) < /label> <
                                        input className = "input-field"
                                        type = "number"
                                        value = { newItem.price }
                                        onChange = { e => setNewItem(f => ({...f, price: e.target.value })) }
                                        placeholder = "0" / >
                                        <
                                        /div> <
                                        div style = {
                                            { gridColumn: 'span 2' }
                                        } >
                                        <
                                        label style = {
                                            { display: 'block', fontSize: 13, fontWeight: 600, color: '#1A1A1A', marginBottom: 6 }
                                        } > Status < /label> <
                                        select className = "input-field"
                                        value = { newItem.status }
                                        onChange = { e => setNewItem(f => ({...f, status: e.target.value })) } >
                                        <
                                        option value = "available" > Available < /option> <
                                        option value = "out_of_stock" > Out of Stock < /option> < /
                                        select > <
                                        /div> < /
                                        div > <
                                        div style = {
                                            { display: 'flex', gap: 12, marginTop: 28 }
                                        } >
                                        <
                                        button onClick = {
                                            () => setShowMenuModal(false)
                                        }
                                        className = "btn-outline"
                                        style = {
                                            { flex: 1, justifyContent: 'center' }
                                        } > Cancel < /button> <
                                        button onClick = { handleSaveMenu }
                                        className = "btn-dark"
                                        style = {
                                            { flex: 1, justifyContent: 'center' }
                                        } >
                                        <
                                        Check size = { 15 }
                                        /> {editItem ? 'Save Changes' : 'Add Item'} < /
                                        button > <
                                        /div> < /
                                        div > <
                                        /div>
                                    )
                                }

                                { /* Staff Modal */ } {
                                    showStaffModal && ( <
                                            div style = {
                                                { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(4px)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }
                                            } >
                                            <
                                            div style = {
                                                { background: '#fff', borderRadius: 16, padding: '32px', width: '100%', maxWidth: 440, boxShadow: '0 24px 64px rgba(0,0,0,0.12)' }
                                            } >
                                            <
                                            div style = {
                                                { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }
                                            } >
                                            <
                                            h3 style = {
                                                { fontSize: 18, fontWeight: 700, color: '#1A1A1A' }
                                            } > Add Staff Member < /h3> <
                                            button onClick = {
                                                () => setShowStaffModal(false)
                                            }
                                            style = {
                                                { background: 'none', border: 'none', cursor: 'pointer', color: '#7A7A7A' }
                                            } > < X size = { 20 }
                                            /></button >
                                            <
                                            /div> <
                                            div style = {
                                                { display: 'flex', flexDirection: 'column', gap: 18 }
                                            } >
                                            <
                                            div >
                                            <
                                            label style = {
                                                { display: 'block', fontSize: 13, fontWeight: 600, color: '#1A1A1A', marginBottom: 6 }
                                            } > Full Name < /label> <
                                            input className = "input-field"
                                            value = { newStaff.name }
                                            onChange = { e => setNewStaff(f => ({...f, name: e.target.value })) }
                                            placeholder = "e.g. John Doe" / >
                                            <
                                            /div> <
                                            div >
                                            <
                                            label style = {
                                                { display: 'block', fontSize: 13, fontWeight: 600, color: '#1A1A1A', marginBottom: 6 }
                                            } > Role < /label> <
                                            select className = "input-field"
                                            value = { newStaff.role }
                                            onChange = { e => setNewStaff(f => ({...f, role: e.target.value })) } > {
                                                ['Manager', 'Head Barista', 'Barista', 'Chef', 'Server'].map(c => < option key = { c } > { c } < /option>)} < /
                                                    select > <
                                                    /div> <
                                                    div >
                                                    <
                                                    label style = {
                                                        { display: 'block', fontSize: 13, fontWeight: 600, color: '#1A1A1A', marginBottom: 6 }
                                                    } > Phone Number < /label> <
                                                    input className = "input-field"
                                                    value = { newStaff.phone }
                                                    onChange = { e => setNewStaff(f => ({...f, phone: e.target.value })) }
                                                    placeholder = "555-0123" / >
                                                    <
                                                    /div> <
                                                    div >
                                                    <
                                                    label style = {
                                                        { display: 'block', fontSize: 13, fontWeight: 600, color: '#1A1A1A', marginBottom: 6 }
                                                    } > Shift < /label> <
                                                    select className = "input-field"
                                                    value = { newStaff.shift }
                                                    onChange = { e => setNewStaff(f => ({...f, shift: e.target.value })) } > {
                                                        ['Morning', 'Afternoon', 'Evening'].map(c => < option key = { c } > { c } < /option>)} < /
                                                            select > <
                                                            /div> < /
                                                            div > <
                                                            div style = {
                                                                { display: 'flex', gap: 12, marginTop: 28 }
                                                            } >
                                                            <
                                                            button onClick = {
                                                                () => setShowStaffModal(false)
                                                            }
                                                            className = "btn-outline"
                                                            style = {
                                                                { flex: 1, justifyContent: 'center' }
                                                            } > Cancel < /button> <
                                                            button onClick = { handleSaveStaff }
                                                            className = "btn-dark"
                                                            style = {
                                                                { flex: 1, justifyContent: 'center' }
                                                            } >
                                                            <
                                                            Check size = { 15 }
                                                            /> Add Staff < /
                                                            button > <
                                                            /div> < /
                                                            div > <
                                                            /div>
                                                        )
                                                    }

                                                    <
                                                    /div>
                                                );
                                            }