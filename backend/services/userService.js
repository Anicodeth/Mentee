// services/userService.js
const User = require('../models/User');

// Function to create a new user
const createNewUser = async (userDetails) => {
  try {
            // Create a new instance of the User model
            const newUser = new User(userDetails);

            // Save the new user in the database
            const savedUser = await newUser.save();

            return savedUser;

  } catch (error) {

            throw new Error('Failed to create a new user');
  }
};

// Function to fetch a user by their ID
const getUserById = async (userId) => {
  try {

        const foundUser = await User.findById(userId);
        return foundUser;

  } catch (error) {

         Error('Failed to fetch user details');
  }
};

// function to fetch a user by their email address
const getUserByEmail = async (email) => {
    try {
    console.log('got here')
      const foundUser = await User.findOne({ email });
      
      return foundUser;
    } catch (error) {
      throw new Error('Failed to fetch user by email');
    }
  };
  

// Function to fetch all users
const getAllUsers = async () => {
  try {

        const allUsers = await User.find();
        return allUsers;

  } catch (error) {

    throw new Error('Failed to fetch users');

  }
};

// Function to update a user by their ID
const updateUserById = async (userId, updatedUserDetails) => {
  try {

    const updatedUser = await User.findByIdAndUpdate(userId, updatedUserDetails, { new: true });
    return updatedUser;

  } catch (error) {

    throw new Error('Failed to update user details');

  }
};

// Function to delete a user by their ID
const deleteUserById = async (userId) => {
  try {

    const deletedUser = await User.findByIdAndRemove(userId);
    return deletedUser;

  } catch (error) {

    throw new Error('Failed to delete user');
  }
};

module.exports = {
  createNewUser,
  getUserById,
  getAllUsers,
  updateUserById,
  deleteUserById,
  getUserByEmail
};
