import { IProduct } from '../../../domain/product/entity/product.interface';
import { IProductRepository } from '../../../domain/product/repository/product-repository.interface';
import { IUpdateProductOutDto } from './update-product.dto';

export class UpdateProductUseCase {
  private productRepository: IProductRepository;

  constructor(productRepository: IProductRepository) {
    this.productRepository = productRepository;
  }

  async execute(input: IProduct): Promise<IUpdateProductOutDto | null> {
    try {
      const product = await this.productRepository.find(input.id);
      if (!product) return null;
      product.changeName(input.name);
      product.changePrice(input.price);
      await this.productRepository.update(product);
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
