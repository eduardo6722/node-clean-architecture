import { Request, Response, Router } from 'express';
import { CreateCustomerUseCase } from '../../../usecases/customer/create/create-customer';
import { ICreateCustomerInputDto } from '../../../usecases/customer/create/create-customer.dto';
import { FindAllCustomersUseCase } from '../../../usecases/customer/find-all/find-all-customers';
import { CustomerRepository } from '../../customer/repository/sequelize/customer.repository';

export const customerRouter = Router();

customerRouter.post('/customers', async (req: Request, res: Response) => {
  const usecase = new CreateCustomerUseCase(new CustomerRepository());
  try {
    const customerDto: ICreateCustomerInputDto = {
      name: req.body.name,
      address: {
        street: req.body.address.street,
        number: req.body.address.number,
        city: req.body.address.city,
        zip: req.body.address.zip,
      },
    };
    const output = await usecase.execute(customerDto);
    return res.status(201).json(output);
  } catch {
    return res.status(500).json({ message: 'Internal server error' });
  }
});

customerRouter.get('/customers', async (req: Request, res: Response) => {
  const usecase = new FindAllCustomersUseCase(new CustomerRepository());
  try {
    const response = await usecase.execute();
    return res.status(200).json(response);
  } catch {
    return res.status(500).json({ message: 'Internal server error' });
  }
});
