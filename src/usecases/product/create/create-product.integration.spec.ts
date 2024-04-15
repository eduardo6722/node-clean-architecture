import { Sequelize } from 'sequelize-typescript';
import { ProductModel } from '../../../infra/product/repository/sequelize/product.model';
import { ProductRepository } from '../../../infra/product/repository/sequelize/product.repository';
import { CreateProductUseCase } from './create-product';

const input = {
  name: 'Product 1',
  price: 100,
};

describe('Create Product integration tests', () => {
  let createProductUseCase: CreateProductUseCase;
  let sequelize: Sequelize;
  const productRepository = new ProductRepository();

  beforeEach(async () => {
    createProductUseCase = new CreateProductUseCase(productRepository);
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should create a product', async () => {
    const output = await createProductUseCase.execute(input);
    expect(input.name).toEqual(output.name);
    expect(input.price).toEqual(output.price);
    expect(output.id).toBeDefined();
  });
});
