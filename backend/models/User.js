const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  societyName: { type: String, required: true },
  wing: { type: String }, // Flat/Wing number
  pincode: { type: String, required: true },
  role: { type: String, enum: ['customer', 'vendor', 'admin'], default: 'customer' },
  
  // Customerche swatahche electronic products list (Smart Inventory)
  ownedAppliances: [
    {
      deviceName: { type: String }, // ud. 'AC', 'Washing Machine', 'Water Purifier'
      brand: { type: String },     // ud. 'LG', 'Voltas', 'Eureka Forbes'
      lastServicedDate: { type: Date } // Shevatche servicing kadhi kele hote
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);