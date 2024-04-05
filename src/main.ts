import { Address } from './domain/customer/value-object/address';
import { Customer } from './domain/customer/entity/customer';
import { Order } from './domain/checkout/entity/order';
import { OrderItem } from './domain/checkout/entity/order_item';

const customer = new Customer('123', 'Eduardo');
const address = new Address('Rua 1', '2', '12345-678', 'Dourados');

customer.Address = address;
customer.activate();

const item1 = new OrderItem('1', 'iPhone', 5000, '123', 1);
const item2 = new OrderItem('2', 'Galaxy', 5500, '456', 1);

const order = new Order('1', customer._id, [item1, item2]);

// eslint-disable-next-line no-console
console.log('order: ', order);
