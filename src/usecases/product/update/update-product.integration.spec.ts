import { Sequelize } from 'sequelize-typescript';
import { ProductModel } from '../../../infra/product/repository/sequelize/product.model';
import { ProductRepository } from '../../../infra/product/repository/sequelize/product.repository';
import { UpdateProductUseCase } from './update-product';

const input = {
  name: 'Product 1',
  price: 100,
};

describe('Update product integration tests', () => {
  let updateProductUseCase: UpdateProductUseCase;
  let sequelize: Sequelize;
  const productRepository = new ProductRepository();

  beforeEach(async () => {
    updateProductUseCase = new UpdateProductUseCase(productRepository);
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
    const data = await ProductModel.findOne({ where: { id: '123' } });
    const product = data.toJSON();
    await updateProductUseCase.execute({
      id: product.id,
      name: 'Product 1 Updated',
      price: 200,
    });
    const updatedProduct = await ProductModel.findOne({
      where: { id: '123' },
    });
    expect(updatedProduct.name).toBe('Product 1 Updated');
    expect(updatedProduct.price).toBe(200);
  });
});
