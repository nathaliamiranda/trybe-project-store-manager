const express = require('express');
const ProductService = require('../services/ProductService');
const validationProducts = require('../middlewares/validationProducts');

const router = express.Router();

router.get('/', async (_req, res, next) => {
  try {
    const products = await ProductService.getAll();
    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
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
});

router.post('/', validationProducts, async (req, res, next) => {
  try {
    const { name, quantity } = req.body;

    const newProduct = await ProductService.create(name, quantity);

    if (!newProduct) return res.status(409).json({ message: 'Product already exists' });

    return res.status(201).json(newProduct);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', validationProducts, async (req, res, next) => {
  try {
    const { name, quantity } = req.body;
    const { id } = req.params;

    const product = await ProductService.update(id, name, quantity);
    if (product === false) return res.status(404).json({ message: 'Product not found' });

    return res.status(200).json(product);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await ProductService.exclude(id);

    if (product === false) return res.status(404).send({ message: 'Product not found' });
    return res.status(204).end();
  } catch (err) {
    next(err);
  }
});

module.exports = router;