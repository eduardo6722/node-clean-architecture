import { FindProductByIdUsecase } from './find-product-by-id';

const ProductRepositoryMock = {
  create: jest.fn(),
  findAll: jest.fn(),
  find: jest.fn(),
  update: jest.fn(),
};

describe('Find product by ID unit tests', () => {
  let findProductByIdUsecase: FindProductByIdUsecase;

  beforeEach(() => {
    findProductByIdUsecase = new FindProductByIdUsecase(ProductRepositoryMock);
  });

  it('should return the product', async () => {
    ProductRepositoryMock.find.mockResolvedValueOnce({
      id: '1',
      name: 'Product 1',
      price: 100,
    });
    const output = await findProductByIdUsecase.execute('1');
    expect(output.id).toBe('1');
    expect(output.name).toBe('Product 1');
    expect(output.price).toBe(100);
  });

  it('should return null no product is found', async () => {
    ProductRepositoryMock.find.mockResolvedValueOnce(null);
    const output = await findProductByIdUsecase.execute('123');
    expect(output).toBeNull();
  });

  it('should return null if an error occurs', async () => {
    ProductRepositoryMock.find.mockRejectedValueOnce(new Error());
    const output = await findProductByIdUsecase.execute('123');
    expect(output).toBeNull();
  });
});
