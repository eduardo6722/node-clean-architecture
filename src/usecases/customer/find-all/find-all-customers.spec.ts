import { CustomerFactory } from '../../../domain/customer/factory/customer.factory';
import { Address } from '../../../domain/customer/value-object/address';
import { FindAllCustomersUseCase } from './find-all-customers';

const customer1 = CustomerFactory.createWithAddress(
  'John Doe',
  new Address('Main Street', '10', '123456', 'New York'),
);
const customer2 = CustomerFactory.createWithAddress(
  'John Doe 2 ',
  new Address('Main Street 2', '10', '123456', 'New York'),
);
const customer3 = CustomerFactory.createWithAddress(
  'John Doe 3 ',
  new Address('Main Street 3', '10', '123456', 'New York'),
);

const MockRespository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn().mockResolvedValue([customer1, customer2, customer3]),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe('Find all customer unit tests', () => {
  it('should return all customers', async () => {
    const customerRespository = MockRespository();
    const findAllCustomersUseCase = new FindAllCustomersUseCase(
      customerRespository,
    );
    const output = await findAllCustomersUseCase.execute();
    expect(output.customers).toHaveLength(3);
  });

  it('should return null if an error occurs', async () => {
    const customerRespository = MockRespository();
    customerRespository.findAll.mockRejectedValue(new Error('Internal error'));
    const findAllCustomersUseCase = new FindAllCustomersUseCase(
      customerRespository,
    );
    const output = await findAllCustomersUseCase.execute();
    expect(output).toBeNull();
  });

  it('should return empty array if no customers found', async () => {
    const customerRespository = MockRespository();
    customerRespository.findAll.mockResolvedValue([]);
    const findAllCustomersUseCase = new FindAllCustomersUseCase(
      customerRespository,
    );
    const output = await findAllCustomersUseCase.execute();
    expect(output).toEqual({ customers: [] });
  });
});
