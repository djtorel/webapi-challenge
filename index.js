const express = require('express');

// Import middleware
const logger = require('./middleware').logger;

// Import Routes
const routes = require('./routes');

// Create server
const server = express();

// Set logger middleware for entire application
server.use(logger);

// Use routes
server.use('/projects', routes.projectRoutes);
server.use('/actions', routes.actionRoutes);

// Set port then tell server to listen on that port depending on evnironment
// variables
const port = process.env.PORT || 4000;
server.listen(port, () =>
  console.log(`API running on http://localhost:${port}`)
);
