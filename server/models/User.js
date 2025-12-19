const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6
  },
  phone: {
    type: String,
    trim: true
  },
  location: {
    type: String,
    trim: true
  },
  interests: [{
    type: String
  }],
  availability: {
    type: String,
    enum: ['weekdays', 'weekends', 'flexible'],
    default: 'flexible'
  },
  registeredOpportunities: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Opportunity'
  }],
  role: {
    type: String,
    enum: ['volunteer', 'organization', 'admin'],
    default: 'volunteer'
  }
}, {
  timestamps: true
});

// Replace the problematic pre-save hook with this safe async version:
userSchema.pre('save', async function () {
  // 'this' is the document being saved
  if (!this.isModified('password')) {
    // password not modified; nothing to do
    return;
  }

  const bcrypt = require('bcryptjs');
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);