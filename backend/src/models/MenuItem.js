import mongoose from 'mongoose';

const menuItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        required: true,
        enum: ['Drinks', 'Food', 'Pastry', 'Cake', 'drinks', 'bakery', 'brunch']
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: ''
    }
}, { timestamps: true });

export const MenuItem = mongoose.model('MenuItem', menuItemSchema);
export default MenuItem;