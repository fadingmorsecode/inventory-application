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

exports.productGet = async (req, res) => {
  const productId = req.params.productId;
  const product = await queries.getProductById(productId);
  console.log(product);
  res.render('productDetails', { product: product });
};

exports.updateGameGet = async (req, res) => {
  const productId = req.params.productId;
  const product = await queries.getProductById(productId);
  res.render('editGame', { id: product.id, product: product });
};

exports.updateGamePost = async (req, res) => {
  const productId = req.params.productId;
  const values = req.body;
  await queries.updateProduct(productId, values);
  res.redirect(`/product/${productId}`);
};

exports.deleteGet = async (req, res) => {};
