import { CreateProductUseCase } from './create-product';

const ProductRepositoryMock = {
  create: jest.fn(),
  findAll: jest.fn(),
  find: jest.fn(),
  update: jest.fn(),
};

const input = {
  name: 'Product 1',
  price: 100,
};

describe('Create Product unit tests', () => {
  let createProductUseCase: CreateProductUseCase;
  beforeEach(() => {
    createProductUseCase = new CreateProductUseCase(ProductRepositoryMock);
  });

  it('should create a product', async () => {
    ProductRepositoryMock.create.mockResolvedValueOnce(input);
    const output = await createProductUseCase.execute(input);
    expect(input.name).toEqual(output.name);
    expect(input.price).toEqual(output.price);
    expect(output.id).toBeDefined();
  });

  it('should return null if an error occurs', async () => {
    ProductRepositoryMock.create.mockRejectedValueOnce(new Error());
    const output = await createProductUseCase.execute(input);
    expect(output).toBeNull();
  });
});
