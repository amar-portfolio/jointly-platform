const SocietyGroup = require('../models/SocietyGroup');
const Service = require('../models/Service');

// @desc    Join or Create a Society Group Buy
// @route   POST /api/groups/join
// @access  Private
const joinOrCreateModelGroup = async (req, res) => {
  try {
    const { serviceId, societyName, pincode, station } = req.body; // 👈 Station add kela ahe
    const userId = req.user._id;

    if (!pincode || !station) {
      return res.status(400).json({ success: false, message: 'Pincode and Station are required' });
    }

    // Check if service exists
    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({ success: false, message: 'Service not found' });
    }

    // Check if an active group already exists for this society and service
    let group = await SocietyGroup.findOne({
      service: serviceId,
      societyName: societyName,
      status: 'forming',
      expiresAt: { $gt: new Date() }
    });

    if (group) {
      const alreadyJoined = group.joinedUsers.includes(userId);
      if (alreadyJoined) {
        return res.status(400).json({ success: false, message: 'You have already joined this group-buy' });
      }

      group.joinedUsers.push(userId);
      await group.save();

      return res.status(200).json({
        success: true,
        message: 'Successfully joined the existing group-buy!',
        data: group
      });
    } else {
      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + 72);

      group = await SocietyGroup.create({
        service: serviceId,
        societyName: societyName,
        pincode: pincode,
        station: station, // 👈 Station save hotoy
        joinedUsers: [userId],
        targetCount: 3,
        expiresAt: expiresAt,
        status: 'forming'
      });

      return res.status(201).json({
        success: true,
        message: 'New group-buy created successfully! 3-day timer started.',
        data: group
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getGroupDetails = async (req, res) => {
  try {
    const group = await SocietyGroup.findById(req.params.id)
      .populate('service')
      .populate('joinedUsers', 'name phone wing');

    if (!group) {
      return res.status(404).json({ success: false, message: 'Group not found' });
    }

    res.status(200).json({
      success: true,
      data: group
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  joinOrCreateModelGroup,
  getGroupDetails
};