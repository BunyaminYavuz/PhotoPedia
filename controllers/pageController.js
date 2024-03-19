import Photo from '../models/Photo.js';
const getIndexPage = async (req, res) => {
  try {
    const photos = await Photo.find({});
    res.status(200).render('index', {
      photos,
      activePage: 'home',
    });
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
};

const getAboutPage = async (req, res) => {
  try {
    const photos = await Photo.find({});
    res.status(200).render('about', {
      photos,
      activePage: 'about',
    });
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
};

const getRegisterPage = (req, res) => {
  try {
    res.status(200).render('register', {
      activePage: 'register',
    });
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
};

export { getIndexPage, getAboutPage, getRegisterPage };
