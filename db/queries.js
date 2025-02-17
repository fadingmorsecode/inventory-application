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
  await pool.query('UPDATE genres SET genre = $1 WHERE game_id = $2', [
    value.genre,
    id,
  ]);
  await pool.query('UPDATE developers SET developer = $1 WHERE game_id = $2', [
    value.developer,
    id,
  ]);
}

async function deleteProduct(id) {
  await pool.query('DELETE FROM games WHERE id = $1', [id]);
  await pool.query('DELETE FROM genres WHERE game_id = $1', [id]);
  await pool.query('DELETE FROM developers WHERE game_id = $1', [id]);
}

async function createProduct(values) {
  await pool.query(
    'INSERT INTO games (game, genre, developer) VALUES ($1, $2, $3)',
    [values.game, values.genre, values.developer]
  );
  await pool.query('INSERT INTO genres (game_id, genre) VALUES ($1, $2)', [
    values.game,
    values.genre,
  ]);
  await pool.query(
    'INSERT INTO developers (game_id, developer) VALUES ($1, $2)',
    [values.game, values.developer]
  );
}

async function deleteCategory(category, value) {
  if (category === 'developer') {
    await pool.query('DELETE FROM developers WHERE developer = $1', [value]);
    const gameIDS = await pool.query(
      'SELECT id FROM games WHERE developer = $1',
      [value]
    );
    gameIDS.rows.forEach(async (gameID) => {
      await pool.query('DELETE FROM genres WHERE game_id = $1', [gameID.id]);
    });
    await pool.query('DELETE FROM games WHERE developer = $1', [value]);
  } else if (category === 'genre') {
    await pool.query('DELETE FROM genres WHERE genre = $1', [value]);
    // delete instances of developer where category matches
    const gameIDS = await pool.query('SELECT id FROM games WHERE genre = $1', [
      value,
    ]);
    gameIDS.rows.forEach(async (gameID) => {
      await pool.query('DELETE FROM developers WHERE game_id = $1', [
        gameID.id,
      ]);
    });
    await pool.query('DELETE FROM games WHERE genre = $1', [value]);
  }
}

module.exports = {
  getAllGenres,
  getAllDevelopers,
  getProductsByCategory,
  getProductById,
  updateProduct,
  deleteProduct,
  createProduct,
  deleteCategory,
};
