import { Sequelize } from 'sequelize-typescript';
import { CustomerModel } from '../../../infra/customer/repository/sequelize/customer.model';
import { CustomerRepository } from '../../../infra/customer/repository/sequelize/customer.repository';
import { Customer } from '../../../domain/customer/entity/customer';
import { Address } from '../../../domain/customer/value-object/address';
import { FindCustomerByIdUseCase } from './find-customer-by-id.usecase';

describe('Find customer by id use case', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should find a customer by id', async () => {
    const customerRepository = new CustomerRepository();
    const usecase = new FindCustomerByIdUseCase(customerRepository);

    const customer = new Customer('1', 'John Doe');
    const address = new Address('4th Avenue', '123', '12345', 'New York');
    customer.changeAddress(address);

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
});
