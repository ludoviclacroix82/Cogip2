// src/utils/swaggerOptions.ts
export const options = {
    failOnErrors: true, 
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: 'Api Cogip NodeJs',
        version: '1.0.0',
      },
    },
    apis: ['./src/Routes/route.ts'],
  };
  