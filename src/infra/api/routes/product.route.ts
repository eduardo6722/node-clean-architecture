import { Router } from 'express';
import { CreateProductUseCase } from '../../../usecases/product/create/create-product';
import { ICreateProductInputDto } from '../../../usecases/product/create/create-product.dto';
import { FindAllProductsUseCase } from '../../../usecases/product/find-all/find-all-products';
import { ProductRepository } from '../../product/repository/sequelize/product.repository';

export const productRouter = Router();

productRouter.post('/products', async (req, res) => {
  const usecase = new CreateProductUseCase(new ProductRepository());
  const { name, price } = req.body;
  if (!name || !price) return res.status(400).json(null);
  try {
    const createProductDto: ICreateProductInputDto = {
      name,
      price,
    };
    const product = await usecase.execute(createProductDto);
    return res.status(201).json(product);
  } catch {
    return res.status(500).json(null);
  }
});

productRouter.get('/products', async (_, res) => {
  try {
    const usecase = new FindAllProductsUseCase(new ProductRepository());
    const products = await usecase.execute();
    return res.status(200).json(products);
  } catch {
    return res.status(500).json(null);
  }
});
