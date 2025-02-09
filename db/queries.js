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

module.exports = { getAllGenres, getAllDevelopers, getProductsByCategory };
