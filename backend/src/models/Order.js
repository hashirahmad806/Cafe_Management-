import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  menuItem: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'MenuItem',
    required: false // Optional if menu item gets deleted but we want to retain historic logs
  },
  name: {
    type: String,
    required: true
  },
  quantity: { 
    type: Number, 
    required: true, 
    min: 1 
  }
});

const orderSchema = new mongoose.Schema({
  customerName: { 
    type: String, 
    required: true, 
    trim: true 
  },
  tableNumber: { 
    type: Number, 
    required: true 
  },
  status: { 
    type: String, 
    required: true, 
    enum: ['pending', 'preparing', 'completed', 'cancelled'], 
    default: 'pending' 
  },
  items: [orderItemSchema],
  totalAmount: { 
    type: Number, 
    required: true, 
    min: 0 
  },
  specialNotes: {
    type: String,
    trim: true,
    default: ''
  },
  paymentMethod: {
    type: String,
    enum: ['counter', 'now'],
    default: 'counter'
  }
}, { timestamps: true });

export const Order = mongoose.model('Order', orderSchema);
export default Order;
