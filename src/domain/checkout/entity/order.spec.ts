import { Order } from './order';
import { OrderItem } from './order_item';

describe('Order', () => {
  it('should throw an error when id is empty', () => {
    expect(() => new Order('', '123', [])).toThrow('Id is required');
  });

  it('should throw an error when customer_id is empty', () => {
    expect(() => new Order('123', '', [])).toThrow('Customer is required');
  });

  it('should throw an error when there is no items', () => {
    expect(() => new Order('123', '123', [])).toThrow('Item is required');
  });

  it('should calculate total', () => {
    const item = new OrderItem('1', 'Laptop', 500, '1', 1);
    const order = new Order('1', '2', [item]);
    expect(order.total()).toBe(500);

    const item2 = new OrderItem('2', 'iPhone', 400, '1', 2);
    const order2 = new Order('1', '2', [item, item2]);
    expect(order2.total()).toBe(1300);
  });

  it('should check if the item quantity is valid', () => {
    expect(() => {
      const item = new OrderItem('1', 'Laptop', 500, '1', -1);
      new Order('1', '2', [item]);
    }).toThrow('Quantity is invalid');
  });
});
