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

const typeOfNumberValidate = (req, res, next) => {
  req.body.forEach(({ quantity, productId }) => {
    if (typeof quantity !== 'number') {
      return res.status(400).json(
        { message: '"quantity" must be a number' },
      );
    }
    if (typeof productId !== 'number') {
      return res.status(400).json(
        { message: '"productId" must be a number' },
      );
    }
  });
  next();
};

module.exports = {
  salesProductsValidate,
  typeOfNumberValidate,
};