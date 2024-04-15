import { Sequelize } from 'sequelize-typescript';
import { ProductModel } from '../../../infra/product/repository/sequelize/product.model';
import { ProductRepository } from '../../../infra/product/repository/sequelize/product.repository';
import { FindProductByIdUsecase } from './find-product-by-id';

const input = {
  name: 'Product 1',
  price: 100,
};

describe('Find product by ID integration tests', () => {
  let findProductByIdUseCase: FindProductByIdUsecase;
  let sequelize: Sequelize;
  const productRepository = new ProductRepository();

  beforeEach(async () => {
    findProductByIdUseCase = new FindProductByIdUsecase(productRepository);
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

  it('should find the product by id', async () => {
    await ProductModel.create({
      id: '123',
      name: input.name,
      price: input.price,
    });
    const output = await findProductByIdUseCase.execute('123');
    expect(output.id).toBe('123');
    expect(output.name).toBe(input.name);
    expect(output.price).toBe(input.price);
  });
});
