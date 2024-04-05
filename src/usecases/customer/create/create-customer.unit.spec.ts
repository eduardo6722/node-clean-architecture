import { CreateCustomerUseCase } from './create-customer';

const input = {
  name: 'John Doe',
  address: {
    street: 'Main Street',
    number: '10',
    zip: '123456',
    city: 'New York',
  },
};

const MockRespository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe('Create customer unit tests', () => {
  it('should create a new customer', async () => {
    const customerRespository = MockRespository();
    const createCustomerUseCase = new CreateCustomerUseCase(
      customerRespository,
    );
    const output = await createCustomerUseCase.execute(input);
    expect({
      id: expect.any(String),
      name: input.name,
      address: input.address,
    }).toEqual(output);
  });

  it('should return null if an error occurs', async () => {
    const customerRespository = MockRespository();
    customerRespository.create.mockRejectedValue(new Error('Internal error'));
    const createCustomerUseCase = new CreateCustomerUseCase(
      customerRespository,
    );
    const output = await createCustomerUseCase.execute(input);
    expect(output).toBeNull();
  });
});
