import { CustomerFactory } from '../../../domain/customer/factory/customer.factory';
import { Address } from '../../../domain/customer/value-object/address';
import { UpdateCustomerUseCase } from './update-customer';

const customer = CustomerFactory.createWithAddress(
  'John Doe',
  new Address('Main Street', '10', '123456', 'New York'),
);

const input = {
  id: customer.id,
  name: 'John Doe Updated',
  address: {
    street: 'Main 2 Street Updated',
    number: '1234',
    zip: '654321',
    city: 'Los Angeles',
  },
};

const MockRespository = () => {
  return {
    find: jest.fn().mockResolvedValue(customer),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe('Update customer unit tests', () => {
  it('should update a customer', async () => {
    const customerRespository = MockRespository();
    const updateCustomerUseCase = new UpdateCustomerUseCase(
      customerRespository,
    );
    const output = await updateCustomerUseCase.execute(input);
    expect({
      id: input.id,
      name: input.name,
      address: input.address,
    }).toEqual(output);
  });

  it('should return null if an error occurs', async () => {
    const customerRespository = MockRespository();
    customerRespository.update.mockRejectedValue(new Error('Internal error'));
    const updateCustomerUseCase = new UpdateCustomerUseCase(
      customerRespository,
    );
    const output = await updateCustomerUseCase.execute(input);
    expect(output).toBeNull();
  });

  it('should return null if customer not found', async () => {
    const customerRespository = MockRespository();
    customerRespository.find.mockResolvedValue(null);
    const updateCustomerUseCase = new UpdateCustomerUseCase(
      customerRespository,
    );
    const output = await updateCustomerUseCase.execute(input);
    expect(output).toBeNull();
  });
});
