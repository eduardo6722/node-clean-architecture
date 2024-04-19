import { IProductRepository } from '../../../domain/product/repository/product-repository.interface';
import { IFindAllProductsOutputDto } from './find-all-products.dto';

export class FindAllProductsUseCase {
  private productRepository: IProductRepository;

  constructor(productRepository: IProductRepository) {
    this.productRepository = productRepository;
  }

  async execute(): Promise<IFindAllProductsOutputDto | null> {
    try {
      const data = await this.productRepository.findAll();
      return {
        products: data.map((product) => ({
          id: product.id,
          name: product.name,
          price: product.price,
        })),
      };
    } catch (error) {
      return null;
    }
  }
}
