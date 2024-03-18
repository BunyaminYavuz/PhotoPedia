import express from 'express';

const app = express();

// MIDDLEWARES
app.set('view engine', 'ejs');
app.use(express.static('public'));

// ROUTES
app.get('/', (req, res) => {
  res.render('index');
});


const port = 3000;

app.listen(port, () => {
  console.log(`The server has been started on port ${port}`);
});
