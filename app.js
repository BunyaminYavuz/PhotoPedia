import express from 'express';
import dotenv from 'dotenv';
import connect from './db.js';
import pageRoute from './routes/pageRoute.js';
import photoRoute from './routes/photoRoute.js';

// .env file
dotenv.config();

// Connection to the DB
connect();

const app = express();

// MIDDLEWARES
app.set('view engine', 'ejs'); // Ejs template engine
app.use(express.static('public')); // Static files
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// ROUTES
app.use('/', pageRoute);
app.use('/photos', photoRoute);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`The server has been started on port ${port}`);
});
