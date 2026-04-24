import mongoose from 'mongoose';

const certificateSchema = new mongoose.Schema(
  {
    title: {
      en: { type: String, required: true, trim: true },
      tr: { type: String, required: true, trim: true },
    },
    issuer: { type: String, required: true, trim: true },
    year: { type: String, required: true, trim: true },
    credentialUrl: { type: String, default: '' },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

certificateSchema.index({ order: 1, year: -1 });

const Certificate = mongoose.model('Certificate', certificateSchema);
export default Certificate;
