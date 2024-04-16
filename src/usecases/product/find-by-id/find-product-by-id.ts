import { IProductRepository } from '../../../domain/product/repository/product-repository.interface';
import { IFindProductByIdOutputDto } from './find-product-by-id.dto';

export class FindProductByIdUsecase {
  private productRepository: IProductRepository;

  constructor(productRepository: IProductRepository) {
    this.productRepository = productRepository;
  }

  async execute(id: string): Promise<IFindProductByIdOutputDto | null> {
    try {
      const data = await this.productRepository.find(id);
      return {
        id: data.id,
        name: data.name,
        price: data.price,
      };
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
