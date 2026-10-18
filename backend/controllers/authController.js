const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'fallback_secret', { expiresIn: '30d' });
};

// @desc    Login or Register with Phone & OTP
// @route   POST /api/auth/login-otp
const authWithOtp = async (req, res) => {
  try {
    const { phone, otp, name, societyName, wing, pincode } = req.body;

    if (!phone) {
      return res.status(400).json({ message: 'Phone number is required' });
    }

    // Mock OTP Verification (Default OTP is '1234' for development)
    if (otp && otp !== '1234') {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    let user = await User.findOne({ phone });

    if (!user) {
      // If user does not exist, register them automatically
      if (!name || !societyName || !pincode) {
        return res.status(400).json({ message: 'Name, societyName, and pincode are required for new registration' });
      }
      user = await User.create({
        name,
        phone,
        societyName,
        wing: wing || '',
        pincode,
        role: 'customer',
        ownedAppliances: []
      });
    }

    res.json({
      _id: user._id,
      name: user.name,
      phone: user.phone,
      societyName: user.societyName,
      wing: user.wing,
      pincode: user.pincode,
      role: user.role,
      ownedAppliances: user.ownedAppliances,
      token: generateToken(user._id)
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get Current User Profile
// @route   GET /api/auth/profile
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Update Customer Household Appliances Inventory
// @route   PUT /api/auth/appliances
const updateAppliances = async (req, res) => {
  try {
    const { ownedAppliances } = req.body;
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.ownedAppliances = ownedAppliances || user.ownedAppliances;
    const updatedUser = await user.save();

    res.json({
      message: 'Appliances inventory updated successfully',
      ownedAppliances: updatedUser.ownedAppliances
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = { authWithOtp, getUserProfile, updateAppliances };