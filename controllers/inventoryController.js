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
  const game = product.game;
  console.log(game);
  res.render('editGame', { id: product.id, game: game });
};

exports.updateGamePost = async (req, res) => {
  const productId = req.params.productId;
  const value = req.body.game;
  await queries.updateProduct('game', productId, value);
  res.redirect(`/product/${productId}`);
};

exports.updateGenreGet = async (req, res) => {
  const productId = req.params.productId;
  const product = await queries.getProductById(productId);
  const genre = product.genre;
  res.render('editGenre', { id: product.id, genre: genre });
};

exports.updateGenrePost = async (req, res) => {
  const productId = req.params.productId;
  const value = req.body.genre;
  await queries.updateProduct('genre', productId, value);
  res.redirect(`/product/${productId}`);
};

exports.updateDeveloperGet = async (req, res) => {
  const productId = req.params.productId;
  const product = await queries.getProductById(productId);
  const developer = product.developer;
  res.render('editDeveloper', { id: product.id, developer: developer });
};

exports.updateDeveloperPost = async (req, res) => {
  const productId = req.params.productId;
  const value = req.body.developer;
  await queries.updateProduct('developer', productId, value);
  res.redirect(`/product/${productId}`);
};

exports.deleteGet = async (req, res) => {};
