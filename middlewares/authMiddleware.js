import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const authenticateToken = async (req, res, next) => {
  try {
    // Check if token is available in the cookie
    const token = req.cookies.userToken;

    // If no token is found, return unauthorized error
    if (!token) {
      return res.status(401).send('No token available');
    }

    // Verify the token and extract user ID
    const decodedToken = jwt.verify(token, process.env.PRIVATE_KEY);

    // Find user by ID from the decoded token
    req.user = await User.findById(decodedToken.userId);

    // Call the next middleware
    next();
  } catch (error) {
    console.log(error);
    res.status(401).send('Not authorized!');
  }
};

export { authenticateToken };
