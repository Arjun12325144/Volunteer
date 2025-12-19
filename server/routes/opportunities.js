const express = require('express');
const router = express.Router();
const opportunityController = require('../controllers/opportunityController');
const auth = require('../middleware/auth');

router.get('/', opportunityController.getAllOpportunities);
router.get('/:id', opportunityController.getOpportunityById);
router.post('/', auth, opportunityController.createOpportunity);
router.post('/:id/signup', auth, opportunityController.signUpForOpportunity);
router.post('/:id/cancel', auth, opportunityController.cancelRegistration);
router.put('/:id', auth, opportunityController.updateOpportunity);
router.delete('/:id', auth, opportunityController.deleteOpportunity);

module.exports = router;