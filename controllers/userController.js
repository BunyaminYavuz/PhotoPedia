import User from '../models/User.js';

const createUser = async (req, res) => {
  try {
    await User.create(req.body);
    res.status(200).render('about', {
      activePage: 'about',
    });
  } catch (error) {
    console.log(error);
  }
};

export { createUser };
