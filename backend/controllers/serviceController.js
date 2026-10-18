const Service = require('../models/Service');

// @desc    Get all available services
// @route   GET /api/services
// @access  Public
const getAllServices = async (req, res) => {
  try {
    const services = await Service.find({});
    res.status(200).json({
      success: true,
      count: services.length,
      data: services
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create a new service (Admin Only)
// @route   POST /api/services
// @access  Private/Admin
const createService = async (req, res) => {
  try {
    const { title, description, category, basePrice, advanceAmount, discountSlabs, estimatedDuration } = req.body;

    const service = await Service.create({
      title,
      description,
      category,
      basePrice,
      advanceAmount,
      discountSlabs,
      estimatedDuration
    });

    res.status(201).json({
      success: true,
      message: 'Service created successfully',
      data: service
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getAllServices,
  createService
};