import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import cropRoutes from './routes/cropRoutes.js';
import cultivationRoutes from './routes/cultivationRoutes.js';
import productionRoutes from './routes/productionRoutes.js';
import { seedDatabase } from './seed.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/agrigrow_db';

// Middlewares
app.use(cors());
app.use(express.json());

// API Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString(),
    system: 'AgriGrow MERN Backend'
  });
});

// REST Routes
app.use('/api/crops', cropRoutes);
app.use('/api/cultivations', cultivationRoutes);
app.use('/api/production', productionRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('API Error:', err);
  res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

// Connect to MongoDB and start Express server
mongoose
  .connect(MONGO_URI)
  .then(async () => {
    console.log('✅ Successfully connected to MongoDB database: agrigrow_db');
    // Seed initial data if empty
    await seedDatabase();
    app.listen(PORT, () => {
      console.log(`🌾 AgriGrow MERN Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Failed to connect to MongoDB:', err.message);
    process.exit(1);
  });
