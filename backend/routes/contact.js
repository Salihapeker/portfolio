import express from 'express';
import rateLimit from 'express-rate-limit';
import { body, validationResult } from 'express-validator';
import nodemailer from 'nodemailer';
import Message from '../models/Message.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { success: false, message: 'Too many requests. Try again later.' },
});

const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

// POST /api/contact - public, submit form
router.post(
  '/',
  contactLimiter,
  [
    body('name').trim().isLength({ min: 2, max: 100 }).escape(),
    body('email').trim().isEmail().normalizeEmail(),
    body('subject').trim().isLength({ min: 3, max: 200 }).escape(),
    body('message').trim().isLength({ min: 10, max: 2000 }).escape(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { name, email, subject, message } = req.body;
    const ip = req.ip || req.headers['x-forwarded-for'] || '';

    try {
      // Save to database
      await Message.create({ name, email, subject, message, ip });

      // Try to send email (non-blocking — even if email fails, message is saved)
      if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
        try {
          const transporter = createTransporter();

          await transporter.sendMail({
            from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER,
            replyTo: email,
            subject: `[Portfolio] ${subject}`,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #0a0a0a; color: #fff;">
                <div style="border-left: 4px solid #3B82F6; padding-left: 20px;">
                  <h2 style="color: #3B82F6; margin: 0 0 20px 0;">New Contact Message</h2>
                  <p><strong>Name:</strong> ${name}</p>
                  <p><strong>Email:</strong> ${email}</p>
                  <p><strong>Subject:</strong> ${subject}</p>
                  <div style="margin-top: 20px; padding: 15px; background: #1a1a1a; border-radius: 8px;">
                    <p style="margin: 0; white-space: pre-wrap;">${message}</p>
                  </div>
                </div>
              </div>
            `,
          });

          // Auto reply
          await transporter.sendMail({
            from: `"Saliha Peker" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'Thank you for reaching out!',
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <h2 style="color: #3B82F6;">Hi ${name},</h2>
                <p>Thanks for your message! I've received it and will get back to you as soon as possible.</p>
                <p>Best regards,<br><strong>Saliha Peker</strong><br>Computer Engineer</p>
              </div>
            `,
          });
        } catch (emailError) {
          console.error('Email send warning:', emailError.message);
          // Still return success since message is saved
        }
      }

      res.json({ success: true, message: 'Message sent successfully!' });
    } catch (error) {
      console.error('Contact error:', error);
      res.status(500).json({ success: false, message: 'Failed to send. Try again later.' });
    }
  }
);

// GET /api/contact - admin, list all messages
router.get('/', protect, async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json({ success: true, data: messages });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /api/contact/:id/read - admin, mark as read
router.put('/:id/read', protect, async (req, res) => {
  try {
    const msg = await Message.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );
    res.json({ success: true, data: msg });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /api/contact/:id - admin
router.delete('/:id', protect, async (req, res) => {
  try {
    await Message.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
