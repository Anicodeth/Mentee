const express = require("express");
const router = express.Router();
const classController = require("../controllers/classController");
const authMiddleware = require('../middlewares/authMiddleware');


// Create a new class
router.post("/", authMiddleware, classController.createClass);

// Update a class by its ID (requires authentication as instructor)
router.put('/:id', authMiddleware, classController.updateClassById);

// Delete a class by its ID (requires authentication as instructor)
router.delete('/:id', authMiddleware, classController.deleteClassById);

// Get all classes
router.get("/", authMiddleware, classController.getAllClasses);

//Get a class by its ID (requires authentication as instructor)
router.get('/my-classes', authMiddleware, classController.getClassesByInstructor);

module.exports = router;
