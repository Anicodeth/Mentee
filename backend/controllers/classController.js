const classService = require("../services/classService");

const createClass = async (req, res) => {
  try {
    // Extract class details from the request body
    const { name, type, description, schedule, price } = req.body;

    // console.log(req.user.userId)

    // Combine the instructor ID with other class details
    const classDetails = {
      name,
      type,
      description,
      schedule,
      price,
      instructor: req.user.userId, // The instructor ID is obtained from the authenticated user
    };

    // console.log(classDetails);

    // Call the createNewClass function from classService.js
    const newClass = await classService.createNewClass(classDetails);
    // console.log(newClass);

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
      const instructorId = req.user.userId;
     
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


const getClassById = async (req, res) => {


  try {
    const { id } = req.params;
    
    
    const Class = await classService.findClassById(id);

    if (!Class) {

      return res.status(404).json({ error: "Class not found" });

    }

    res.status(200).json(Class);
  } catch(error) {
    res.status(500).json({error: "Failed to search class"})
  }
}

const searchClasses = async (req, res) => {
  try {
    
    const { query } = req.body;
    // console.log(query);

  const foundClasses = await classService.searchClasses(query);

  if (!foundClasses) {
    return res.status(404).json({ error: "Class not found" });
  }
  return res.status(200).json(foundClasses);
  } catch (error) {
    res.status(500).json({error: "Failed to search class"})
  }
}

module.exports = {
  createClass,
  getAllClasses,
  updateClassById,
  deleteClassById,
  getClassesByInstructor,
  getClassById,
  searchClasses
  // Add other class-related controller functions if needed
};


//userId = 64bcd0839925213eebb6eac0
//classId = 64bae1a1f0791071259cdc27