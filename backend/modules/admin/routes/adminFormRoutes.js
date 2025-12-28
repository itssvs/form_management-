const express = require('express');
const router = express.Router();
const adminFormController = require('../controllers/adminFormController');
const authMiddleware = require('../../../middleware/auth');
const adminAuth = require('../../../middleware/adminAuth');

// All routes require authentication and admin role
router.use(authMiddleware);
router.use(adminAuth);

router.get('/forms', adminFormController.getAllForms);
router.get('/forms/:id', adminFormController.getFormById);
router.put('/forms/:id', adminFormController.updateForm);
router.delete('/forms/:id', adminFormController.deleteForm);

module.exports = router;
