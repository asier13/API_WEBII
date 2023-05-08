const request = require('supertest');
const app = require('../app');
const connectDB = require('../config/mysql');

describe('Comercios API', () => {
  let connection;

  beforeAll(async () => {
    connection = await connectDB();
    await connection.query('CREATE TABLE IF NOT EXISTS comercios (id INT AUTO_INCREMENT PRIMARY KEY, nombre VARCHAR(255), direccion VARCHAR(255), telefono VARCHAR(255))');
  });

  afterAll(async () => {
    await connection.query('DROP TABLE IF EXISTS comercios');
    await connection.end();
  });

  it('should create a new comercio', async () => {
    const res = await request(app)
      .post('/api/comercios')
      .send({
        nombre: 'Comercio 1',
        direccion: 'Calle 123',
        telefono: '555-1234'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body.message).toEqual('Comercio creado correctamente');
    expect(res.body.id).toBeDefined();
  });

  it('should get a list of comercios', async () => {
    const res = await request(app)
      .get('/api/comercios');
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should update an existing comercio', async () => {
    const [comercio] = await connection.query('SELECT * FROM comercios LIMIT 1');
    const res = await request(app)
      .put(`/api/comercios/${comercio.id}`)
      .send({
        nombre: 'Comercio actualizado',
        direccion: 'Calle 456',
        telefono: '555-5678'
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual('Comercio modificado correctamente');
  });

  it('should delete an existing comercio', async () => {
    const [comercio] = await connection.query('SELECT * FROM comercios LIMIT 1');
    const res = await request(app)
      .delete(`/api/comercios/${comercio.id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual('Comercio eliminado correctamente');
  });
});
