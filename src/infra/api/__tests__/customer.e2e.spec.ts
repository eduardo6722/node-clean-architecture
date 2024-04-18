import request from 'supertest';
import { app, sequelize } from '../express';

function createCustomer(data: Record<string, any> = {}) {
  return request(app).post('/customers').send(data);
}

describe('Customer E2E tests', () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('should create a customer', async () => {
    const response = await createCustomer({
      name: 'John Doe',
      address: {
        street: 'Main St',
        number: '10',
        city: 'Springfield',
        zip: '12345',
      },
    });
    expect(response.status).toBe(201);
    expect(response.body.name).toBe('John Doe');
    expect(response.body.address.street).toBe('Main St');
    expect(response.body.address.number).toBe('10');
    expect(response.body.address.city).toBe('Springfield');
    expect(response.body.address.zip).toBe('12345');
  });

  it('should return 500 if an error occurs', async () => {
    const response = await request(app).post('/customers').send({});
    expect(response.status).toBe(500);
  });

  it('should list all customers', async () => {
    await createCustomer({
      name: 'John Doe',
      address: {
        street: 'Main St',
        number: '10',
        city: 'Springfield',
        zip: '12345',
      },
    });
    await createCustomer({
      name: 'John Doe 2',
      address: {
        street: 'Main St 2',
        number: '10 2',
        city: 'Springfield 2',
        zip: '123452',
      },
    });
    const response = await request(app).get('/customers');
    expect(response.status).toBe(200);
    expect(response.body.customers.length).toBe(2);
  });
});
