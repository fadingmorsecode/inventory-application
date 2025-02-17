const queries = require('../db/queries');
require('dotenv').config();
const asyncHandler = require('express-async-handler');
const UnauthorizedError = require('../errors/passwordError');

const isObjectEmpty = (objectName) => {
  return JSON.stringify(objectName) === '{}';
};

exports.inventoryGet = async (req, res) => {
  let products = [];
  const query = req.query;
  if (!isObjectEmpty(query)) {
    const catArray = query.category.split(':');
    const category = catArray[0];
    const value = catArray[1];
    console.log(value);
    if (category === 'genre') {
      console.log('running with val:', value);
      products = await queries.getProductsByCategory('genre', value);
      console.log(products);
    } else if (category === 'developer') {
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

exports.deleteCategoriesPost = asyncHandler(async (req, res) => {
  const deleteReq = req.body;
  const catArray = deleteReq.category.split(':');
  const category = catArray[0];
  const value = catArray[1];
  const password = deleteReq.password;
  if (password === process.env.ADMINPASS) {
    if (category === 'genre') {
      await queries.deleteCategory('genre', value);
      return res.redirect('/');
    } else if (category === 'developer')
      await queries.deleteCategory('developer', value);
    return res.redirect('/');
  }
  throw new UnauthorizedError('Incorrect admin password');
});
