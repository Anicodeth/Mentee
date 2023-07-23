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
      instructor: req.user._id, // The instructor ID is obtained from the authenticated user
    };

    // Call the createNewClass function from classService.js
    const newClass = await classService.createNewClass(classDetails);

    // Return the newly created class as the response
    res.status(201).json(newClass);
  } catch (error) {
    res.status(500).json({ error: "Failed to create a new class" });
  }
};


// get all the classes
const getAllClasses = async (req, res) => {
  try {const getClassesByInstructorId = async (instructorId) => {
    try {
      const classesByInstructor = await Class.find({ instructor: instructorId });
      return classesByInstructor;
    } catch (error) {
      throw new Error('Failed to fetch classes created by the instructor');
    }
  };
    const allClasses = await classService.getAllClasses();
    res.json(allClasses);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch classes" });
  }
};

/// get classes created by a instructor
const getClassesByInstructor = async (req, res) => {
    try {
      const instructorId = req.user._id;
      const classesByInstructor = await classService.getClassesByInstructorId(
        instructorId
      );
      res.json(classesByInstructor);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Failed to fetch classes created by the instructor" });
    }
  };
  


const updateClassById = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedClassDetails = req.body;
    const instructorId = req.user._id;

    // Call the updateClassById function from classService.js
    const updatedClass = await classService.updateClassById(
      id,
      updatedClassDetails,
      instructorId
    );

    if (!updatedClass) {
      return res.status(404).json({ error: "Class not found or not authorized" });
    }

    // Return the updated class as the response
    res.json(updatedClass);
  } catch (error) {
    res.status(500).json({ error: "Failed to update class details" });
  }
};

const deleteClassById = async (req, res) => {
  try {
    const { id } = req.params;
    const instructorId = req.user._id;

    // Call the deleteClassById function from classService.js
    const deletedClass = await classService.deleteClassById(id, instructorId);

    if (!deletedClass) {
      return res.status(404).json({ error: "Class not found or not authorized" });
    }

    // Return the deleted class as the response
    res.json(deletedClass);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete class" });
  }
};

module.exports = {
  createClass,
  getAllClasses,
  updateClassById,
  deleteClassById,
  getClassesByInstructor,
  // Add other class-related controller functions if needed
};
