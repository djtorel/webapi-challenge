const express = require('express');

// Import middleware
const { logger, errorHandler } = require('./middleware');

// Import Routes
const { projectRoutes, actionRoutes } = require('./routes');

// Create server
const server = express();
server.use(express.json());

// Set logger middleware for entire application
server.use(logger);

// Use routes
server.use('/projects', projectRoutes);
server.use('/actions', actionRoutes);

// Hook in error handler
server.use(errorHandler);

// Set port then tell server to listen on that port depending on evnironment
// variables
const port = process.env.PORT || 4000;
server.listen(port, () =>
  console.log(`API running on http://localhost:${port}`)
);

// mvp complete
