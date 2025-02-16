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
  const developers = await queries.getAllDevelopers();
  const genres = await queries.getAllGenres();
  console.log(genres);
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

exports.createGameGet = async (req, res) => {
  res.render('create', { title: 'Create Product' });
};

exports.createGamePost = async (req, res) => {
  const values = req.body;
  await queries.createProduct(values);
  res.redirect('/');
};

exports.deleteGameGet = async (req, res) => {
  const productId = req.params.productId;
  await queries.deleteProduct(productId);
  res.redirect(`/`);
};

exports.deleteCategoriesGet = async (req, res) => {
  const genres = await queries.getAllGenres();
  const developers = await queries.getAllDevelopers();
  res.render('deleteCategories', { genres: genres, developers: developers });
};

exports.deleteCategoriesPost = async (req, res) => {
  const category = req.body;
  console.log('hello');
  console.log(category);
  for (const [key, value] of Object.entries(category)) {
    if (key === 'genres') {
      await queries.deleteCategory('genre', value);
    } else if (key === 'developers') {
      await queries.deleteCategory('developer', value);
    }
  }
  res.redirect('/');
};
