import mongoose from 'mongoose';

const productionSchema = new mongoose.Schema(
  {
    cropName: { type: String, required: true },
    location: { type: String, required: true },
    harvestDate: { type: String, required: true },
    quantity: { type: Number, required: true },
    grade: { type: String, enum: ['A', 'B', 'C'], default: 'A' },
    revenue: { type: Number, required: true },
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

const Production = mongoose.model('Production', productionSchema);
export default Production;
