// services/classService.js
const Class = require('../models/Class');

// Function to create a new class
const createNewClass = async (classDetails) => {
  try {
    // Extract class details from the input
    const { name, type, description, schedule, price, instructor } = classDetails;
    

    // Create a new instance of the Class model
    const newClass = new Class({
      name,
      type,
      description,
      schedule,
      price,
      instructor
    });
    
    // Save the new class in the database
    const savedClass = await newClass.save();
    console.log("class saved")

    return savedClass;
  } catch (error) {
    throw new Error('Failed to create a new class');
  }
};

// Function to fetch a class by its ID
const getClassById = async (classId) => {
  try {
    const foundClass = await Class.findById(classId);
    return foundClass;
  } catch (error) {
    throw new Error('Failed to fetch class details');
  }
};

// Function to fetch all available classes
const getAllClasses = async () => {
  try {
    const allClasses = await Class.find();
    return allClasses;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch classes');
  }
};

const getClassesByInstructorId = async (instructorId) => {
  try {

      const classesByInstructor = await Class.find({ instructor: instructorId });
      return classesByInstructor;

  } catch (error) {

    throw new Error('Failed to fetch classes created by the instructor');

  }
};

// Function to update a class by its ID
const updateClassById = async (classId, updatedClassDetails) => {
  try {
    const updatedClass = await Class.findByIdAndUpdate(classId, updatedClassDetails, { new: true });
    return updatedClass;
  } catch (error) {
    throw new Error('Failed to update class details');
  }
};

// Function to delete a class by its ID
const deleteClassById = async (classId) => {
  try {
    const deletedClass = await Class.findByIdAndRemove(classId);
    return deletedClass;
  } catch (error) {
    throw new Error('Failed to delete class');
  }
};

/* function to search class by id*/
const findClassById = async (classId) => {
  try {
    const foundClass = await Class.findById(classId);
  
    return foundClass;
  } catch(error) {
    throw new Error('Failed to search a class');
  }
}


// exaustive search by both name and type
const searchClasses = async (searchInput) => {
  try {
    // Prepare the query for the "OR" search
    const query = {
      $or: [
        { type: { $regex: new RegExp(searchInput, 'i') } }, // Case-insensitive type search
        { name: { $regex: new RegExp(searchInput, 'i') } }, // Case-insensitive name search
      ],
    };

    // Perform the search using the query
    const foundClasses = await Class.find(query);
    return foundClasses;
  } catch (error) {
    throw new Error('Failed to search classes');
  }
};

module.exports = {
    createNewClass,
    getClassById, 
    getAllClasses,
    updateClassById, 
    deleteClassById,
    getClassesByInstructorId,
    findClassById,
    searchClasses
   };
