import { Product } from '../../../../domain/product/entity/product';
import { IProductRepository } from '../../../../domain/product/repository/product-repository.interface';
import { ProductModel } from './product.model';

export class ProductRepository implements IProductRepository {
  async create(entity: Product): Promise<void> {
    try {
      await ProductModel.create({
        id: entity.id,
        name: entity.name,
        price: entity.price,
      });
    } catch (error) {
      throw new Error('Error to create product: ' + error);
    }
  }

  async find(id: string): Promise<Product> {
    try {
      const product = await ProductModel.findOne({ where: { id } });
      return new Product(
        product?.id as string,
        product?.name as string,
        product?.price as number,
      );
    } catch (error) {
      throw new Error('Error to find products: ' + error);
    }
  }

  async findAll(): Promise<Product[]> {
    try {
      const products = await ProductModel.findAll();
      return products.map(
        (product) => new Product(product.id, product.name, product.price),
      );
    } catch (error) {
      throw new Error('Error to find products: ' + error);
    }
  }

  async update(entity: Product): Promise<void> {
    try {
      await ProductModel.update(
        {
          name: entity.name,
          price: entity.price,
        },
        {
          where: { id: entity.id },
        },
      );
    } catch (error) {
      throw new Error('Error to update product: ' + error);
    }
  }
}
