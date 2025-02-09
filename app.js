const express = require('express');
const app = express();
const path = require('node:path');
const inventoryRouter = require('./routes/inventoryRouter');
require('dotenv').config();

app.use(express.urlencoded({ extended: true }));
app.get('/', inventoryRouter);

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
