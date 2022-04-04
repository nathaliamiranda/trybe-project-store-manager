const sinon = require('sinon');
const { expect } = require('chai');

const productModel = require('../../../models/ProductModel');
const productService = require('../../../services/ProductService');

describe('Testa o ProductsService', () => {
  request = {};
  response = {};

  describe('Verifica se a função getAll retorna uma lista de produtos', () => {
    const arrayProducts = [
      {
        id: 1,
        name: "produto",
        quantity: 4
      },
      {
        id: 2,
        name: " outro produto",
        quantity: 7
      }
    ];

    before(() => {
      sinon.stub(productModel, 'getAll').resolves(arrayProducts);
    });

    after(() => {
      productModel.getAll.restore();
    });

    it('Verifica se retorna um array', async () => {
      const response = await productService.getAll();
      expect(response).to.be.an('array');
    });

    it('Verifica se retorna um array com os objetos', async () => {
      const response = await productService.getAll();

      expect(response).to.be.equal(arrayProducts);
    });
  });
});

describe('Verifica na função getById se o produto buscado pelo "id" existe', () => {
    request.params = { id: 1 };
    
    const product = [{
      id: 1,
      name: "produto",
      quantity: 4
    }];

    before(() => {
      sinon.stub(productModel, 'getById').resolves([product]);
    });

    after(() => {
      productModel.getById.restore();
    });

    it('Verifica se retorna um array com o produto', async () => {
      const response = await productService.getById(1);
      expect(response).to.be.an('array');
    });
  });