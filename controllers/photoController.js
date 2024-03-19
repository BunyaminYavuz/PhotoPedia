import Photo from '../models/Photo.js';
import mongoose from 'mongoose';
const { ObjectId } = mongoose.Types;

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
    const isValidObjectId = ObjectId.isValid(req.params.id);
    if (!isValidObjectId) {
      return res.status(400).send('Invalid photo ID');
    }

    const photo = await Photo.findById(req.params.id);
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
