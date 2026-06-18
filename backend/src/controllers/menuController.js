import MenuItem from '../models/MenuItem.js';

const SEED_ITEMS = [
    { name: 'Espresso', price: 250, category: 'Drinks', description: 'A rich, full-bodied single shot pulled from our signature dark-roast blend. Bold, intense, and perfectly extracted.', image: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=500&q=85' },
    { name: 'Cappuccino', price: 350, category: 'Drinks', description: 'A velvety double espresso crowned with equal parts steamed and frothed milk. Silky and perfectly balanced.', image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=500&q=85' },
    { name: 'Latte', price: 400, category: 'Drinks', description: 'Smooth espresso blended with a generous pour of velvety steamed milk, topped with a delicate latte art rosetta.', image: 'https://images.unsplash.com/photo-1561882468-9110d70d0283?w=500&q=85' },
    { name: 'Americano', price: 300, category: 'Drinks', description: 'Double shots of espresso diluted with hot water to create a smooth, bold coffee experience without bitterness.', image: 'https://images.unsplash.com/photo-1551030173-122aabc4489c?w=500&q=85' },
    { name: 'Fresh Juice', price: 350, category: 'Drinks', description: 'Cold-pressed daily from a rotating selection of fresh seasonal fruits. Ask your server for today\'s blend.', image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=500&q=85' },
    { name: 'Mineral Water', price: 100, category: 'Drinks', description: 'Chilled still or sparkling mineral water sourced from natural springs. Pure, crisp, and refreshing.', image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=500&q=85' },
    { name: 'Club Sandwich', price: 550, category: 'Food', description: 'Triple-decker toasted bread layered with grilled chicken, crispy bacon, fresh lettuce, tomato, and house mayo.', image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=500&q=85' },
    { name: 'Chicken Burger', price: 650, category: 'Food', description: 'Juicy grilled chicken breast in a brioche bun with house sauce, pickled onions, cheddar and fresh greens.', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=85' },
    { name: 'French Fries', price: 300, category: 'Food', description: 'Golden, hand-cut potato fries fried twice for maximum crunch. Served with our signature seasoning and dip.', image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500&q=85' },
    { name: 'Chocolate Brownie', price: 250, category: 'Food', description: 'Fudgy, warm dark-chocolate brownie baked fresh daily. Dense, decadent, and served with vanilla cream.', image: 'https://images.unsplash.com/photo-1564355808539-22fda35bed7e?w=500&q=85' },
    { name: 'Chocolate Truffle Cake', price: 450, category: 'Cake', description: 'Decadent triple-layer dark chocolate cake with silky ganache and chocolate truffles. Rich, indulgent, and irresistible.', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&q=85' },
    { name: 'Cheesecake', price: 400, category: 'Cake', description: 'Creamy New York-style cheesecake with a buttery graham cracker crust and berry compote topping. Smooth and satisfying.', image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=500&q=85' },
];

export const getMenuItems = async(req, res) => {
    try {
        let items = await MenuItem.find();
        // Auto-seed if the database is currently empty
        if (items.length === 0) {
            console.log('[Database] Collection empty. Seeding default cafe items...');
            items = await MenuItem.insertMany(SEED_ITEMS);
        }
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createMenuItem = async(req, res) => {
    try {
        const newItem = new MenuItem(req.body);
        const savedItem = await newItem.save();
        res.status(201).json(savedItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateMenuItem = async(req, res) => {
    try {
        const updated = await MenuItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteMenuItem = async(req, res) => {
    try {
        await MenuItem.findByIdAndDelete(req.params.id);
        res.json({ message: 'Menu item removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};