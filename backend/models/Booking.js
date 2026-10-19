const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
  societyGroup: { type: mongoose.Schema.Types.ObjectId, ref: 'SocietyGroup', required: true },
  advanceAmount: { type: Number, required: true },
  discountApplied: { type: Number, default: 0 }, // Percentage e.g. 20, 30
  finalPrice: { type: Number, required: true },
  paymentStatus: { type: String, enum: ['pending', 'paid', 'refunded'], default: 'paid' },
  bookingStatus: { type: String, enum: ['confirmed', 'cancelled', 'completed'], default: 'confirmed' }
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);