import { IProduct } from '../../../domain/product/entity/product.interface';
import { IProductRepository } from '../../../domain/product/repository/product-repository.interface';

export class FindAllProductsUseCase {
  private productRepository: IProductRepository;

  constructor(productRepository: IProductRepository) {
    this.productRepository = productRepository;
  }

  async execute(): Promise<IProduct[] | null> {
    try {
      const data = await this.productRepository.findAll();
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
