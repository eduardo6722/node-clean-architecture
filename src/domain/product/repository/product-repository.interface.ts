import { IRepository } from '../../@shared/repository/repository.interface';
import { Product } from '../entity/product';

export interface IProductRepository extends IRepository<Product> {}
