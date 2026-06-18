import Staff from '../models/Staff.js';

export const getStaff = async (req, res) => {
  try {
    const staff = await Staff.find();
    res.json(staff);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addStaff = async (req, res) => {
  try {
    const newStaff = new Staff(req.body);
    const saved = await newStaff.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteStaff = async (req, res) => {
  try {
    await Staff.findByIdAndDelete(req.params.id);
    res.json({ message: 'Staff removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
