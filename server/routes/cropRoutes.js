import express from 'express';
import Crop from '../models/Crop.js';

const router = express.Router();

// GET all crops
router.get('/', async (req, res) => {
  try {
    const crops = await Crop.find().sort({ createdAt: 1 });
    res.json(crops);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving crops', error: error.message });
  }
});

// POST new crop
router.post('/', async (req, res) => {
  try {
    const { name, sciName, type, ph, water, temp, duration, yieldExpect, marketVal } = req.body;
    if (!name) {
      return res.status(400).json({ message: 'Crop name is required' });
    }

    const crop = new Crop({
      name,
      sciName,
      type,
      ph,
      water,
      temp,
      duration: Number(duration) || 90,
      yieldExpect: Number(yieldExpect) || 4.0,
      marketVal: Number(marketVal) || 1.0,
    });

    const saved = await crop.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: 'Error saving crop', error: error.message });
  }
});

// DELETE a crop
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Crop.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Crop not found' });
    res.json({ message: 'Crop deleted successfully', id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting crop', error: error.message });
  }
});

export default router;
