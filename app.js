const express = require('express');
const app = express();
const path = require('node:path');
const inventoryRouter = require('./routes/inventoryRouter');
require('dotenv').config();

app.use(express.urlencoded({ extended: true }));
app.use('/', inventoryRouter);
app.use((err, req, res, next) => {
  console.error(err);
  res
    .status(err.statusCode || 500)
    .redirect(`/error?message=${encodeURIComponent(err.message)}`);
});

app.get('/error', (req, res) => {
  const errorMessage = req.query.message || 'An unknown error occurred.';

  // Render the 'error' view and pass the error message to it
  res.render('error', { error: errorMessage });
});

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
