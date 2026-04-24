import mongoose from 'mongoose';

// Bilingual string - stores both English and Turkish
const bilingualString = {
  en: { type: String, required: true, trim: true },
  tr: { type: String, required: true, trim: true },
};

const bilingualArray = {
  en: [{ type: String, trim: true }],
  tr: [{ type: String, trim: true }],
};

const imageSchema = new mongoose.Schema({
  url: { type: String, required: true },
  publicId: { type: String, required: true }, // Cloudinary public_id (for deletion)
  caption: { type: String, default: '' },
}, { _id: true, timestamps: true });

const projectSchema = new mongoose.Schema(
  {
    title: bilingualString,
    role: bilingualString,
    description: bilingualString,
    highlights: bilingualArray,
    tech: [{ type: String, trim: true }], // Tech stack tags (language-agnostic)
    images: [imageSchema],
    liveUrl: { type: String, default: '' },
    githubUrl: { type: String, default: '' },
    featured: { type: Boolean, default: true },
    order: { type: Number, default: 0 }, // Display order
  },
  { timestamps: true }
);

projectSchema.index({ order: 1, createdAt: -1 });

const Project = mongoose.model('Project', projectSchema);
export default Project;
