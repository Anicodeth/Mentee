// controllers/userController.js
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userService = require('../services/userService');

const secretKey = "your-secret-key"; // Replace this with your actual secret key





// Function to generate JWT token
const generateToken = (user) => {
  const expiresIn = "1h"; // Token validity duration

  const payload = { userId: user._id, email: user.email };
  return jwt.sign(payload, secretKey, { expiresIn });
};




// Function to create a new user
const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const userDetails = {
      name,
      email,
      password: hashedPassword,
      role
    };

    const newUser = await userService.createNewUser(userDetails);

    // Generate a JWT token and send it in the response
    const token = generateToken(newUser);

    res.status(201).json({ token, user: newUser });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create a new user' });
  }
};



const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
    
      const user = await userService.getUserByEmail(email);
      
  
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: "Invalid email or password" });
      }
  
      // Generate a JWT token and send it in the response
      const token = generateToken(user);
  
      res.json({ token, user });
    } catch (error) {
      res.status(500).json({ error: "Failed to login" });
    }
  };


// Function to get all users
const getAllUsers = async (req, res) => {
  try {

        const allUsers = await userService.getAllUsers();
        res.json(allUsers);

  } catch (error) {

        res.status(500).json({ error: 'Failed to fetch users' });
  
}
};

// Function to get a user by their ID
const getUserById = async (req, res) => {
  try {

        const { id } = req.params;
        const foundUser = await userService.getUserById(id);
        

  } catch (error) {

         res.status(500).json({ error: 'Failed to fetch user details' });
  }
};

// Function to update a user by their ID
const updateUserById = async (req, res) => {
  try {

        const { id } = req.params;
        const updatedUserDetails = req.body;
        const updatedUser = await userService.updateUserById(id, updatedUserDetails);
        res.json(updatedUser);

  } catch (error) {

    res.status(500).json({ error: 'Failed to update user details' });

  }
};

// Function to delete a user by their ID
const deleteUserById = async (req, res) => {
  try {

        const { id } = req.params;
        const deletedUser = await userService.deleteUserById(id);
        res.json(deletedUser);

  } catch (error) {

    res.status(500).json({ error: 'Failed to delete user' });

  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  loginUser,

};
