const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'no-name api', // Title (required)
    version: '0.0.1', // Version (required)
    description: 'dev api', // Description (optional)
  },
  basePath: '/api', // Base path (optional)
};

const config = {
  // Import swaggerDefinitions
  swaggerDefinition,
  // Path to the API docs
  // Note that this path is relative to the current directory from which the Node.js is ran, not the application itself.
  apis: ['./routes/*.route.js'],
};

module.exports = config;
