import { Sequelize } from 'sequelize-typescript';
import { CustomerModel } from '../../../customer/repository/sequelize/customer.model';
import { OrderModel } from './order.model';
import { OrderItemModel } from './order-item.model';
import { ProductModel } from '../../../product/repository/sequelize/product.model';
import { CustomerRepository } from '../../../customer/repository/sequelize/customer.repository';
import { Customer } from '../../../../domain/customer/entity/customer';
import { Address } from '../../../../domain/customer/value-object/address';
import { ProductRepository } from '../../../product/repository/sequelize/product.repository';
import { Product } from '../../../../domain/product/entity/product';
import { OrderItem } from '../../../../domain/checkout/entity/order_item';
import { Order } from '../../../../domain/checkout/entity/order';
import { OrderRepository } from './order.repository';

describe('Order repository tests', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([
      CustomerModel,
      OrderModel,
      OrderItemModel,
      ProductModel,
    ]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  async function createCustomer() {
    const customerRepository = new CustomerRepository();
    const customer = new Customer('123', 'Customer 1');
    const address = new Address('Street 1', '123', 'City 1', 'State 1');
    customer.Address = address;
    await customerRepository.create(customer);
    return customer;
  }

  async function createProduct(id: string, name: string, price: number) {
    const productRepository = new ProductRepository();
    const product = new Product(id, name, price);
    await productRepository.create(product);
    return product;
  }

  async function createOrderItem(
    id: string,
    quantity: number,
    product: Product,
  ) {
    const orderItem = new OrderItem(
      id,
      product.name,
      product.price,
      product.id,
      quantity,
    );

    return orderItem;
  }

  async function createOrder(
    id: string,
    orderItems: OrderItem[],
    customer: Customer,
  ) {
    const order = new Order(id, customer.id, orderItems);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    return order;
  }

  async function updateOrder(order: Order) {
    const orderRepository = new OrderRepository();
    await orderRepository.update(order);

    return order;
  }

  it('should create an order', async () => {
    const customer = await createCustomer();
    const product = await createProduct('123', 'Product 1', 10);
    const orderItem = await createOrderItem('1', 1, product);

    const order = await createOrder('123', [orderItem], customer);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ['items'],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: '123',
      customer_id: '123',
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          product_id: '123',
          order_id: '123',
        },
      ],
    });
  });

  it('should update an order', async () => {
    const customer = await createCustomer();
    const product = await createProduct('123', 'Product 1', 10);
    const orderItem = await createOrderItem('1', 1, product);

    const order = await createOrder('456', [orderItem], customer);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ['items'],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: '456',
      customer_id: '123',
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          product_id: '123',
          order_id: '456',
        },
      ],
    });

    const product2 = await createProduct('456', 'Product 2', 20);
    const orderItem2 = await createOrderItem('2', 1, product2);

    order.addItem(orderItem2);

    await updateOrder(order);

    const orderModel2 = await OrderModel.findOne({
      where: { id: order.id },
      include: ['items'],
    });

    expect(orderModel2.toJSON()).toStrictEqual({
      id: '456',
      customer_id: '123',
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          product_id: '123',
          order_id: '456',
        },
        {
          id: orderItem2.id,
          name: orderItem2.name,
          price: orderItem2.price,
          quantity: orderItem2.quantity,
          product_id: '456',
          order_id: '456',
        },
      ],
    });
  });

  it('should find an order', async () => {
    const customer = await createCustomer();
    const product = await createProduct('123', 'Product 1', 10);
    const orderItem = await createOrderItem('1', 1, product);

    const order = await createOrder('789', [orderItem], customer);

    const orderRepository = new OrderRepository();
    const findOrder = await orderRepository.find(order.id);

    expect(findOrder.id).toBe(order.id);
    expect(findOrder.customerId).toBe(order.customerId);
    expect(findOrder.total()).toBe(order.total());
    expect(findOrder.items.length).toBe(order.items.length);
  });

  it('should not find an order', async () => {
    const orderRepository = new OrderRepository();
    const findOrder = await orderRepository.find('123456');
    expect(findOrder).toBeNull();
  });

  it('should find all orders', async () => {
    const customer = await createCustomer();
    const product = await createProduct('123', 'Product 1', 10);
    const orderItem = await createOrderItem('1', 1, product);
    const product2 = await createProduct('1232', 'Product 2', 20);
    const orderItem2 = await createOrderItem('2', 1, product2);

    const order = await createOrder('789', [orderItem], customer);
    const order2 = await createOrder('78910', [orderItem2], customer);

    const orderRepository = new OrderRepository();
    const orders = await orderRepository.findAll();

    expect(orders.length).toBe(2);
    expect(orders[0].id).toBe(order.id);
    expect(orders[0].customerId).toBe(order.customerId);
    expect(orders[0].total()).toBe(order.total());
    expect(orders[0].items.length).toBe(order.items.length);
    expect(orders[1].id).toBe(order2.id);
    expect(orders[1].customerId).toBe(order2.customerId);
    expect(orders[1].total()).toBe(order2.total());
    expect(orders[1].items.length).toBe(order2.items.length);
  });
});
