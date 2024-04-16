type Product = {
  id: string;
  name: string;
  price: number;
};

export interface IFindAllProductsInputDto {}

export interface IFindAllProductsOutputDto {
  products: Product[];
}
