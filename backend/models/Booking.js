const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
  societyGroup: { type: mongoose.Schema.Types.ObjectId, ref: 'SocietyGroup' },
  bookingType: { type: String, enum: ['self', 'society_group'], required: true },
  amountPaid: { type: Number, required: true }, // e.g., ₹299 advance
  paymentId: { type: String },
  completionOtp: { type: String },
  status: { type: String, enum: ['pending', 'confirmed', 'completed', 'cancelled'], default: 'pending' }
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);