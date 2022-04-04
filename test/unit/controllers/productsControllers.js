const sinon = require('sinon');
const { expect } = require('chai');

const productController = require('../../../controllers/ProductController');
const productService = require('../../../services/ProductService');

const res = {};
const req = {};

describe('Testa o ProductController', () => {
  describe('Verifica se retorna os produtos corretamente', () => {

    const arrayProducts = [
      {
        "id": 1,
        "name": "produto",
        "quantity": 10
      },
      {
        "id": 2,
        "name": "Outro produto",
        "quantity": 20
      },
    ];

    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
    });

    describe('Verifica se retorna todos os produtos', async () => {
      before(() => {
        sinon.stub(productService, 'getAll').resolves(arrayProducts);
      });

      after(() => {
        productService.getAll.restore();
      });

      it('Espera que o status retorne o código 200', async () => {
        await productController.getAll(req, res);
        expect(res.status.calledWith(200)).to.be.equal(true);
        expect(res.json.calledWith(arrayProducts)).to.be.equal(true);
      });
    });
  });
  describe('Verifica se retorna um produto através do id', () => {
    req.params = { id: 1 };
    const productWithId = [
      {
        "id": 1,
        "name": "Produto",
        "quantity": 10
      }
    ];
    before(() => {
      sinon.stub(productService, 'getById').resolves(productWithId);
    });

    after(() => {
      productService.getById.restore();
    });

    it('Verifica se retorna o status 200', async () => {
      await productController.getById(req, res);
      expect(res.status.calledWith(200)).to.be.equal(true);
    });
  });
  describe('Verifica se a função Create cria novos produtos', () => {
    req.body = { name: "produto", quantity: 4 };
    const createdProduct = { id: 1, name: "produto", quantity: 4 };

    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productService, 'create').resolves(createdProduct);
    });

    after(async () => {
      productService.create.restore();
    });

    it('Verifica se retorna o status com o código 201', async () => {
      await productController.create(req, res);
      expect(res.status.calledWith(201)).to.be.equal(true);
    });
  });
});
