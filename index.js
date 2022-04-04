require('dotenv').config();

const express = require('express');

const products = require('./routes/products');

const sales = require('./routes/sales');

const errorMiddleware = require('./middlewares/errorMiddleware');

const app = express();

app.use(express.json());
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', products);

app.use('/sales', sales);

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
