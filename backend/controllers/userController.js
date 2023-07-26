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
      password: password,
      role
    };

    const newUser = await userService.createNewUser(userDetails);

    console.log(newUser);

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

      
      
      
      
  
      if (!user || !(password == user.password)) {
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
        console.log(req.user);
        const { id } = req.user.userId;

        
        
        // const foundUser = await userService.getUserById(id);
        const foundUser = await userService.getUserByEmail(req.user.email);
        return res.status(200).json(foundUser);
        

  } catch (error) {

         res.status(500).json({ error: 'Failed to fetch user details' });
  }
};

// Function to update a user by their ID
const updateUserById = async (req, res) => {
  try {
       
        const { id } = req.user.userId;
        
        const updatedUserDetails = req.body;
        
        const updatedUser = await userService.updateUserById(req.user.userId, updatedUserDetails);
        console.log(updatedUser);
        res.json(updatedUser);

  } catch (error) {

    res.status(500).json({ error: 'Failed to update user details' });

  }
};

// Function to delete a user by their ID
const deleteUserById = async (req, res) => {
  try {

        const { id } = req.user.userId;
        const deletedUser = await userService.deleteUserByEmail(req.user.email);
        res.status(201).json(deletedUser);

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
