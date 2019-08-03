const express = require('express');

// Import middleware
const middleware = require('./middleware');

// Import Routes
const routes = require('./routes');

// Create server
const server = express();

// Set logger middleware for entire application
server.use(middleware.logger);

// Use routes
server.use('/projects', routes.projectRoutes);
server.use('/actions', routes.actionRoutes);

// Hook in error handler
server.use(middleware.errorHandler);

// Set port then tell server to listen on that port depending on evnironment
// variables
const port = process.env.PORT || 4000;
server.listen(port, () =>
  console.log(`API running on http://localhost:${port}`)
);
