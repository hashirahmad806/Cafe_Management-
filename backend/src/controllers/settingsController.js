import Settings from '../models/Settings.js';

export const getSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({});
    }
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = new Settings(req.body);
    } else {
      settings.cafeName = req.body.cafeName || settings.cafeName;
      settings.taxRate = req.body.taxRate || settings.taxRate;
      settings.contactEmail = req.body.contactEmail || settings.contactEmail;
    }
    const updated = await settings.save();
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
