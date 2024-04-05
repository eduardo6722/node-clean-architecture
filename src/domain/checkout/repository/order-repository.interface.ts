import { Order } from '../entity/order';
import { IRepository } from '../../@shared/repository/repository.interface';

export interface IOrderRepository extends IRepository<Order> {}
