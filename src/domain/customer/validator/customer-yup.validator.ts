import * as yup from 'yup';
import { IValidator } from '../../@shared/validator/validator.interface';
import { Customer } from '../entity/customer';

export class CustomerYupValidator implements IValidator<Customer> {
  validate(entity: Customer): void {
    try {
      const schema = yup.object().shape({
        id: yup.string().required('id is required'),
        name: yup.string().required('name is required'),
      });
      schema.validateSync(
        {
          id: entity.id,
          name: entity.name,
        },
        {
          abortEarly: false,
        },
      );
    } catch (errors) {
      const yupError = errors as yup.ValidationError;
      yupError.errors.forEach((error) => {
        entity.notification.addError({
          context: 'customer',
          message: error,
        });
      });
    }
  }
}
