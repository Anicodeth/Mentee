const express = require("express");
const router = express.Router();
const classController = require("../controllers/classController");

// Create a new class
router.post("/", classController.createClass);

// Get all classes
router.get("/", classController.getAllClasses);

module.exports = router;
