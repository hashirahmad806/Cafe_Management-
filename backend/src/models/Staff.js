import mongoose from 'mongoose';

const staffSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  shift: { type: String, required: true },
  status: { type: String, required: true, default: 'Off Shift' },
  phone: { type: String, required: true }
}, { timestamps: true });

export const Staff = mongoose.model('Staff', staffSchema);
export default Staff;
