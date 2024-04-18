import express, { Express } from 'express';
import { Sequelize } from 'sequelize-typescript';
import { CustomerModel } from '../customer/repository/sequelize/customer.model';
import { ProductModel } from '../product/repository/sequelize/product.model';
import { customerRouter } from './routes/customer.route';
import { productRouter } from './routes/product.route';

const app: Express = express();
app.use(express.json());
app.use(customerRouter);
app.use(productRouter);

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: ':memory:',
  logging: false,
});

async function initDB() {
  sequelize.addModels([CustomerModel, ProductModel]);
  await sequelize.sync();
}

initDB();

export { app, sequelize };
