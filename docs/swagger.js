const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "API de Comercios - Express con Swagger (OpenAPI 3.0)",
      version: "1.0.0",
      description:
        "Esta es una API CRUD para gestionar comercios, creada con Express y documentada con Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "Tu nombre",
        url: "https://tuweb.com",
        email: "tucorreo@tuweb.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        Comercio: {
          type: "object",
          required: ["nombre", "direccion", "telefono"],
          properties: {
            nombre: {
              type: "string",
              example: "Mi Comercio",
              maxLength: 50,
            },
            direccion: {
              type: "string",
              example: "Calle Falsa 123",
              maxLength: 100,
            },
            telefono: {
              type: "string",
              example: "912345678",
              pattern: "^[0-9]{9}$",
            },
            horario: {
              type: "string",
              example: "De lunes a viernes de 9:00 a 18:00",
              maxLength: 100,
            },
            descripcion: {
              type: "string",
              example: "Mi comercio es el mejor de la ciudad",
              maxLength: 500,
            },
            logo: {
              type: "string",
              example: "https://miweb.com/mi-logo.png",
              format: "url",
            },
          },
        },
        User: {
          type: "object",
          required: ["name", "email", "password"],
          properties: {
            name: {
              type: "string",
              example: "Menganito",
              maxLength: 50,
            },
            email: {
              type: "string",
              example: "miemail@google.com",
              format: "email",
            },
            password: {
              type: "string",
              example: "mysecretpassword",
              minLength: 8,
            },
          },
        },
        AuthResponse: {
          type: "object",
          properties: {
            token: {
              type: "string",
            },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./routes/*.js"],
};

module.exports = swaggerJsdoc(options);
