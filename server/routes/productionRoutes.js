import express from 'express';
import Production from '../models/Production.js';

const router = express.Router();

// GET all production records
router.get('/', async (req, res) => {
  try {
    const records = await Production.find().sort({ createdAt: -1 });
    res.json(records);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving production records', error: error.message });
  }
});

// POST new harvest production record
router.post('/', async (req, res) => {
  try {
    const { cropName, location, harvestDate, quantity, grade, revenue } = req.body;
    if (!cropName || !quantity) {
      return res.status(400).json({ message: 'Crop name and quantity are required' });
    }

    const record = new Production({
      cropName,
      location: location || 'Field Plot',
      harvestDate: harvestDate || new Date().toISOString().split('T')[0],
      quantity: Number(quantity),
      grade: grade || 'A',
      revenue: Number(revenue) || 0,
    });

    const saved = await record.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: 'Error saving harvest record', error: error.message });
  }
});

// DELETE a harvest record
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Production.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Production record not found' });
    res.json({ message: 'Production record deleted successfully', id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting harvest record', error: error.message });
  }
});

export default router;
