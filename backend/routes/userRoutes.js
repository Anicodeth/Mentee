// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); 
const authMiddleware = require('../middlewares/authMiddleware');

// Create a new user
router.post('/', userController.createUser);

// Log in a user
router.post('/login', userController.loginUser);

// Get all users (requires authentication)
router.get('/', authMiddleware, userController.getAllUsers);

// Get a user by their ID (requires authentication)
router.get('/:id', authMiddleware, userController.getUserById);

// Update a user by their ID (requires authentication)
router.put('/:id', authMiddleware, userController.updateUserById);

// Delete a user by their ID (requires authentication)
router.delete('/:id', authMiddleware, userController.deleteUserById);

module.exports = router;
