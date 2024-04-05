import { ICustomerRepository } from '../../../domain/customer/repository/customer-repository.interface';
import {
  IFindCustomerInputDto,
  IFindCustomerOutputDto,
} from './find-customer.dto';

export class FindCustomerByIdUseCase {
  private customerRespository: ICustomerRepository;

  constructor(customerRepository: ICustomerRepository) {
    this.customerRespository = customerRepository;
  }

  async execute({
    id,
  }: IFindCustomerInputDto): Promise<IFindCustomerOutputDto | null> {
    try {
      const customer = await this.customerRespository.find(id);
      return {
        id: customer.id,
        name: customer.name,
        address: {
          street: customer.address._street,
          city: customer.address._city,
          number: customer.address._number,
          zip: customer.address._zip,
        },
      };
    } catch {
      return null;
    }
  }
}
