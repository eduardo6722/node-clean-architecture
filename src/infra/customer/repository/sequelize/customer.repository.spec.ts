import { Sequelize } from 'sequelize-typescript';
import { Customer } from '../../../../domain/customer/entity/customer';
import { Address } from '../../../../domain/customer/value-object/address';
import { CustomerModel } from './customer.model';
import { CustomerRepository } from './customer.repository';

describe('Customer repository tests', () => {
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

  it('should create a new customer', async () => {
    const customer = new Customer('1', 'Customer 1');
    customer.Address = new Address('Street 1', '123', '12345', 'New York');

    const customerRepository = new CustomerRepository();
    await customerRepository.create(customer);

    const foundCustomer = await CustomerModel.findOne({ where: { id: '1' } });

    expect(foundCustomer?.toJSON()).toStrictEqual({
      id: '1',
      name: 'Customer 1',
      active: false,
      street: 'Street 1',
      number: '123',
      zip: '12345',
      city: 'New York',
    });
  });

  it('should find a customer', async () => {
    const customer = new Customer('1', 'Customer 1');
    customer.Address = new Address('Street 1', '123', '12345', 'New York');

    const customerRepository = new CustomerRepository();
    await customerRepository.create(customer);

    const foundCustomerRepository = await customerRepository.find('1');

    expect(foundCustomerRepository.id).toBe('1');
    expect(foundCustomerRepository.name).toBe('Customer 1');
    expect(foundCustomerRepository.address._street).toBe('Street 1');
  });

  it('should update a customer', async () => {
    const customer = new Customer('1', 'Customer 1');
    customer.Address = new Address('Street 1', '123', '12345', 'New York');

    const customerRepository = new CustomerRepository();
    await customerRepository.create(customer);

    const foundCustomerRepository = await customerRepository.find('1');

    expect(foundCustomerRepository.id).toBe('1');
    expect(foundCustomerRepository.name).toBe('Customer 1');
    expect(foundCustomerRepository.address._street).toBe('Street 1');

    customer.changeName('Customer 2');
    const newAddress = new Address('Street 2', '123', '12345', 'New York');
    customer.Address = newAddress;

    await customerRepository.update(customer);

    const afterUpdateCustomerRepository = await customerRepository.find('1');

    expect(afterUpdateCustomerRepository.id).toBe('1');
    expect(afterUpdateCustomerRepository.name).toBe('Customer 2');
    expect(afterUpdateCustomerRepository.address._street).toBe('Street 2');
  });

  it('should find all customers', async () => {
    const customer = new Customer('1', 'Customer 1');
    customer.Address = new Address('Street 1', '123', '12345', 'New York');
    const customer2 = new Customer('2', 'Customer 2');
    customer2.Address = new Address('Street 2', '123', '12345', 'New York');

    const customerRepository = new CustomerRepository();
    await customerRepository.create(customer);
    await customerRepository.create(customer2);

    const customers = await customerRepository.findAll();

    expect(customers.length).toBe(2);
  });

  it('should activate a customer', async () => {
    const customer = new Customer('1', 'Customer 1');
    customer.Address = new Address('Street 1', '123', '12345', 'New York');

    const customerRepository = new CustomerRepository();
    await customerRepository.create(customer);

    const foundCustomer = await customerRepository.find('1');

    expect(foundCustomer.isActive()).toBe(false);

    customer.activate();

    await customerRepository.activate('1');

    const foundCustomer2 = await customerRepository.find('1');

    expect(foundCustomer2.isActive()).toBe(true);
  });

  it('should deactivate a customer', async () => {
    const customer = new Customer('1', 'Customer 1');
    customer.Address = new Address('Street 1', '123', '12345', 'New York');

    const customerRepository = new CustomerRepository();
    await customerRepository.create(customer);

    const foundCustomer = await customerRepository.find('1');

    expect(foundCustomer.isActive()).toBe(false);

    customer.activate();

    await customerRepository.activate('1');

    const foundCustomer2 = await customerRepository.find('1');

    expect(foundCustomer2.isActive()).toBe(true);

    await customerRepository.deactivate('1');

    const foundCustomer3 = await customerRepository.find('1');

    expect(foundCustomer3.isActive()).toBe(false);
  });
});
