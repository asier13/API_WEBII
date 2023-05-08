const request = require('supertest');
const app = require('../app');
const pool = require('../config/mysql');

describe('Usuarios API', () => {
  beforeAll(async () => {
    await pool.query('CREATE TABLE IF NOT EXISTS usuarios (id INT AUTO_INCREMENT PRIMARY KEY, nombre VARCHAR(255), email VARCHAR(255), ciudad VARCHAR(255))');
  });

  afterAll(async () => {
    await pool.query('DROP TABLE IF EXISTS usuarios');
    await pool.end();
  });

  it('should create a new usuario', async () => {
    const res = await request(app)
      .post('/api/usuarios')
      .send({
        nombre: 'Usuario 1',
        email: 'usuario1@ejemplo.com',
        ciudad: 'Ciudad 1'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body.message).toEqual('Usuario creado correctamente');
    expect(res.body.id).toBeDefined();
  });

  it('should get a list of usuarios', async () => {
    const res = await request(app)
      .get('/api/usuarios');
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should update an existing usuario', async () => {
    const [usuario] = await pool.query('SELECT * FROM usuarios LIMIT 1');
    const res = await request(app)
      .put(`/api/usuarios/${usuario.id}`)
      .send({
        nombre: 'Usuario actualizado',
        email: 'usuarioactualizado@ejemplo.com',
        ciudad: 'Ciudad actualizada'
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual('Usuario modificado correctamente');
  });

  it('should delete an existing usuario', async () => {
    const [usuario] = await pool.query('SELECT * FROM usuarios LIMIT 1');
    const res = await request(app)
      .delete(`/api/usuarios/${usuario.id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual('Usuario eliminado correctamente');
  });
});
