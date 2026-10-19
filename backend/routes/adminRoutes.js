const express = require('express');
const router = express.Router();
const { getAdminSummary, manualAssignJob } = require('../controllers/adminController'); // 👈 manualAssignJob import karne mahatvache ahe
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/summary', protect, admin, getAdminSummary);
router.post('/manual-assign', protect, admin, manualAssignJob);

module.exports = router;