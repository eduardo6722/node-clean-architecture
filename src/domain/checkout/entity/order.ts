import { OrderItem } from './order_item';

export class Order {
  private _id: string;
  private _customer_id: string;
  private _items: OrderItem[];

  constructor(id: string, customer_id: string, items: OrderItem[]) {
    this._id = id;
    this._customer_id = customer_id;
    this._items = items;
    this.validate();
  }

  total() {
    return this._items.reduce((sum, item) => (sum += item.orderItemTotal()), 0);
  }

  validate() {
    if (!this._id) {
      throw new Error('Id is required');
    }
    if (!this._customer_id) {
      throw new Error('Customer is required');
    }
    if (this._items.length === 0) {
      throw new Error('Item is required');
    }
    if (this._items.some((item) => item.quantity <= 0)) {
      throw new Error('Quantity is invalid');
    }
  }

  addItem(item: OrderItem) {
    this._items.push(item);
  }

  get id() {
    return this._id;
  }

  get customerId() {
    return this._customer_id;
  }

  get items() {
    return this._items;
  }
}
