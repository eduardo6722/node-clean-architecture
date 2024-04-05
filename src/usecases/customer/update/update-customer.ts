import { ICustomerRepository } from '../../../domain/customer/repository/customer-repository.interface';
import { Address } from '../../../domain/customer/value-object/address';
import {
  IUpdateCustomerInputDto,
  IUpdateCustomerOutDto,
} from './update-customer.dto';

export class UpdateCustomerUseCase {
  private customerRepository: ICustomerRepository;

  constructor(customerRepository: ICustomerRepository) {
    this.customerRepository = customerRepository;
  }

  async execute(
    input: IUpdateCustomerInputDto,
  ): Promise<IUpdateCustomerOutDto | null> {
    try {
      const customer = await this.customerRepository.find(input.id);
      if (!customer) {
        throw new Error('Customer not found');
      }
      customer.changeName(input.name);
      customer.changeAddress(
        new Address(
          input.address.street,
          input.address.number,
          input.address.zip,
          input.address.city,
        ),
      );
      await this.customerRepository.update(customer);
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
    } catch (error) {
      return null;
    }
  }
}
