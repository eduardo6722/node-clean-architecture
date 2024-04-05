import { ICustomerRepository } from '../../../domain/customer/repository/customer-repository.interface';
import { IFindAllCustomersOutputDto } from './find-all-customers.dto';

export class FindAllCustomersUseCase {
  private customerRepository: ICustomerRepository;

  constructor(customerRepository: ICustomerRepository) {
    this.customerRepository = customerRepository;
  }

  async execute(): Promise<IFindAllCustomersOutputDto> {
    try {
      const response = await this.customerRepository.findAll();
      if (!response) {
        return { customers: [] };
      }
      return {
        customers: response.map((customer) => ({
          id: customer.id,
          name: customer.name,
          address: {
            street: customer.address._street,
            number: customer.address._number,
            zip: customer.address._zip,
            city: customer.address._city,
          },
        })),
      };
    } catch (error) {
      return null;
    }
  }
}
