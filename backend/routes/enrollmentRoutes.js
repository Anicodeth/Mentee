// routes/enrollmentRoutes.js
const express = require('express');
const router = express.Router();
const enrollmentController = require('../controllers/enrollmentController');
const authMiddleware = require('../middlewares/authMiddleware');

// Enroll a user in a class (requires authentication)
router.post('/', authMiddleware, enrollmentController.enrollUserInClass);

// Get all enrollments of a user (requires authentication)
router.get('/user', authMiddleware, enrollmentController.getUserEnrollments);

// Get all enrolled users of a class (requires authentication)
router.get('/class/:classId', authMiddleware, enrollmentController.getClassEnrollments);

module.exports = router;
