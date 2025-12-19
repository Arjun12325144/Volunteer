const express = require('express');
const router = express.Router();
const organizationController = require('../controllers/organizationController');

router.get('/', organizationController.getAllOrganizations);
router.get('/:id', organizationController.getOrganizationById);
router.post('/', organizationController.createOrganization);

module.exports = router;