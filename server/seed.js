import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Crop from './models/Crop.js';
import Cultivation from './models/Cultivation.js';
import Production from './models/Production.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/agrigrow_db';

const INITIAL_CROPS = [
  { name: 'Paddy / Rice (Nellu)', sciName: 'Oryza sativa', type: 'Grain', ph: '5.5 - 6.5', water: 'Daily', temp: '22°C - 38°C', duration: 120, yieldExpect: 4.5, marketVal: 0.60 },
  { name: 'Finger Millet (Ragi)', sciName: 'Eleusine coracana', type: 'Grain', ph: '5.0 - 8.0', water: 'Bi-weekly', temp: '20°C - 34°C', duration: 110, yieldExpect: 2.8, marketVal: 0.45 },
  { name: 'Sugarcane (Karumbu)', sciName: 'Saccharum officinarum', type: 'Grain', ph: '6.0 - 7.5', water: 'Every 2 days', temp: '20°C - 35°C', duration: 300, yieldExpect: 15.0, marketVal: 0.25 },
  { name: 'Erode Turmeric (Manjal)', sciName: 'Curcuma longa', type: 'Vegetable', ph: '5.5 - 7.5', water: 'Weekly', temp: '20°C - 30°C', duration: 270, yieldExpect: 3.5, marketVal: 1.80 },
  { name: 'Coorg Robusta Coffee', sciName: 'Coffea canephora', type: 'Fruit', ph: '5.0 - 6.5', water: 'Every 3 days', temp: '15°C - 26°C', duration: 240, yieldExpect: 1.2, marketVal: 4.20 },
  { name: 'Nilgiri Tea', sciName: 'Camellia sinensis', type: 'Fruit', ph: '4.5 - 5.5', water: 'Every 2 days', temp: '12°C - 25°C', duration: 180, yieldExpect: 2.1, marketVal: 3.80 },
  { name: 'Malabar Black Pepper', sciName: 'Piper nigrum', type: 'Fruit', ph: '5.5 - 6.5', water: 'Every 2 days', temp: '22°C - 32°C', duration: 240, yieldExpect: 0.8, marketVal: 6.50 },
  { name: 'Grand Naine Banana (Vazhai)', sciName: 'Musa acuminata', type: 'Fruit', ph: '6.0 - 7.5', water: 'Daily', temp: '20°C - 35°C', duration: 300, yieldExpect: 8.5, marketVal: 0.50 }
];

export async function seedDatabase() {
  try {
    const cropCount = await Crop.countDocuments();
    if (cropCount === 0) {
      console.log('Seeding initial crops into MongoDB...');
      const createdCrops = await Crop.insertMany(INITIAL_CROPS);

      // Seed sample cultivations using the created crop IDs
      const paddy = createdCrops.find(c => c.name.includes('Paddy'));
      const turmeric = createdCrops.find(c => c.name.includes('Turmeric'));
      const coffee = createdCrops.find(c => c.name.includes('Coffee'));
      const ragi = createdCrops.find(c => c.name.includes('Ragi'));
      const sugarcane = createdCrops.find(c => c.name.includes('Sugarcane'));

      await Cultivation.insertMany([
        {
          cropId: paddy ? paddy.id : '1',
          cropName: 'Paddy / Rice (Nellu)',
          location: 'Tanjore Wetlands Block A',
          plantedDate: '2026-05-10',
          stage: 'Ready to Harvest',
          status: 'Growing',
          expectedHarvest: '2026-09-07',
          logs: ['Transplanted saplings', 'Weeded fields', 'Irrigation channels flooded']
        },
        {
          cropId: turmeric ? turmeric.id : '4',
          cropName: 'Erode Turmeric (Manjal)',
          location: 'Salem Sector 2',
          plantedDate: '2026-06-15',
          stage: 'Flowering',
          status: 'Growing',
          expectedHarvest: '2026-09-03',
          logs: ['Rhizomes planted', 'Organic compost added', 'Ridge weeding run']
        },
        {
          cropId: coffee ? coffee.id : '5',
          cropName: 'Coorg Robusta Coffee',
          location: 'Wayanad Slopes B',
          plantedDate: '2026-07-01',
          stage: 'Vegetative',
          status: 'Growing',
          expectedHarvest: '2026-09-14',
          logs: ['Pruned shade trees', 'Foliar nutrition spray done']
        }
      ]);

      await Production.insertMany([
        {
          cropName: ragi ? ragi.name : 'Finger Millet (Ragi)',
          location: 'Tumkur Drylands',
          harvestDate: '2026-07-28',
          quantity: 2400,
          grade: 'A',
          revenue: 1080
        },
        {
          cropName: sugarcane ? sugarcane.name : 'Sugarcane (Karumbu)',
          location: 'Mandya Fields A',
          harvestDate: '2026-08-02',
          quantity: 18000,
          grade: 'B',
          revenue: 4500
        }
      ]);

      console.log('MongoDB Seed complete! Sample crops, plots, and harvest records created.');
    } else {
      console.log(`Database already has ${cropCount} crops. Skipping auto-seed.`);
    }
  } catch (error) {
    console.error('Seeding error:', error.message);
  }
}

// If run directly: node seed.js
if (process.argv[1]?.endsWith('seed.js')) {
  mongoose.connect(MONGO_URI)
    .then(async () => {
      console.log('Connected to MongoDB for direct seeding...');
      await seedDatabase();
      await mongoose.disconnect();
      console.log('Disconnected from MongoDB.');
      process.exit(0);
    })
    .catch((err) => {
      console.error('MongoDB connection error:', err);
      process.exit(1);
    });
}
