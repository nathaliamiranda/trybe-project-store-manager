const ProductService = require('../services/ProductService');

const getAll = async (_req, res, next) => {
  try {
    const products = await ProductService.getAll();
    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [product] = await ProductService.getById(id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    return res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    const { name, quantity } = req.body;

    const newProduct = await ProductService.create(name, quantity);

    if (!newProduct) return res.status(409).json({ message: 'Product already exists' });

    return res.status(201).json(newProduct);
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const { name, quantity } = req.body;
    const { id } = req.params;

    const product = await ProductService.update(id, name, quantity);
    if (product === false) return res.status(404).json({ message: 'Product not found' });

    return res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};

const exclude = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await ProductService.exclude(id);

    if (product === false) return res.status(404).send({ message: 'Product not found' });
    return res.status(204).end();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  exclude,
};