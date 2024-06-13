import { Entity } from '../../@shared/entity/entity.abstract';
import { NotificationError } from '../../@shared/notification/notification.error';
import { IProduct } from './product.interface';

export class Product extends Entity implements IProduct {
  private _name: string;
  private _price: number;

  constructor(id: string, name: string, price: number) {
    super();
    this._id = id;
    this._name = name;
    this._price = price;
    this.validate();
  }

  changeName(name: string) {
    this._name = name;
    this.validate();
  }

  changePrice(price: number) {
    this._price = price;
    this.validate();
  }

  validate() {
    if (!this._id) {
      this.notification.addError({
        context: 'product',
        message: 'id is required',
      });
    }
    if (!this._name) {
      this.notification.addError({
        context: 'product',
        message: 'name is required',
      });
    }
    if (this._price < 0) {
      this.notification.addError({
        context: 'product',
        message: 'price must be greater than 0',
      });
    }
    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors());
    }
  }

  get name() {
    return this._name;
  }

  get price() {
    return this._price;
  }
}
