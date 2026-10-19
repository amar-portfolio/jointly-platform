const mongoose = require('mongoose');

const societyGroupSchema = new mongoose.Schema({
  service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
  societyName: { type: String, required: true },
  pincode: { type: String, required: true },
  station: { type: String, required: true }, // 👈 Navin: Station-based dispatch sathi (ud. "Bhayander West")
  joinedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  targetCount: { type: Number, default: 3 }, // Multiples of 3 rule
  status: { type: String, enum: ['forming', 'locked', 'completed', 'expired'], default: 'forming' },
  expiresAt: { type: Date, required: true }, // 3-day countdown timer expiry
  
  // 👈 Navin Dispatch Fields (Station broadcast & Partner acceptance sathi)
  dispatchStatus: { 
    type: String, 
    enum: ['pending', 'broadcasted', 'accepted', 'unassigned'], 
    default: 'pending' 
  },
  assignedPartner: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Partner', 
    default: null 
  }
}, { timestamps: true });

module.exports = mongoose.model('SocietyGroup', societyGroupSchema);