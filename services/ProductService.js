const ProductModel = require('../models/ProductModel');

const getAll = async () => ProductModel.getAll();

const getById = async (id) => {
    const product = await ProductModel.getById(id);
    if (!product) return null;

    return product;
};
const create = async (name, quantity) => {
  const productExist = await ProductModel.getByName(name);
   
  if (productExist.length) return null;
   
  const product = await ProductModel.create(name, quantity);

  return product;
};

const update = async (id, name, quantity) => {
  const productExist = await ProductModel.getById(id);

  if (!productExist.length) return false;

  const product = await ProductModel.update({ id, name, quantity });

 return product;
};

module.exports = {
    getAll,
    getById,
    create,
    update,
};