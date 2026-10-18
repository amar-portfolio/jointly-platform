const express = require('express');
const router = express.Router();
const { getAllServices, createService } = require('../controllers/serviceController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

// Public route to view all services
router.get('/', getAllServices);

// Admin-only route to create a service
router.post('/', protect, adminOnly, createService);

module.exports = router;