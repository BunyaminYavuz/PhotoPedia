import mongoose from 'mongoose';

const connect = () => {
  mongoose
    .connect(process.env.DB_URL)
    .then(() => {
      console.log('Connected to the DB successfully.');
    })
    .catch((error) => {
      console.log(`Connection error to the DB: ${error}`);
    });
};

export default connect;
