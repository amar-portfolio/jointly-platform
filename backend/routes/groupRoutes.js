const express = require('express');
const router = express.Router();
const { joinOrCreateModelGroup, getGroupDetails } = require('../controllers/groupController');
const { protect } = require('../middleware/authMiddleware');

router.post('/join', protect, joinOrCreateModelGroup);
router.get('/:id', protect, getGroupDetails);

module.exports = router;