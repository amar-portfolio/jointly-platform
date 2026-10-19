const Booking = require('../models/Booking');
const SocietyGroup = require('../models/SocietyGroup');
const Service = require('../models/Service');

// @desc    Create Booking & Process Advance Payment with Admin-Set Dynamic Slabs & Auto-Lock
// @route   POST /api/bookings
// @access  Private
const createBooking = async (req, res) => {
  try {
    const { societyGroupId } = req.body;
    const userId = req.user._id;

    // 1. Find the Society Group & populate the Service
    const group = await SocietyGroup.findById(societyGroupId).populate('service');
    if (!group) {
      return res.status(404).json({ success: false, message: 'Society group not found' });
    }

    // Check if group is already locked
    if (group.status === 'locked') {
      return res.status(400).json({ success: false, message: 'This group-buy window is already locked.' });
    }

    const service = group.service;
    if (!service) {
      return res.status(404).json({ success: false, message: 'Associated service not found' });
    }

    // 2. Check if user has joined this group
    if (!group.joinedUsers.includes(userId)) {
      return res.status(400).json({ success: false, message: 'You must join the group before booking' });
    }

    // 3. Check if user already booked for this group
    const existingBooking = await Booking.findOne({ user: userId, societyGroup: societyGroupId });
    if (existingBooking) {
      return res.status(400).json({ success: false, message: 'Booking already exists for this group' });
    }

    // 4. Dynamic Calculation based on Admin-configured Slabs & Current Member Count
    const currentCount = group.joinedUsers.length;

    const applicableSlab = service.discountSlabs
      .filter(slab => currentCount >= slab.minUsers)
      .sort((a, b) => b.minUsers - a.minUsers)[0]; 

    const discountPercent = applicableSlab ? applicableSlab.discountPercent : 0;
    const finalPrice = service.basePrice * (1 - discountPercent / 100);
    const advanceAmount = service.advanceAmount;

    // 5. Create Booking Record
    const booking = await Booking.create({
      user: userId,
      service: service._id,
      societyGroup: societyGroupId,
      advanceAmount: advanceAmount,
      discountApplied: discountPercent,
      finalPrice: finalPrice,
      paymentStatus: 'paid',
      bookingStatus: 'confirmed'
    });

    // 6. 🔥 DAY 6 FEATURE: Check if Target Count is reached, then Auto-Lock the Group
    const confirmedBookingsCount = await Booking.countDocuments({ societyGroup: societyGroupId, bookingStatus: 'confirmed' });
    
    if (confirmedBookingsCount >= group.targetCount) {
      group.status = 'locked';
      await group.save();
    }

    res.status(201).json({
      success: true,
      message: 'Booking created successfully with dynamic pricing & auto-lock check!',
      data: {
        bookingId: booking._id,
        serviceTitle: service.title,
        basePrice: service.basePrice,
        advanceAmountPaid: advanceAmount,
        discountAppliedPercent: discountPercent,
        finalPricePerUser: finalPrice,
        totalBookingsInGroup: confirmedBookingsCount,
        groupStatus: group.status
      }
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate('service')
      .populate('societyGroup');

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createBooking,
  getUserBookings
};