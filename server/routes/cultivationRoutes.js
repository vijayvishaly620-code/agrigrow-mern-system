import express from 'express';
import Cultivation from '../models/Cultivation.js';

const router = express.Router();

// GET all cultivations
router.get('/', async (req, res) => {
  try {
    const cultivations = await Cultivation.find().sort({ createdAt: -1 });
    res.json(cultivations);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving cultivations', error: error.message });
  }
});

// POST new cultivation
router.post('/', async (req, res) => {
  try {
    const { cropId, cropName, location, plantedDate, expectedHarvest, stage, status, logs } = req.body;
    if (!cropId || !cropName || !location || !plantedDate) {
      return res.status(400).json({ message: 'Missing required cultivation fields' });
    }

    const cultivation = new Cultivation({
      cropId,
      cropName,
      location,
      plantedDate,
      expectedHarvest: expectedHarvest || plantedDate,
      stage: stage || 'Planted',
      status: status || 'Growing',
      logs: logs && logs.length > 0 ? logs : ['Initial sowing recorded successfully'],
    });

    const saved = await cultivation.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: 'Error creating cultivation', error: error.message });
  }
});

// PATCH cultivation (update stage, append log, or update status)
router.patch('/:id', async (req, res) => {
  try {
    const { stage, status, logMessage, logs } = req.body;
    const cultivation = await Cultivation.findById(req.params.id);
    if (!cultivation) {
      return res.status(404).json({ message: 'Cultivation record not found' });
    }

    if (stage) cultivation.stage = stage;
    if (status) cultivation.status = status;
    if (logMessage) {
      cultivation.logs.unshift(logMessage);
    } else if (logs) {
      cultivation.logs = logs;
    }

    const updated = await cultivation.save();
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: 'Error updating cultivation', error: error.message });
  }
});

// DELETE a cultivation
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Cultivation.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Cultivation record not found' });
    res.json({ message: 'Cultivation record deleted successfully', id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting cultivation', error: error.message });
  }
});

export default router;
