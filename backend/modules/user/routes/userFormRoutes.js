const express = require('express');
const router = express.Router();
const userFormController = require('../controllers/userFormController');
const authMiddleware = require('../../../middleware/auth');

// All routes require authentication
router.use(authMiddleware);

// User can only create and view their own forms
router.post('/', userFormController.createForm);
router.get('/my-forms', userFormController.getMyForms);
router.get('/:id', userFormController.getFormById);

module.exports = router;