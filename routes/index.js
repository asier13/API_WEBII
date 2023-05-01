const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const productsRouter = require('./routes/products');
app.use('/api/products', productsRouter);

const ordersRouter = require('./routes/orders');
app.use('/api/orders', ordersRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}...`);
});
