const request = require('supertest');
const app = require('../app');

describe('Comercio API', () => {
  it('should get a list of products', async () => {
    const response = await request(app).get('/api/products');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.any(Array));
  });

  it('should get a list of users', async () => {
    const response = await request(app).get('/api/users');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.any(Array));
  });

  it('should create a new order', async () => {
    const response = await request(app)
      .post('/api/orders')
      .send({
        user_id: 'user123',
        product_id: 'product123',
        quantity: 2,
        total_price: 20.0,
        status: 'pending'
      });
    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      user_id: 'user123',
      product_id: 'product123',
      quantity: 2,
      total_price: 20.0,
      status: 'pending'
    });
  });
});
