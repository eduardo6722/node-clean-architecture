import { ProductFactory } from './product.factory';

describe('ProductFactory unut tests', () => {
  it('should create a product type a', () => {
    const product = ProductFactory.create('a', 'Product A', 10);
    expect(product.id).toBeDefined();
    expect(product.name).toBe('Product A');
    expect(product.price).toBe(10);
    expect(product.constructor.name).toBe('Product');
  });

  it('should create a product type b', () => {
    const product = ProductFactory.create('b', 'Product B', 20);
    expect(product.id).toBeDefined();
    expect(product.name).toBe('Product B');
    expect(product.price).toBe(40);
    expect(product.constructor.name).toBe('ProductB');
  });
});
