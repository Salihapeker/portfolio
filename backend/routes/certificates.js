import express from 'express';
import Certificate from '../models/Certificate.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// GET /api/certificates - public
router.get('/', async (req, res) => {
  try {
    const certificates = await Certificate.find().sort({ order: 1, year: -1 });
    res.json({ success: true, data: certificates });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/certificates - admin
router.post('/', protect, async (req, res) => {
  try {
    const cert = await Certificate.create(req.body);
    res.status(201).json({ success: true, data: cert });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// PUT /api/certificates/:id - admin
router.put('/:id', protect, async (req, res) => {
  try {
    const cert = await Certificate.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!cert) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, data: cert });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// DELETE /api/certificates/:id - admin
router.delete('/:id', protect, async (req, res) => {
  try {
    const cert = await Certificate.findByIdAndDelete(req.params.id);
    if (!cert) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
