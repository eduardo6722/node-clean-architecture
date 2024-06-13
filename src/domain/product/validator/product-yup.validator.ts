import * as yup from 'yup';
import { IValidator } from '../../@shared/validator/validator.interface';
import { Product } from '../entity/product';

export class ProductYupValidator implements IValidator<Product> {
  validate(entity: Product): void {
    try {
      const schema = yup.object().shape({
        id: yup.string().required('id is required'),
        name: yup.string().required('name is required'),
        price: yup.number().min(1, 'price must be greater than 0'),
      });
      schema.validateSync(
        {
          id: entity.id,
          name: entity.name,
          price: entity.price,
        },
        {
          abortEarly: false,
        },
      );
    } catch (errors) {
      const yupError = errors as yup.ValidationError;
      yupError.errors.forEach((error) => {
        entity.notification.addError({
          context: 'product',
          message: error,
        });
      });
    }
  }
}
