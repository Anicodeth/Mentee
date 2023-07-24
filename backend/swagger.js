const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Mentee API Documentation',
      version: '1.0.0',
      description: 'API documentation for the Mentee backend',
    },

    
    
    servers: [
      {
        url: 'http://localhost:5000', // Update with your server URL
      },
    ],
    components: {
      schemas: {
        // User schema definition
        User: {
          type: 'object',
          properties: {
            name: { type: 'string', example: 'John Doe' },
            email: { type: 'string', example: 'john@example.com' },
            password: { type: 'string', example: 'password123' },
            role: { type: 'string', example: 'user' },
          },
        },
        // Class schema definition
        Class: {
          type: 'object',
          properties: {
            name: { type: 'string', example: 'Math Class' },
            type: { type: 'string', example: 'Math' },
            description: { type: 'string', example: 'A class about math' },
            schedule: { type: 'string', example: 'Mon and Wed 3:00 PM' },
            price: { type: 'number', example: 50 },
            instructor: { type: 'string', example: 'user_id_here' },
          },
        },
        // Enrollment schema definition
        Enrollment: {
          type: 'object',
          properties: {
            classId: { type: 'string', example: 'class_id_here' },
            userId: { type: 'string', example: 'user_id_here' },
            enrollmentDate: { type: 'string', example: '2023-07-15T12:00:00Z' },
          },
        },
      },
    },
  },
  apis: ['./routes/*.js', './routes/enrollmentRoutes.js'], //  Add the path to your route files here
};

const specs = swaggerJsDoc(options);

module.exports = { swaggerUi, specs };
