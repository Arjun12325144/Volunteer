const Organization = require('../models/Organization');

// Get All Organizations
exports.getAllOrganizations = async (req, res) => {
  try {
    const organizations = await Organization.find();
    res.json({ success: true, organizations });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Single Organization
exports.getOrganizationById = async (req, res) => {
  try {
    const organization = await Organization.findById(req.params.id);
    
    if (!organization) {
      return res.status(404).json({ success: false, message: 'Organization not found' });
    }

    res.json({ success: true, organization });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create Organization
exports.createOrganization = async (req, res) => {
  try {
    const organization = await Organization.create(req.body);
    res.status(201).json({ success: true, message: 'Organization created', organization });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};