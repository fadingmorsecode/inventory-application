const pool = require('./pool');

async function getAllGenres() {
  const res = await pool.query(
    'SELECT DISTINCT genre FROM genres ORDER BY genre ASC'
  );
  const rows = res.rows;
  return rows;
}

async function getAllDevelopers() {
  const res = await pool.query(
    'SELECT DISTINCT developer FROM developers ORDER BY developer ASC'
  );
  const rows = res.rows;
  return rows;
}

async function getProductsByCategory(category, value) {
  const res = await pool.query(`SELECT * FROM games WHERE ${category} = $1`, [
    value,
  ]);
  const rows = res.rows;
  return rows;
}

async function getProductById(id) {
  const res = await pool.query('SELECT * FROM games WHERE id = $1', [id]);
  const rows = res.rows[0];
  return rows;
}

async function updateProduct(id, value) {
  await pool.query(
    `UPDATE games SET game = $1, genre = $2, developer = $3 WHERE id = $4`,
    [value.game, value.genre, value.developer, id]
  );
}

module.exports = {
  getAllGenres,
  getAllDevelopers,
  getProductsByCategory,
  getProductById,
  updateProduct,
};
