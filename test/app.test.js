const request = require('supertest');
const app = require('../app');
const { merchantsModel, webpagesModel, usersModel } = require('../models');

describe('Test de la API', () => {
  let merchantId;
  let webpageId;
  let userId;

  beforeAll(async () => {
    // Crear un comercio de prueba
    const merchant = await merchantsModel.create({
      nombre: 'Comercio de prueba',
      email: 'correo@valido.com',
      password: 'contraseña-segura',
      direccion: 'Calle falsa 123',
      ciudad: 'Ciudad de prueba'
    });
    merchantId = merchant.id;

    // Crear una página web de prueba
    const webpage = await webpagesModel.create({
      ciudad: 'Ciudad de prueba',
      actividad: 'Actividad de prueba',
      titulo: 'Título de prueba',
      resumen: 'Resumen de prueba',
      idMerchant: merchantId
    });
    webpageId = webpage.id;

    // Crear un usuario de prueba
    const user = await usersModel.create({
      nombre: 'Usuario de prueba',
      email: 'usuario@valido.com',
      password: 'contraseña-segura',
      ciudad: 'Ciudad de prueba'
    });
    userId = user.id;
  });

  afterAll(async () => {
    // Eliminar los datos de prueba
    await webpagesModel.destroy({ where: { id: webpageId } });
    await merchantsModel.destroy({ where: { id: merchantId } });
    await usersModel.destroy({ where: { id: userId } });
  });

  describe('Pruebas del admin', () => {
    it('Debería responder con un código 200 en la ruta GET /api/merchants', async () => {
      const response = await request(app).get('/api/merchants');
      expect(response.statusCode).toBe(200);
    });

    it('Debería responder con un código 200 en la ruta POST /api/merchants con datos de entrada válidos', async () => {
      const response = await request(app)
        .post('/api/merchants')
        .send({
          nombre: 'Comercio de prueba 2',
          email: 'correo2@valido.com',
          password: 'contraseña-segura',
          direccion: 'Calle falsa 456',
          ciudad: 'Ciudad de prueba'
        });
      expect(response.statusCode).toBe(200);
    });

    it('Debería responder con un código 200 en la ruta PUT /api/merchants/:id con datos de entrada válidos', async () => {
      const response = await request(app)
        .put(`/api/merchants/${merchantId}`)
        .send({
          nombre: 'Comercio de prueba modificado',
          email: 'correo-modificado@valido.com',
          password: 'contraseña-segura-modificada',
          direccion: 'Calle falsa 789',
          ciudad: 'Ciudad de prueba modificada'
        });
      expect(response.statusCode).toBe(200);
    });

    it('Debería responder con un código 200 en la ruta DELETE /api/merchants/:id', async () => {
      const response = await request(app).delete(`/api/merchants/${merchantId}`);
      expect(response.statusCode).toBe(200);
    });
  });

  describe('Pruebas del comercio', () => {
    it('Debería responder con un código 200 en la ruta GET /api/webpages', async () => {
      const response = await request(app).get('/api/webpages');
      expect(response.statusCode).toBe(200);
    });

    it('Debería responder con un código 200 en la ruta POST /api/webpages con datos de entrada válidos', async () => {
      const response = await request(app)
        .post('/api/webpages')
        .send({
          ciudad: 'Ciudad de prueba',
          actividad: 'Actividad de prueba 2',
          titulo: 'Título de prueba 2',
          resumen: 'Resumen de prueba 2',
          idMerchant: merchantId
        });
      expect(response.statusCode).toBe(200);
    });

    it('Debería responder con un código 200 en la ruta PUT /api/webpages/:id con datos de entrada válidos', async () => {
      const response = await request(app)
        .put(`/api/webpages/${webpageId}`)
        .send({
          ciudad: 'Ciudad de prueba modificada',
          actividad: 'Actividad de prueba modificada',
          titulo: 'Título de prueba modificado',
          resumen: 'Resumen de prueba modificado'
        });
      expect(response.statusCode).toBe(200);
    });

    it('Debería responder con un código 200 en la ruta DELETE /api/webpages/:id', async () => {
      const response = await request(app).delete(`/api/webpages/${webpageId}`);
      expect(response.statusCode).toBe(200);
    });
  });

  describe('Pruebas del usuario', () => {
    it('Debería responder con un código 200 en la ruta GET /api/webpages/public', async () => {
      const response = await request(app).get('/api/webpages/public');
      expect(response.statusCode).toBe(200);
    });

    it('Debería responder con un código 200 en la ruta GET /api/webpages/ciudad/:ciudad', async () => {
      const response = await request(app).get('/api/webpages/ciudad/Ciudad%20de%20prueba');
      expect(response.statusCode).toBe(200);
    });

    it('Debería responder con un código 200 en la ruta GET /api/webpages/ciudad/:ciudad/actividad/:actividad', async () => {
      const response = await request(app).get('/api/webpages/ciudad/Ciudad%20de%20prueba/actividad/Actividad%20de%20prueba%202');
      expect(response.statusCode).toBe(200);
    });

    it('Debería responder con un código 200 en la ruta GET /api/webpages/ciudad/:ciudad/score', async () => {
      const response = await request(app).get('/api/webpages/ciudad/Ciudad%20de%20prueba/score');
      expect(response.statusCode).toBe(200);
    });

    it('Debería responder con un código 200 en la ruta POST /api/users', async () => {
      const response = await request(app)
        .post('/api/users')
        .send({
          nombre: 'Usuario de prueba 2',
          email: 'usuario2@valido.com',
          password: 'contraseña-segura',
          ciudad: 'Ciudad de prueba'
        });
      expect(response.statusCode).toBe(200);
    });

    it('Debería responder con un código 200 en la ruta PUT /api/users/:id con datos de entrada válidos', async () => {
      const response = await request(app)
        .put(`/api/users/${userId}`)
        .send({
          nombre: 'Usuario de prueba modificado',
          email: 'usuario-modificado@valido.com',
          password: 'contraseña-segura-modificada',
          ciudad: 'Ciudad de prueba modificada'
        });
      expect(response.statusCode).toBe(200);
    });

    it('Debería responder con un código 200 en la ruta DELETE /api/users/:id', async () => {
      const response = await request(app).delete(`/api/users/${userId}`);
      expect(response.statusCode).toBe(200);
    });

    it('Debería responder con un código 200 en la ruta POST /api/webpages/:id/vote con datos de entrada válidos', async () => {
      const response = await request(app)
        .post(`/api/webpages/${webpageId}/vote`)
        .send({
          userId,
          score: 5,
          reseña: 'Reseña de prueba'
        });
      expect(response.statusCode).toBe(200);
    });
  });
});
