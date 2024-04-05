import { CustomerFactory } from '../../../domain/customer/factory/customer.factory';
import { ICustomerRepository } from '../../../domain/customer/repository/customer-repository.interface';
import { Address } from '../../../domain/customer/value-object/address';
import {
  ICreateCustomerInputDto,
  ICreateCustomerOutputDto,
} from './create-customer.dto';

export class CreateCustomerUseCase {
  private customerRepository: ICustomerRepository;

  constructor(customerRepository: ICustomerRepository) {
    this.customerRepository = customerRepository;
  }

  async execute(
    input: ICreateCustomerInputDto,
  ): Promise<ICreateCustomerOutputDto> {
    try {
      const customer = CustomerFactory.createWithAddress(
        input.name,
        new Address(
          input.address.street,
          input.address.number,
          input.address.zip,
          input.address.city,
        ),
      );

      await this.customerRepository.create(customer);

      return {
        id: customer.id,
        name: customer.name,
        address: {
          street: customer.address._street,
          number: customer.address._number,
          zip: customer.address._zip,
          city: customer.address._city,
        },
      };
    } catch {
      return null;
    }
  }
}
