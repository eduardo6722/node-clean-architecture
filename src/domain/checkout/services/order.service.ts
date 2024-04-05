import { Customer } from '../../customer/entity/customer';
import { Order } from '../entity/order';
import { OrderItem } from '../entity/order_item';
import { v4 as uuidV4 } from 'uuid';

export class OrderService {
  static placeOrder(customer: Customer, orderItems: OrderItem[]) {
    if (!orderItems?.length) {
      throw new Error('Order must have at least one item');
    }
    const order = new Order(uuidV4(), customer._id, orderItems);
    customer.addRewardPoints(order.total() / 2);
    return order;
  }

  static total(orders: Order[]) {
    return orders.reduce((sum, order) => (sum += order.total()), 0);
  }
}
