const pool = require('./pool');

async function getAllGenres() {
  const res = await pool.query(
    'SELECT DISTINCT genre FROM genres ORDER BY genre ASC'
  );
  const rows = res.rows;
  return rows;
}

module.exports = { getAllGenres };
