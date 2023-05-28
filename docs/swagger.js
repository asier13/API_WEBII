const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "Proyecto API PWS - Express API with Swagger (OpenAPI 3.0)",
      version: "0.1.0",
      description:
        "This is a CRUD API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "u-tad",
        url: "https://u-tad.com",
        email: "asier.salcedo@live.u-tad.com",
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
        },
      },
      schemas: {
        registerUser: {
          type: "object",
          required: [
            "name",
            "age",
            "email",
            "password",
            "city",
            "interests",
            "allowOffers",
          ],
          properties: {
            name: {
              type: "string",
              example: "Ejemplo",
            },
            age: {
              type: "integer",
              example: 20,
            },
            email: {
              type: "string",
              example: "ejemplo@google.com",
            },
            password: {
              type: "string",
            },
            city: {
              type: "string",
              example: "madrid",
            },
            interests: {
              type: "string",
              example: "cripto",
            },
            allowOffers: {
              type: "boolean",
              example: "true",
            },
          },
        },
        loginUser: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: {
              type: "string",
              example: "ejemplo@google.com",
            },
            password: {
              type: "string",
            },
          },
        },
        updateUser: {
          type: "object",
          required: [
            "name",
            "age",
            "email",
            "password",
            "city",
            "interests",
            "allowOffers",
          ],
          properties: {
            name: {
              type: "string",
              example: "Example",
            },
            age: {
              type: "integer",
              example: 20,
            },
            email: {
              type: "string",
              example: "example@google.com",
            },
            password: {
              type: "string",
            },
            city: {
              type: "string",
              example: "barcelona",
            },
            interests: {
              type: "string",
              example: "trading",
            },
            allowOffers: {
              type: "boolean",
              example: "true",
            },
          },
        },
        registerMerchant: {
          type: "object",
          required: ["name", "cif", "address", "email", "contact", "pageId"],
          properties: {
            name: {
              type: "string",
              example: "Example",
            },
            cif: {
              type: "integer",
              example: 20,
            },
            address: {
              type: "string",
              example: "example 10",
            },
            email: {
              type: "string",
              example: "example@gmail.com",
            },
            contact: {
              type: "integer",
              example: "916028445",
            },
            pageId: {
              type: "string",
            },
          },
        },
        loginMerchant: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: {
              type: "string",
              example: "examplemail@gmail.com",
            },
            password: {
              type: "string",
            },
          },
        },
        updateMerchant: {
          type: "object",
          required: ["name", "cif", "address", "email", "contact", "pageId"],
          properties: {
            name: {
              type: "string",
              example: "Example",
            },
            cif: {
              type: "integer",
              example: 20,
            },
            address: {
              type: "string",
              example: "Example 10",
            },
            email: {
              type: "string",
              example: "example@gmail.com",
            },
            contact: {
              type: "integer",
              example: "681245215",
            },
            pageId: {
              type: "string",
            },
          },
        },
        uploadContent: {
          type: "object",
          required: ["webpageId", "city", "activity", "title", "summary"],
          properties: {
            webpageId: {
              type: "string",
            },
            city: {
              type: "string",
              example: "madrid",
            },
            activity: {
              type: "string",
              example: "Cripto",
            },
            title: {
              type: "string",
              example: "Crear una cripto",
            },
            summary: {
              type: "string",
              example: "hacer una memecoin para forrarnos",
            },
          },
        },
        uploadPhoto: {
          type: "object",
          required: ["url", "filename"],
          properties: {
            url: {
              type: "string",
              example: "http://localhost:3000/test/dunes.png",
            },
          },
        },
        uploadText: {
          type: "object",
          required: ["texts"],
          properties: {
            texts: {
              type: "string",
              example: "ejemplotexto",
            },
          },
        },
        updateWebPage: {
          type: "object",
          required: ["webpageId", "city", "activity", "title", "summary"],
          properties: {
            webpageId: {
              type: "string",
            },
            city: {
              type: "string",
              example: "barcelona",
            },
            activity: {
              type: "string",
              example: "trading",
            },
            title: {
              type: "string",
              example: "Trading XAU",
            },
            summary: {
              type: "string",
              example: "operar oro en Metatrader",
            },
          },
        },
        updateScoring: {
          type: "object",
          required: ["scoring", "numScores", "reviews"],
          properties: {
            scoring: {
              type: "integer",
              example: "9",
            },
            numScores: {
              type: "integer",
              example: "2",
            },
            reviews: {
              type: "string",
              example: "he aprendido mucho con este curso",
            },
          },
        },
      },
    },
  },
  apis: ["./routes/*.js"],
};

module.exports = swaggerJsdoc(options);