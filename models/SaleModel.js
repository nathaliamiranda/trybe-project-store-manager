const connection = require('./connection');

const getAll = async () => {
  try {
    const [sales] = await connection.execute(
      `SELECT
      s.id AS saleId,
      s.date,
      spd.product_id AS productId,
      spd.quantity
      FROM sales AS s
      JOIN sales_products AS spd ON spd.sale_id = s.id
      ORDER BY saleId, productId`,
    );
    return sales;
  } catch (err) {
    console.error(err);
  }
};

const getById = async (id) => {
  try {
    const [result] = await connection
      .execute(`SELECT
      s.date,
      spd.product_id AS productId,
      spd.quantity
    FROM sales AS s
    JOIN sales_products AS spd ON spd.sale_id = s.id
    WHERE s.id = ?`,
        [id]);
    return result;
  } catch (err) {
    console.error(err);
  }
};

const create = async (arrayProducts) => {
  try {
    const [resultId] = await connection
      .execute('INSERT INTO StoreManager.sales (id) VALUES (null)');

    const saleProduct = arrayProducts.map(({ productId, quantity }) =>
      connection.execute(
        'INSERT INTO StoreManager.sales_products (product_id, quantity, sale_id) VALUES (?, ?, ?);',
        [productId, quantity, resultId.insertId],
      ));

    await Promise.all(saleProduct);

    return {
      id: resultId.insertId,
      itemsSold: arrayProducts,
    };
  } catch (err) {
    console.error(err);
  }
};

const update = async ({ quantity, saleId, productId }) => {
  try {
    await connection
    .execute(
      'UPDATE StoreManager.sales_products SET product_id = ?, quantity = ? WHERE sale_id = ?',
     [productId, quantity, saleId],
);
     return { 
       saleId, 
       itemUpdated: [{
        productId, 
        quantity,
       }],
     };
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
};