const queries = require('../db/queries');

exports.inventoryGet = async (req, res) => {
  const genres = await queries.getAllGenres();
  res.render('index', {
    title: 'Inventory',
    genres: genres,
  });
};

exports.productGet = async (req, res) => {};

exports.updateGet = async (req, res) => {};

exports.deleteGet = async (req, res) => {};
