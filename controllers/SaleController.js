const express = require('express');
const SaleService = require('../services/SaleService');

const router = express.Router();

router.get('/', async (_req, res, next) => {
  try {
    const sales = await SaleService.getAll();
    
    res.status(200).json(sales);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await SaleService.getById(id);
    
    if (!product) return res.status(404).json({ message: 'Sale not found' });

    return res.status(200).json(product);
} catch (err) {
    next(err);
  }
});

module.exports = router;