import mongoose from 'mongoose';

const tableSchema = new mongoose.Schema({
  number: { type: Number, required: true, unique: true },
  status: { type: String, enum: ['Available', 'Occupied', 'Reserved'], default: 'Available' },
  capacity: { type: Number, required: true },
  currentBill: { type: Number, default: 0 }
}, { timestamps: true });

export const Table = mongoose.model('Table', tableSchema);
export default Table;
