const salesProductsValidate = (req, res, next) => {
  req.body.forEach(({ quantity, productId }) => {
    if (quantity < 1) {
      return res.status(422).json(
        { message: '"quantity" must be greater than or equal to 1' },
      );
    }
    if (!quantity) {
      return res.status(400).json(
        { message: '"quantity" is required' },
      );
    }
    if (!productId) {
      return res.status(400).json(
        { message: '"productId" is required' },
      );
    }
  });
  next();
};

module.exports = salesProductsValidate;