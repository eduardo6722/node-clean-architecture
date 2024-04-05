export class OrderItem {
  private _id: string;
  private _name: string;
  private _price: number;
  private _productId: string;
  private _quantity: number;
  private _order_id: string;

  constructor(
    id: string,
    name: string,
    price: number,
    productId: string,
    quantity: number,
  ) {
    this._id = id;
    this._name = name;
    this._price = price;
    this._productId = productId;
    this._quantity = quantity;
  }

  orderItemTotal() {
    return this._price * this._quantity;
  }

  get quantity() {
    return this._quantity;
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get price() {
    return this._price;
  }

  get productId() {
    return this._productId;
  }

  get orderId() {
    return this._order_id;
  }
}
