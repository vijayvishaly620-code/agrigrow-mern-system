import mongoose from 'mongoose';

const cultivationSchema = new mongoose.Schema(
  {
    cropId: { type: String, required: true },
    cropName: { type: String, required: true },
    location: { type: String, required: true },
    plantedDate: { type: String, required: true },
    stage: {
      type: String,
      enum: ['Planted', 'Germination', 'Vegetative', 'Flowering', 'Ready to Harvest', 'Harvested'],
      default: 'Planted',
    },
    status: {
      type: String,
      enum: ['Growing', 'Harvested', 'Failed'],
      default: 'Growing',
    },
    expectedHarvest: { type: String, required: true },
    logs: [{ type: String }],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        ret.id = ret._id.toString();
        delete ret.__v;
        return ret;
      },
    },
  }
);

const Cultivation = mongoose.model('Cultivation', cultivationSchema);
export default Cultivation;
