const queries = require('../db/queries');

exports.inventoryGet = async (req, res) => {
  let products = [];
  const query = req.query;
  for (const [key, value] of Object.entries(query)) {
    if (key === 'genres') {
      products = await queries.getProductsByCategory('genre', value);
    } else if (key === 'developers') {
      products = await queries.getProductsByCategory('developer', value);
    }
  }
  console.log(products);
  const developers = await queries.getAllDevelopers();
  const genres = await queries.getAllGenres();
  res.render('index', {
    title: 'Inventory',
    genres: genres,
    developers: developers,
    products: products,
  });
};

exports.productGet = async (req, res) => {};

exports.updateGet = async (req, res) => {};

exports.deleteGet = async (req, res) => {};
