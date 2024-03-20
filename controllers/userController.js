import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Function to create a new user
const createUser = async (req, res) => {
  try {
    // Create a new user with the data from the request body
    await User.create(req.body);

    // Render the 'about' page upon successful user creation
    res.status(200).render('login', {
      activePage: 'login',
    });
  } catch (error) {
    console.log(error);
  }
};

// Function to login a user
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user from the database by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).send('User not found');
    }

    // Compare the incoming password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send('Incorrect password');
    }
    const token = createToken(user._id);
    // Login successful
    res.status(200).json({
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
};

const createToken = (userId) => {
  return jwt.sign({ userId }, process.env.PRIVATE_KEY, {
    expiresIn: '1d',
  });
};

export { createUser, loginUser };
