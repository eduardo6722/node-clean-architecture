import { Product } from '../entity/product';
import { ProductB } from '../entity/product-b';
import { IProduct } from '../entity/product.interface';
import { v4 as uuid } from 'uuid';

export class ProductFactory {
  static create(type: string, name: string, price: number): IProduct {
    if (type === 'b') return new ProductB(uuid(), name, price);
    return new Product(uuid(), name, price);
  }
}
