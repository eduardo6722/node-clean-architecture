import { ProductFactory } from '../../../domain/product/factory/product.factory';
import { IProductRepository } from '../../../domain/product/repository/product-repository.interface';
import {
  ICreateProductInputDto,
  ICreateProductOutputDto,
} from './create-product.dto';

export class CreateProductUseCase {
  private productRepository: IProductRepository;

  constructor(productRepository: IProductRepository) {
    this.productRepository = productRepository;
  }

  async execute(
    input: ICreateProductInputDto,
  ): Promise<ICreateProductOutputDto | null> {
    try {
      const product = ProductFactory.create(input.name, input.price);
      await this.productRepository.create(product);
      return {
        id: product.id,
        name: product.name,
        price: product.price,
      };
    } catch (error) {
      return null;
    }
  }
}
