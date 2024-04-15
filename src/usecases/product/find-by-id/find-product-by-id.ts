import { IProduct } from '../../../domain/product/entity/product.interface';
import { IProductRepository } from '../../../domain/product/repository/product-repository.interface';

export class FindProductByIdUsecase {
  private productRepository: IProductRepository;

  constructor(productRepository: IProductRepository) {
    this.productRepository = productRepository;
  }

  async execute(id: string): Promise<IProduct> {
    try {
      const data = await this.productRepository.find(id);
      console.log('data: ', data);
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
