import express from 'express';
import dotenv from 'dotenv';
import connect from './db.js';
import pageRoute from './routes/pageRoute.js';

dotenv.config();

// Connection to the DB
connect();

const app = express();

// MIDDLEWARES
app.set('view engine', 'ejs');  // Ejs template engine
app.use(express.static('public'));  // Static files

// ROUTES
app.use('/', pageRoute);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`The server has been started on port ${port}`);
});
