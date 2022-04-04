const sinon = require('sinon');
const { expect } = require('chai');

const SaleService = require('../../../services/SaleService');
const SaleController = require('../../../controllers/SaleController');

describe('Testa o SaleController', () => {
  const response = {};
  const request = {};

  describe('Verifica se a função getAll retorna todas as vendas', () => {
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
    ]

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(SaleService, 'getAll').resolves(getSales);
    });

    after(async () => {
      SaleService.getAll.restore();
    });

    it('Espera que o status retorne o código 200', async () => {
      await SaleController.getAll(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('Espera que com o json retorne o array com todas as vendas', async () => {
      await SaleController.getAll(request, response);
      expect(response.json.calledWith(getSales)).to.be.equal(true);
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
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(SaleService, 'getById').resolves(getSaleById);
    });

    after(async () => {
      SaleService.getById.restore();
    });

    it('Espera que o status retorne o código 200', async () => {
      await SaleController.getById(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('Espera que com o json retorne o array de vendas', async () => {
      await SaleController.getById(request, response);
      expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
    });
  });
});
