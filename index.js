// Internal Imports
const util = require('util');

// Set Environment variable
require('dotenv').config();

// Custom Imports
const config = require('./src/configuration');

// Uncaught exception listener
process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT EXCEPTION!, Shutting down...');
  console.error(util.format(`Error: %O`, err));
  process.exit(1);
});

// Bootstrap express application
const app = require('./src/app');

// Start server
const server = app.listen(process.env.PORT, () => {
  console.info(
    `Express server listening on PORT: ${process.env.PORT} with PROCESSID: ${process.pid}`
  );
  console.info(`Environment: ${config.get('env')}`);
});

// unhandle rejection listener
process.on('unhandledRejection', (err) => {
  console.error('UNHANDLED REJECTION!, Shutting down...');
  console.error(util.format(`Error: %O`, err));
  server.close(() => {
    process.exit(1);
  });
});

/**
 * Catch kill signals and stop gracefully
 */
const shutdown = async () => {
  console.debug('Shutting down gracefully');
  server.close(() => {
    console.debug('Process terminated!');
  });
};

process.on('SIGTERM', shutdown).on('SIGINT', shutdown).on('SIGUP', shutdown);
