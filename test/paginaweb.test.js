const request = require('supertest');
const app = require('../app');
const pool = require('../config/mysql');

describe('Páginas web API', () => {
  beforeAll(async () => {
    await pool.query('CREATE TABLE IF NOT EXISTS paginas_web (id INT AUTO_INCREMENT PRIMARY KEY, nombre VARCHAR(255), url VARCHAR(255), descripcion VARCHAR(255))');
  });

  afterAll(async () => {
    await pool.query('DROP TABLE IF EXISTS paginas_web');
    await pool.end();
  });

  it('should create a new página web', async () => {
    const res = await request(app)
      .post('/api/paginas-web')
      .send({
        nombre: 'Página web 1',
        url: 'https://www.paginaweb1.com',
        descripcion: 'Descripción de la página web 1'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body.message).toEqual('Página web creada correctamente');
    expect(res.body.id).toBeDefined();
  });

  it('should get a list of páginas web', async () => {
    const res = await request(app)
      .get('/api/paginas-web');
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should update an existing página web', async () => {
    const [paginaWeb] = await pool.query('SELECT * FROM paginas_web LIMIT 1');
    const res = await request(app)
      .put(`/api/paginas-web/${paginaWeb.id}`)
      .send({
        nombre: 'Página web actualizada',
        url: 'https://www.paginawebactualizada.com',
        descripcion: 'Descripción de la página web actualizada'
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual('Página web modificada correctamente');
  });

  it('should delete an existing página web', async () => {
    const [paginaWeb] = await pool.query('SELECT * FROM paginas_web LIMIT 1');
    const res = await request(app)
      .delete(`/api/paginas-web/${paginaWeb.id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual('Página web eliminada correctamente');
  });
});
