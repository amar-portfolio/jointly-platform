const mongoose = require('mongoose');

const societyGroupSchema = new mongoose.Schema({
  service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
  societyName: { type: String, required: true },
  pincode: { type: String, required: true },
  joinedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  targetCount: { type: Number, default: 3 }, // Multiples of 3 rule
  status: { type: String, enum: ['forming', 'locked', 'completed', 'expired'], default: 'forming' },
  expiresAt: { type: Date, required: true } // 3-day countdown timer expiry
}, { timestamps: true });

module.exports = mongoose.model('SocietyGroup', societyGroupSchema);