import Photo from '../models/Photo.js';

const createPhoto = async (req, res) => {
  try {
    const photo = await Photo.create(req.body);
    res.status(201).json({
      photo,
    });
  } catch (error) {
    console.log(error);
  }
};

const getAllPhotos = async (req, res) => {
  try {
    const photos = await Photo.find({});
    res.status(200).render('photos', {
      photos,
      activePage: 'photos',
    });
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
};

const getPhoto = async (req, res) => {
  try {
    const photo = await Photo.findOne({ slug: req.params.slug });
    if (!photo) {
      return res.status(404).send('Photo not found');
    }

    res.status(200).render('photo', {
      photo,
      activePage: 'photos',
    });
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
};

export { createPhoto, getAllPhotos, getPhoto };
