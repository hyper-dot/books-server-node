import swaggerJSDoc from 'swagger-jsdoc';
import 'dotenv/config';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Ez Books',
      version: '1.0.0',
      description: 'API documentation for Ez Books',
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT}`,
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/**/*.docs.ts'], // This will include all .routes.ts files in the src folder and subfolders
};

export const swaggerConfig = swaggerJSDoc(options);
