const mongoose = require('mongoose');

const opportunitySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  organization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organization',
    required: true
  },
  organizationName: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['Environment', 'Community Service', 'Animal Welfare', 'Education', 'Healthcare'],
    required: true
  },
  location: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  duration: {
    type: String
  },
  volunteers: {
    current: {
      type: Number,
      default: 0
    },
    required: {
      type: Number,
      required: true
    }
  },
  registeredVolunteers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  skills: [{
    type: String
  }],
  image: {
    type: String,
    default: '🌟'
  },
  status: {
    type: String,
    enum: ['active', 'completed', 'cancelled'],
    default: 'active'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Opportunity', opportunitySchema);