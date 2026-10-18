const express = require('express');
const router = express.Router();
const { authWithOtp, getUserProfile, updateAppliances } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/login-otp', authWithOtp);
router.get('/profile', protect, getUserProfile);
router.put('/appliances', protect, updateAppliances);

module.exports = router;