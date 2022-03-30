const connection = require('./connection');

const getAll = async () => {
  try {
    const [products] = await connection.execute('SELECT * FROM products;');
    return products;
  } catch (err) {
    console.error(err);
  }
};
  
const getById = async (id) => {
  try {
    const [result] = await connection
      .execute('SELECT * FROM products WHERE id = ? ORDER BY id;', [id]);
      return result;
    } catch (err) {
        console.error(err);
    }
};

module.exports = {
  getAll, 
  getById,
};