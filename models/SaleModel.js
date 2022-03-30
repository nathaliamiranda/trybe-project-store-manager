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

module.exports = {
  getAll, 
  getById,
};