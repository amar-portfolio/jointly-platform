const SocietyGroup = require('../models/SocietyGroup');
const Booking = require('../models/Booking');
const Partner = require('../models/Partner');

// @desc    Get Admin Revenue & Dashboard Summary
// @route   GET /api/admin/summary
// @access  Private/Admin
const getAdminSummary = async (req, res) => {
  try {
    const totalGroups = await SocietyGroup.countDocuments();
    const activeGroups = await SocietyGroup.countDocuments({ status: 'forming' });
    const lockedGroups = await SocietyGroup.countDocuments({ status: 'locked' });
    
    const totalBookings = await Booking.countDocuments({ bookingStatus: 'confirmed' });
    
    // Calculate total advance collected across all confirmed bookings
    const bookings = await Booking.find({ bookingStatus: 'confirmed' });
    const totalAdvanceCollected = bookings.reduce((acc, curr) => acc + curr.advanceAmount, 0);

    res.status(200).json({
      success: true,
      data: {
        totalGroups,
        activeGroups,
        lockedGroups,
        totalBookings,
        totalAdvanceCollected
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Admin manual fallback override to assign a partner to a locked group
// @route   POST /api/admin/manual-assign
// @access  Private/Admin
const manualAssignJob = async (req, res) => {
  try {
    const { groupId, partnerId } = req.body;

    const group = await SocietyGroup.findById(groupId);
    if (!group) {
      return res.status(404).json({ success: false, message: 'Society Group not found' });
    }

    const partner = await Partner.findById(partnerId);
    if (!partner) {
      return res.status(404).json({ success: false, message: 'Partner not found' });
    }

    // Forcefully assign partner and update dispatch status
    group.assignedPartner = partnerId;
    group.dispatchStatus = 'accepted';
    await group.save();

    res.status(200).json({
      success: true,
      message: 'Job manually assigned to partner by Admin successfully!',
      data: group
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getAdminSummary,
  manualAssignJob
};