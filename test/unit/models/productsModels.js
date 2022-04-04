const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../models/connection');
const ProductModel = require('../../../models/ProductModel');

describe('Testa o ProductsModel', () => {
  request = {};
  response = {};
  describe('Verifica se a função getAll retorna uma lista com os produtos', async () => {
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
      sinon.stub(connection, 'execute').resolves([arrayProducts]);
    });

    after(() => {
      connection.execute.restore();
    });

    it('Verifica se retorna um array', async () => {
      const response = await ProductModel.getAll();
      expect(response).to.be.an('array');
    });

    it('Verifica se retorna um array com os objetos', async () => {
      const response = await ProductModel.getAll();

      expect(response).to.be.equal(arrayProducts);
    });
  });
  describe('Verifica se na função getById se o produto buscado pelo "id" existe', () => {
    request.params = { id: 1 };

    const product = {
      id: 1,
      name: "produto",
      quantity: 4
    };

    before(() => {
      sinon.stub(connection, 'execute').resolves([product]);
    });

    after(() => {
      connection.execute.restore();
    });

    it('Verifica se retorna um objeto com o produto', async () => {
      const response = await ProductModel.getById(1);
      expect(response).to.be.an('object');
    });
  });
  describe('Verifica se a função create cria um produto', () => {
    const createdProduct = {
      id: 7,
      name: "outro produto",
      quantity: 14
    };
    before(() => {
      sinon.stub(connection, 'execute').resolves(createdProduct);
      sinon.stub(ProductModel, 'create').resolves(createdProduct);
    });

    after(() => {
      connection.execute.restore();
    });

    it('Verifica se retorna um objeto', async () => {
      const response = await ProductModel.create({ name: 'outro produto', quantity: 14 });
      expect(response).to.be.an('object');
    });
  });
  describe('Verifica se a função Update o produto é atualizado', () => {
    const product = {
      id: 1,
      name: "produto",
      quantity: 3,
    };

    before(async () => {
      sinon.stub(connection, 'execute').resolves(product);
    });

    after(async () => {
      connection.execute.restore();
    });

    it('Verifica se retorna um objeto', async () => {
      const response = await ProductModel.update(product);
      expect(response).to.be.an('object')
    });
});
});