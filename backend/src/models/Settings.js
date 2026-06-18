import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema({
  cafeName: { type: String, default: 'BrewManager Pro' },
  taxRate: { type: Number, default: 8.0 },
  contactEmail: { type: String, default: 'hello@brewmanager.com' },
}, { timestamps: true });

export const Settings = mongoose.model('Settings', settingsSchema);
export default Settings;
