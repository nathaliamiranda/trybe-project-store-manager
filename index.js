require('dotenv').config();

const express = require('express');

const ProductController = require('./controllers/ProductController');

const SaleController = require('./controllers/SaleController');

const errorMiddleware = require('./middlewares/errorMiddleware');

const app = express();
app.use(express.json());
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', ProductController);

app.use('/sales', SaleController);

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
