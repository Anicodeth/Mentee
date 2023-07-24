// services/enrollmentService.js
const Enrollment = require('../models/Enrollment');

// Function to enroll a user in a class
const enrollUserInClass = async (userId, classId) => {
  try {
    // Check if the user is already enrolled in the class
    const existingEnrollment = await Enrollment.findOne({
            user: userId,
            class: classId,
    });

    if (existingEnrollment) {
      throw new Error('User is already enrolled in the class');
    }

    // Create a new enrollment instance
    const newEnrollment = new Enrollment({
        user: userId,
        class: classId,
    });


    // Save the new enrollment in the database
    const savedEnrollment = await newEnrollment.save();

    return savedEnrollment;
  } catch (error) {
    throw new Error('Failed to enroll user in the class');
  }
};

// Function to get all enrollments of a user
const getUserEnrollments = async (userId) => {
  try {
    const userEnrollments = await Enrollment.find({ user: userId })
      .populate('class', 'title description teacher')
      .select('-_id class'); // Exclude the _id field, include only the 'class' field
    return userEnrollments;
  } catch (error) {
    throw new Error('Failed to fetch user enrollments');
  }
};

// Function to get all enrolled users of a class
const getClassEnrollments = async (classId) => {
  try {
    const classEnrollments = await Enrollment.find({ class: classId })
      .populate('user', 'name email')
      .select('-_id user'); // Exclude the _id field, include only the 'user' field
    return classEnrollments;
  } catch (error) {
    throw new Error('Failed to fetch class enrollments');
  }
};

module.exports = {
  enrollUserInClass,
  getUserEnrollments,
  getClassEnrollments,
};
