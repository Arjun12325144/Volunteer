const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// Register User
exports.register = async (req, res,next) => {
  try {
    const { name, email, password, phone, location, interests, availability } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Email already registered' });
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password,
      phone,
      location,
      interests,
      availability
    });

    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        location: user.location,
        interests: user.interests,
        availability: user.availability
      },
      token
    });
  } catch (error) {
    // res.status(500).json({ success: false, message: error.message });
    next(error);
  }
};

// Login User
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const token = generateToken(user._id);

    res.json({
      success: true,
      message: 'Login successful',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        location: user.location,
        interests: user.interests,
        availability: user.availability
      },
      token
    });
  } catch (error) {
    // res.status(500).json({ success: false, message: error.message });
    next(error);
  }
};

// Get User Profile
exports.getProfile = async (req, res,next) => {
  try {
    const user = await User.findById(req.params.id)
      .select('-password')
      .populate('registeredOpportunities');
    
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({ success: true, user });
  } catch (error) {
    // res.status(500).json({ success: false, message: error.message });
    next(error);
  }
};

// Update User Profile
exports.updateProfile = async (req, res,next) => {
  try {
    const { name, phone, location, interests, availability } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.userId,
      { name, phone, location, interests, availability },
      { new: true, runValidators: true }
    ).select('-password');

    res.json({ success: true, message: 'Profile updated', user });
  } catch (error) {
    // res.status(500).json({ success: false, message: error.message });
    next(error);
  }
};

// Get Current User
exports.getCurrentUser = async (req, res,next) => {
  try {
    const user = await User.findById(req.userId)
      .select('-password')
      .populate('registeredOpportunities');
    
    res.json({ success: true, user });
  } catch (error) {
    // res.status(500).json({ success: false, message: error.message });
    next(error);
  }
};