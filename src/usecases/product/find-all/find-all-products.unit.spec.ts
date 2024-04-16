import { FindAllProductsUseCase } from './find-all-products';

const ProductRepositoryMock = {
  create: jest.fn(),
  findAll: jest.fn(),
  find: jest.fn(),
  update: jest.fn(),
};

describe('Find all products unit tests', () => {
  let findAllProductsUseCase: FindAllProductsUseCase;

  beforeEach(() => {
    findAllProductsUseCase = new FindAllProductsUseCase(ProductRepositoryMock);
  });

  it('should return a list of products', async () => {
    ProductRepositoryMock.findAll.mockResolvedValueOnce([
      {
        id: '1',
        name: 'Product 1',
        price: 100,
      },
    ]);
    const output = await findAllProductsUseCase.execute();
    expect(output).toEqual({
      products: [
        {
          id: '1',
          name: 'Product 1',
          price: 100,
        },
      ],
    });
  });

  it('should return an empty list if no products are found', async () => {
    ProductRepositoryMock.findAll.mockResolvedValueOnce([]);
    const output = await findAllProductsUseCase.execute();
    expect(output.products).toEqual([]);
  });

  it('should return an empty list if an error occurs', async () => {
    ProductRepositoryMock.findAll.mockRejectedValueOnce(new Error());
    const output = await findAllProductsUseCase.execute();
    expect(output).toBeNull();
  });
});
