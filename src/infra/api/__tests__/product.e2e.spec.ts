import request from 'supertest';
import { app, sequelize } from '../express';

function createProduct(data: Record<string, any> = {}) {
  return request(app).post('/products').send(data);
}

describe('Product E2E tests', () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('should create a product', async () => {
    const response = await createProduct({
      name: 'Product 1',
      price: 10,
    });
    expect(response.status).toBe(201);
    expect(response.body.id).toBeDefined();
    expect(response.body.name).toBe('Product 1');
    expect(response.body.price).toBe(10);
  });

  it('should return 400 if the payload is invalid', async () => {
    const response = await request(app).post('/products').send(null);
    expect(response.status).toBe(400);
  });

  it('should list all products', async () => {
    await createProduct({
      name: 'Product 1',
      price: 10,
    });
    await createProduct({
      name: 'Product 2',
      price: 20,
    });
    const response = await request(app).get('/products');
    expect(response.status).toBe(200);
    expect(response.body.products.length).toBe(2);
  });
});
