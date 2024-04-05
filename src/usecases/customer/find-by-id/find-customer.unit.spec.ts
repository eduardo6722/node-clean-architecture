import { Customer } from '../../../domain/customer/entity/customer';
import { Address } from '../../../domain/customer/value-object/address';
import { FindCustomerByIdUseCase } from './find-customer-by-id.usecase';

const customer = new Customer('1', 'John Doe');
const address = new Address('4th Avenue', '123', '12345', 'New York');
customer.changeAddress(address);

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe('Find customer by id unit tests', () => {
  it('should find a customer by id', async () => {
    const customerRepository = MockRepository();
    const usecase = new FindCustomerByIdUseCase(customerRepository);

    await customerRepository.create(customer);

    const input = {
      id: '1',
    };

    const output = await usecase.execute(input);

    expect(output).toEqual({
      id: '1',
      name: 'John Doe',
      address: {
        street: '4th Avenue',
        city: 'New York',
        number: '123',
        zip: '12345',
      },
    });
  });

  it('should return null if customer is not found', async () => {
    const customerRepository = MockRepository();
    const usecase = new FindCustomerByIdUseCase(customerRepository);

    customerRepository.find.mockImplementation(() => {
      throw new Error('Customer not found');
    });

    const input = {
      id: '1',
    };

    const output = await usecase.execute(input);

    expect(output).toBeNull();
  });
});
