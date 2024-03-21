import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const checkUser = (req, res, next) => {
  const token = req.cookies.userToken;
  if (token) {
    jwt.verify(token, process.env.PRIVATE_KEY, async (error, decodedToken) => {
      if (error) {
        console.log(error);
        res.locals.user = null;
        next();
      } else {
        const user = await User.findById(decodedToken.userId);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

const authenticateToken = async (req, res, next) => {
  try {
    const token = req.cookies.userToken;

    if (token) {
      jwt.verify(token, process.env.PRIVATE_KEY, (error) => {
        if (error) {
          console.log(error);
          res.redirect('/login');
        }
        next();
      });
    } else {
      res.redirect('/login');
    }
  } catch (error) {
    console.log(error);
    res.status(401).send('Not authorized!');
  }
};

export { authenticateToken, checkUser };
