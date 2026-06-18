import Table from '../models/Table.js';

export const getTables = async (req, res) => {
  try {
    let tables = await Table.find().sort('number');
    if (tables.length === 0) {
      // Seed tables on first run
      const SEED_TABLES = Array.from({ length: 12 }, (_, i) => ({
        number: i + 1,
        capacity: i < 4 ? 2 : i < 8 ? 4 : 6,
      }));
      tables = await Table.insertMany(SEED_TABLES);
    }
    res.json(tables);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateTable = async (req, res) => {
  try {
    const updated = await Table.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
