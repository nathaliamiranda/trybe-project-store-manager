const express = require('express');

const router = express.Router();

const SalesController = require('../controllers/SaleController');

const {
    salesProductsValidate,
    typeOfNumberValidate,
  } = require('../middlewares/validationSale');

router.get('/:id', SalesController.getById);

router.put('/:id', salesProductsValidate, typeOfNumberValidate, SalesController.update);

router.get('/', SalesController.getAll);

router.post('/', salesProductsValidate, SalesController.create);

module.exports = router;