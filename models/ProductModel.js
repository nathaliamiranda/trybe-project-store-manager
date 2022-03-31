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
      .execute('SELECT * FROM products WHERE id = ? ORDER BY id;', 
      [id]);
      return result;
    } catch (err) {
        console.error(err);
    }
};

const getByName = async (name) => {
  try {
    const [product] = await connection.execute('SELECT * from products WHERE name = ?', [name]);
    return product;
  } catch (err) {
    console.error(err);
  }
};

const create = async (name, quantity) => {
  try {
    const [result] = await connection
    .execute('INSERT INTO products (name, quantity) VALUES (?, ?);',
      [name, quantity]);
    return { id: result.insertId, name, quantity };
  } catch (err) {
    console.error(err);
  }
};

const update = async ({ id, name, quantity }) => {
  try {
    await connection
    .execute('UPDATE products SET name = ?, quantity = ? WHERE id = ?', [name, quantity, id]);
    return { id, name, quantity };
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  getAll, 
  getById,
  getByName,
  create,
  update,
};