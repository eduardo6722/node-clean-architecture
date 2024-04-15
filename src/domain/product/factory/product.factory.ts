import { v4 as uuid } from 'uuid';
import { Product } from '../entity/product';

export class ProductFactory {
  static create(name: string, price: number): Product {
    return new Product(uuid(), name, price);
  }
}
