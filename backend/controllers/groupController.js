const SocietyGroup = require('../models/SocietyGroup');
const Service = require('../models/Service');

// @desc    Join or Create a Society Group Buy
// @route   POST /api/groups/join
// @access  Private
const joinOrCreateModelGroup = async (req, res) => {
  try {
    const { serviceId, societyName, pincode } = req.body; // 👈 Ithe pincode add kela ahe
    const userId = req.user._id; // From protect middleware

    if (!pincode) {
      return res.status(400).json({ success: false, message: 'Pincode is required' });
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
      status: 'forming', // 👈 Lowercase 'forming' use kela ahe
      expiresAt: { $gt: new Date() } // Timer not expired
    });

    if (group) {
      // Check if user is already in the group
      const alreadyJoined = group.joinedUsers.includes(userId); // Schema pramane joinedUsers array
      if (alreadyJoined) {
        return res.status(400).json({ success: false, message: 'You have already joined this group-buy' });
      }

      // Add user to joinedUsers
      group.joinedUsers.push(userId);
      group.currentCount = group.joinedUsers.length;

      await group.save();

      return res.status(200).json({
        success: true,
        message: 'Successfully joined the existing group-buy!',
        data: group
      });
    } else {
      // Create a new group with 3-day expiry (72 hours)
      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + 72);

      group = await SocietyGroup.create({
        service: serviceId,
        societyName: societyName,
        pincode: pincode, // 👈 Ithe pincode pass kela ahe
        joinedUsers: [userId],
        targetCount: 3, // Multiples of 3 rule
        expiresAt: expiresAt,
        status: 'forming' // 👈 Lowercase 'forming' use kela ahe
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

// @desc    Get Group Details by ID
// @route   GET /api/groups/:id
// @access  Private
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