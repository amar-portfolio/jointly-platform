const SocietyGroup = require('../models/SocietyGroup');
const Partner = require('../models/Partner');

// @desc    Register a new Service Partner
// @route   POST /api/partners/register
// @access  Public (or Admin)
const registerPartner = async (req, res) => {
  try {
    const { name, phone, station, category } = req.body;

    const partnerExists = await Partner.findOne({ phone });
    if (partnerExists) {
      return res.status(400).json({ success: false, message: 'Partner already registered with this phone number' });
    }

    const partner = await Partner.create({
      name,
      phone,
      station,
      category
    });

    res.status(201).json({
      success: true,
      message: 'Partner registered successfully!',
      data: partner
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get available broadcasted jobs for a partner based on their station & category
// @route   GET /api/partners/jobs/:partnerId
// @access  Public/Partner
const getAvailableJobs = async (req, res) => {
  try {
    const { partnerId } = req.params;
    const partner = await Partner.findById(partnerId);
    
    if (!partner) {
      return res.status(404).json({ success: false, message: 'Partner not found' });
    }

    // Find groups matching the partner's station and service category
    const jobs = await SocietyGroup.find({
      station: partner.station,
      service: partner.category,
      dispatchStatus: { $in: ['pending', 'broadcasted'] }
    }).populate('service', 'title basePrice');

    res.status(200).json({
      success: true,
      count: jobs.length,
      data: jobs
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Accept a broadcasted job (First-Come-First-Serve logic)
// @route   POST /api/partners/accept
// @access  Public/Partner
const acceptJob = async (req, res) => {
  try {
    const { groupId, partnerId } = req.body;

    const group = await SocietyGroup.findById(groupId);
    if (!group) {
      return res.status(404).json({ success: false, message: 'Society Group not found' });
    }

    // Check if another partner has already accepted this job
    if (group.dispatchStatus === 'accepted' || group.assignedPartner) {
      return res.status(400).json({ 
        success: false, 
        message: 'Oops! This job has already been accepted by another partner.' 
      });
    }

    const partner = await Partner.findById(partnerId);
    if (!partner) {
      return res.status(404).json({ success: false, message: 'Partner not found' });
    }

    // Assign the job to this partner
    group.assignedPartner = partnerId;
    group.dispatchStatus = 'accepted';
    await group.save();

    res.status(200).json({
      success: true,
      message: 'Job successfully accepted! Assigned to you.',
      data: group
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  registerPartner,
  getAvailableJobs,
  acceptJob
};