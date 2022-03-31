const SaleModel = require('../models/SaleModel');

const getAll = async () => SaleModel.getAll();

const getById = async (id) => {
  const product = await SaleModel.getById(id);
  if (product.length === 0) return null;
  return product;
};

const create = async (arrayProducts) => {
  const createProduct = await SaleModel.create(arrayProducts);
  return createProduct;
};

const update = async (sales, id) => {
  const updateProduct = await SaleModel.update(sales, id);
  console.log(updateProduct);
  return updateProduct;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
};