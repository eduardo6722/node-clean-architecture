import { ProductFactory } from '../../../domain/product/factory/product.factory';
import { UpdateProductUseCase } from './update-product';

const product = ProductFactory.create('Product 1', 10.0);

const input = {
  id: product.id,
  name: 'Product 1 Updated',
  price: 20.0,
};

const ProductRepositoryMock = () => ({
  create: jest.fn(),
  findAll: jest.fn(),
  find: jest.fn().mockResolvedValue(product),
  update: jest.fn(),
});

describe('Update product unit tests', () => {
  it('should update an product', async () => {
    const productRepository = ProductRepositoryMock();
    const updateProductUseCase = new UpdateProductUseCase(productRepository);
    const output = await updateProductUseCase.execute(input);
    expect({
      id: input.id,
      name: input.name,
      price: input.price,
    }).toEqual(output);
  });

  it('should return null if no product was found', async () => {
    const productRepository = ProductRepositoryMock();
    productRepository.find.mockResolvedValue(null);
    const updateProductUseCase = new UpdateProductUseCase(productRepository);
    const output = await updateProductUseCase.execute(input);
    expect(output).toBeNull();
  });

  it('should return null if an error occurs', async () => {
    const productRepository = ProductRepositoryMock();
    productRepository.update.mockRejectedValue(new Error('Internal error'));
    const updateProductUseCase = new UpdateProductUseCase(productRepository);
    const output = await updateProductUseCase.execute(input);
    expect(output).toBeNull();
  });
});
