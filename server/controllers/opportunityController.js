const Opportunity = require('../models/Opportunity');
const User = require('../models/User');

// Get All Opportunities
exports.getAllOpportunities = async (req, res) => {
  try {
    const { category, location, search } = req.query;
    
    let query = { status: 'active' };
    
    if (category && category !== 'All') {
      query.category = category;
    }
    
    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { organizationName: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const opportunities = await Opportunity.find(query)
      .populate('organization')
      .sort({ date: 1 });

    res.json({ success: true, opportunities });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Single Opportunity
exports.getOpportunityById = async (req, res) => {
  try {
    const opportunity = await Opportunity.findById(req.params.id)
      .populate('organization')
      .populate('registeredVolunteers', 'name email');

    if (!opportunity) {
      return res.status(404).json({ success: false, message: 'Opportunity not found' });
    }

    res.json({ success: true, opportunity });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create Opportunity
exports.createOpportunity = async (req, res) => {
  try {
    const opportunity = await Opportunity.create(req.body);
    res.status(201).json({ success: true, message: 'Opportunity created', opportunity });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Sign Up for Opportunity
exports.signUpForOpportunity = async (req, res) => {
  try {
    const opportunity = await Opportunity.findById(req.params.id);
    
    if (!opportunity) {
      return res.status(404).json({ success: false, message: 'Opportunity not found' });
    }

    // Check if already registered
    if (opportunity.registeredVolunteers.includes(req.userId)) {
      return res.status(400).json({ success: false, message: 'Already registered' });
    }

    // Check if full
    if (opportunity.volunteers.current >= opportunity.volunteers.required) {
      return res.status(400).json({ success: false, message: 'Opportunity is full' });
    }

    // Add volunteer
    opportunity.registeredVolunteers.push(req.userId);
    opportunity.volunteers.current += 1;
    await opportunity.save();

    // Update user
    await User.findByIdAndUpdate(req.userId, {
      $push: { registeredOpportunities: opportunity._id }
    });

    res.json({ success: true, message: 'Successfully signed up', opportunity });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Cancel Registration
exports.cancelRegistration = async (req, res) => {
  try {
    const opportunity = await Opportunity.findById(req.params.id);
    
    if (!opportunity) {
      return res.status(404).json({ success: false, message: 'Opportunity not found' });
    }

    // Check if user is registered
    if (!opportunity.registeredVolunteers.includes(req.userId)) {
      return res.status(400).json({ success: false, message: 'You are not registered for this opportunity' });
    }

    // Remove volunteer
    opportunity.registeredVolunteers = opportunity.registeredVolunteers.filter(
      id => id.toString() !== req.userId.toString()
    );
    opportunity.volunteers.current -= 1;
    await opportunity.save();

    // Update user
    await User.findByIdAndUpdate(req.userId, {
      $pull: { registeredOpportunities: opportunity._id }
    });

    res.json({ success: true, message: 'Registration cancelled', opportunity });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update Opportunity
exports.updateOpportunity = async (req, res) => {
  try {
    const opportunity = await Opportunity.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!opportunity) {
      return res.status(404).json({ success: false, message: 'Opportunity not found' });
    }

    res.json({ success: true, message: 'Opportunity updated', opportunity });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete Opportunity
exports.deleteOpportunity = async (req, res) => {
  try {
    const opportunity = await Opportunity.findByIdAndDelete(req.params.id);

    if (!opportunity) {
      return res.status(404).json({ success: false, message: 'Opportunity not found' });
    }

    res.json({ success: true, message: 'Opportunity deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};