const sinon = require('sinon');
const { expect } = require('chai');

const salesService = require('../../../services/SaleService');
const salesModel = require('../../../models/SaleModel');

describe('Testa o SaleService', () => {
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
      sinon.stub(salesModel, 'getAll').resolves(getSales);
    });

    after(() => {
      salesModel.getAll.restore();
    });

    it('Verifica se o retorno é um array', async () => {
      const response = await salesService.getAll();
      expect(response).to.be.an('array')
    });

    it('Verifica se retorna um array com os objetos', async () => {
      const response = await salesService.getAll();
      expect(response).to.be.equal(getSales);
    });
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
    sinon.stub(salesModel, 'getById').resolves(getSaleById);
  });

  after(() => {
    salesModel.getById.restore();
  });

  it('Espera que retorne o array de vendas', async () => {
    const response = await salesService.getById(1);
    expect(response).to.be.an('array');
  });
});
