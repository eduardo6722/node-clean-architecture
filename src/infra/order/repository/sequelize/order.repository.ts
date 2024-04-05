import { Order } from '../../../../domain/checkout/entity/order';
import { OrderItem } from '../../../../domain/checkout/entity/order_item';
import { IOrderRepository } from '../../../../domain/checkout/repository/order-repository.interface';
import { OrderItemModel } from './order-item.model';
import { OrderModel } from './order.model';

export class OrderRepository implements IOrderRepository {
  async create(entity: Order): Promise<void> {
    try {
      await OrderModel.create(
        {
          id: entity.id,
          customer_id: entity.customerId,
          total: entity.total(),
          items: entity.items.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            product_id: item.productId,
            quantity: item.quantity,
          })),
        },
        {
          include: [
            {
              association: 'items',
              model: OrderItemModel,
            },
          ],
        },
      );
    } catch (error) {
      throw new Error('Failed do create order' + error);
    }
  }

  async update(entity: Order): Promise<void> {
    try {
      await OrderModel.update(
        {
          total: entity.total(),
        },
        { where: { id: entity.id } },
      );

      await Promise.all(
        entity.items.map(async (item) => {
          const findItem = await OrderItemModel.findByPk(item.id);
          if (!findItem?.toJSON()?.id) {
            await OrderItemModel.create({
              id: item.id,
              name: item.name,
              price: item.price,
              product_id: item.productId,
              quantity: item.quantity,
              order_id: entity.id,
            });
          }
        }),
      );
    } catch (error) {
      throw new Error('Failed do update order' + error);
    }
  }

  async find(id: string): Promise<Order | null> {
    try {
      const orderModel = await OrderModel.findOne({
        where: { id },
        include: ['items', 'customer'],
      });
      const data = orderModel?.toJSON();
      if (!data) {
        return null;
      }
      const items = data.items.map(
        (item: OrderItem) =>
          new OrderItem(
            item.id,
            item.name,
            item.price,
            item.productId,
            item.quantity,
          ),
      );
      return new Order(data.id, data.customer_id, items);
    } catch (error) {
      throw new Error('Failed do find order' + error);
    }
  }

  async findAll(): Promise<Order[]> {
    try {
      const ordersModel = await OrderModel.findAll({
        include: ['items', 'customer'],
      });
      if (!ordersModel.length) {
        return [];
      }

      return ordersModel.map((order: OrderModel) => {
        const data = order.toJSON();
        const items = data.items.map(
          (item: OrderItem) =>
            new OrderItem(
              item.id,
              item.name,
              item.price,
              item.productId,
              item.quantity,
            ),
        );
        return new Order(order.id, order.customer_id, items);
      });
    } catch (error) {
      throw new Error('Failed do find all orders' + error);
    }
  }
}
