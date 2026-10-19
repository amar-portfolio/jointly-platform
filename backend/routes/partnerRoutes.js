const express = require('express');
const router = express.Router();
const { 
  registerPartner, 
  getAvailableJobs, 
  acceptJob 
} = require('../controllers/partnerController');

router.post('/register', registerPartner);
router.get('/jobs/:partnerId', getAvailableJobs);
router.post('/accept', acceptJob);

module.exports = router;