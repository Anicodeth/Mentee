// for the class controller

const classService = require("../services/classService");

const createClass = async (req, res) => {
  try {
    // Extract class details from the request body
    const { name, type, description, schedule, price } = req.body;

    // Combine the instructor ID with other class details
    const classDetails = {
      name,
      type,
      description,
      schedule,
      price,
      // instructor: req.user._id, // If we have an authenticated user, you can get the instructor ID here
    };

    // Call the createNewClass function from classService.js
    const newClass = await classService.createNewClass(classDetails);

    // Return the newly created class as the response
    res.status(201).json(newClass);
  } catch (error) {
    res.status(500).json({ error: "Failed to create a new class" });
  }
};

const getAllClasses = async (req, res) => {
  try {
    const allClasses = await classService.getAllClasses();
    res.json(allClasses);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch classes" });
  }
};

module.exports = {
  createClass,
  getAllClasses,
  // Add other class-related controller functions if needed
};
