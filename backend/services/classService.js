// services/classService.js
const Class = require('../models/Class');

// Function to create a new class
const createNewClass = async (classDetails) => {
  try {
    // Extract class details from the input
    const { name, type, description, schedule, price } = classDetails;
    

    // Create a new instance of the Class model
    const newClass = new Class({
      name,
      type,
      description,
      schedule,
      price,
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

module.exports = {
    createNewClass,
    getClassById, 
    getAllClasses,
    updateClassById, 
    deleteClassById
   };
