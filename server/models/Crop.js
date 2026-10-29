import mongoose from 'mongoose';

const cropSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    sciName: { type: String, default: '' },
    type: { type: String, enum: ['Grain', 'Vegetable', 'Fruit', 'Commercial'], default: 'Grain' },
    ph: { type: String, default: '6.0 - 7.0' },
    water: { type: String, default: 'Daily' },
    temp: { type: String, default: '20°C - 30°C' },
    duration: { type: Number, required: true, default: 90 },
    yieldExpect: { type: Number, required: true, default: 4.0 },
    marketVal: { type: Number, required: true, default: 1.0 },
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

const Crop = mongoose.model('Crop', cropSchema);
export default Crop;
