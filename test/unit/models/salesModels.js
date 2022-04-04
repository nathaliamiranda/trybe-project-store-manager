const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../models/connection');
const SalesModel = require('../../../models/SaleModel');

describe('Testa o SalesModel', () => {
  request = {};
  response = {};

  describe('Verifica se a função getAll retorna as vendas', async () => {
    const getSales = [
      {
        "date": "2021-07-05T04:54:24.000Z",
        "productId": 1,
        "quantity": 4
      },
      {
        "date": "2021-07-05T04:54:23.000Z",
        "productId": 2,
        "quantity": 8
      },
      {
        "date": "2021-07-05T04:54:21.000Z",
        "productId": 3,
        "quantity": 3
      }
    ];

    before(() => {
      sinon.stub(connection, 'execute').resolves([getSales]);
    });

    after(() => {
      connection.execute.restore();
    });

    it('Verifica se o retorno é um array', async () => {
      const response = await SalesModel.getAll();
      expect(response).to.be.an('array')
    });

    it('Verifica se retorna um array com os objetos', async () => {
      const response = await SalesModel.getAll();
      expect(response).to.be.equal(getSales);
    });
  });
  describe('Verifica se a função getById retorna as vendas por Id', () => {
    request.params = { id: 1 };

    const getSaleById = [
      {
        "date": "2021-07-05T04:54:24.000Z",
        "productId": 1,
        "quantity": 4
      },
      {
        "date": "2021-07-05T04:54:23.000Z",
        "productId": 2,
        "quantity": 8
      },
      {
        "date": "2021-07-05T04:54:21.000Z",
        "productId": 3,
        "quantity": 3
      }
    ]
    before(() => {
      sinon.stub(connection, 'execute').resolves([getSaleById]);
    });

    after(() => {
      connection.execute.restore();
    });

    it('Espera que retorne o array de vendas', async () => {
      const response = await SalesModel.getById(1);
      expect(response).to.be.an('array');
    });

    it('Verifica se retorna um array de objetos com a propriedade "quantity"', async () => {
      const response = await SalesModel.getById(1);
      response.forEach((sale) => expect(sale).to.have.property('quantity'));
    });
  });
  describe('Verifica na função Update se a venda é atualizada', () => {
    const updatedSales = {
      "saleId": 1,
      "itemUpdated": [
        {
          "productId": 1,
          "quantity": 3
        }
      ]
    }

    before(async () => {
      sinon.stub(connection, 'execute').resolves(updatedSales);
    });

    after(async () => {
      connection.execute.restore();
    });

    it('Verifica se retorna um objeto', async () => {
      const response = await SalesModel.update(updatedSales.itemUpdated, 1);
      console.log(response);
      expect(response).to.be.an('object');
    });
  });
}); 
