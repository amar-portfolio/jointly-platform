const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  basePrice: { type: Number, required: true },
  advanceAmount: { type: Number, default: 299 },
  discountSlabs: [
    {
      minUsers: { type: Number, required: true },
      discountPercent: { type: Number, required: true }
    }
  ],
  image: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Service', serviceSchema);