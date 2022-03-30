const SaleModel = require('../models/SaleModel');

const getAll = async () => SaleModel.getAll();

const getById = async (id) => {
const product = await SaleModel.getById(id);
if (product.length === 0) return null;
  return product;
};
    
module.exports = {
    getAll,
    getById,
};