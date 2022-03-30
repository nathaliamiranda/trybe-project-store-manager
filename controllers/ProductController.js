const express = require('express');
const ProductService = require('../services/ProductService');

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
      return res.status(404).send({ message: 'Product not found' });
    }

   return res.status(200).json(product);
  } catch (err) {
    next(err);
  }
});

module.exports = router;