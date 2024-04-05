import { Customer } from '../entity/customer';
import { Address } from '../value-object/address';
import { CustomerFactory } from './customer.factory';

describe('Customer factory unit tests', () => {
  it('should create a customer', () => {
    const customer = CustomerFactory.create('John Doe');
    expect(customer).toBeInstanceOf(Customer);
    expect(customer.name).toBe('John Doe');
    expect(customer.id).toBeDefined();
    expect(customer.address).toBeUndefined();
  });

  it('should create a customer with address', () => {
    const address = new Address('123', 'Main St', 'Springfield', '12345');
    const customer = CustomerFactory.createWithAddress('John', address);
    expect(customer.address).toBeInstanceOf(Address);
    expect(customer.address).toEqual(address);
  });
});
