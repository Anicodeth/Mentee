// services/userService.js
const User = require('../models/User');

// Function to create a new user
const createNewUser = async (userDetails) => {
  try {
            // Create a new instance of the User model
            const newUser = new User(userDetails);
            // console.log(newUser);

            // Save the new user in the database
            const savedUser = await newUser.save();

            return savedUser;

  } catch (error) {
    // console.error('Error while creating a new class:', error);
            throw new Error('Failed to create a new user');
  }
};

// Function to fetch a user by their ID
const getUserById = async (userId) => {
  try {

        const foundUser = await User.findById(userId);
        // const foundUser = await User.findOne({ userId });
        // console.log(foundUser);
        return foundUser;

  } catch (error) {

         Error('Failed to fetch user details');
  }
};

// function to fetch a user by their email address
const getUserByEmail = async (email) => {
    try {
  
      const foundUser = await User.findOne({ email });
      // console.log(foundUser);
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
    // Check if the new email address already exists in the collection
    if (updatedUserDetails.email) {
      const existingUser = await User.findOne({ email: updatedUserDetails.email });
      if (existingUser && existingUser._id.toString() !== userId) {
        throw new Error('Email already exists for another user');
      }
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updatedUserDetails, { new: true });

    if (!updatedUser) {
      throw new Error('User not found');
    }

    return updatedUser;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to update user by ID');
  }
};

// Function to delete a user by their ID
const deleteUserByEmail = async (email) => {
  try {
    console.log('Trying to delete user with email:', email);

    const deletedUser = await User.findOneAndDelete({ email });
    console.log('Deleted user:', deletedUser);

    return deletedUser;
  } catch (error) {
    console.error('Error while deleting user:', error);
    throw new Error('Failed to delete user');
  }
}

module.exports = {
  createNewUser,
  getUserById,
  getAllUsers,
  updateUserById,
  deleteUserByEmail,
  getUserByEmail
};
