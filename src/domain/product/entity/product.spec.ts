import { Product } from './product';

describe('Product', () => {
  it('should throw an error when id is empty', () => {
    expect(() => new Product('', 'Product 1', 100)).toThrow('Id is required');
  });

  it('should throw an error when name is empty', () => {
    expect(() => new Product('1', '', 100)).toThrow('Name is required');
  });

  it('should throw an error when price is invalid', () => {
    expect(() => new Product('1', 'Product1', -1)).toThrow('Price is invalid');
  });

  it('should change name', () => {
    const product = new Product('1', 'Product', 100);
    product.changeName('Product2');
    expect(product.name).toBe('Product2');
  });

  it('should change price', () => {
    const product = new Product('1', 'Product', 100);
    product.changePrice(200);
    expect(product.price).toBe(200);
  });
});
