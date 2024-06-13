import { IValidator } from '../../@shared/validator/validator.interface';
import { Customer } from '../entity/customer';
import { CustomerYupValidator } from '../validator/customer-yup.validator';

export class CustomerValidaorFactory {
  static create(): IValidator<Customer> {
    return new CustomerYupValidator();
  }
}
