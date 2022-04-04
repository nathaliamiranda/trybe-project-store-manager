const express = require('express');

const router = express.Router();

const ProductController = require('../controllers/ProductController');

const { validationProductsName,
    validationProductsQuantity } = require('../middlewares/validationProducts');

router.get('/:id', ProductController.getById);

router.put('/:id', validationProductsQuantity, validationProductsName, ProductController.update);

router.delete('/:id', ProductController.exclude);

router.get('/', ProductController.getAll);

router.post('/', validationProductsQuantity, validationProductsName, ProductController.create);

module.exports = router;