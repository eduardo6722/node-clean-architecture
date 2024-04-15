import { Sequelize } from 'sequelize-typescript';
import { ProductModel } from '../../../infra/product/repository/sequelize/product.model';
import { ProductRepository } from '../../../infra/product/repository/sequelize/product.repository';
import { FindAllProductsUseCase } from './find-all-products';

const input = {
  name: 'Product 1',
  price: 100,
};

describe('Find all products integration tests', () => {
  let findAllProductsUseCase: FindAllProductsUseCase;
  let sequelize: Sequelize;
  const productRepository = new ProductRepository();

  beforeEach(async () => {
    findAllProductsUseCase = new FindAllProductsUseCase(productRepository);
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

  it('should find all products', async () => {
    await ProductModel.create({
      id: '123',
      name: input.name,
      price: input.price,
    });
    await ProductModel.create({
      id: '456',
      name: input.name,
      price: input.price,
    });
    const output = await findAllProductsUseCase.execute();
    expect(output).toHaveLength(2);
    expect(output[0].id).toBe('123');
    expect(output[0].name).toBe(input.name);
  });
});
