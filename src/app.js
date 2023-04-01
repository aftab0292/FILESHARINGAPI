// Internal Imports
const fs = require('fs');
const http = require('http');

//  External Imports
const express = require('express');

// Custom Imports
const config = require('./configuration');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./globalErrorHandler');
const {
  ERROR_CODES,
  STATUS_CODES: { NOT_FOUND },
} = require('./utils/constants');

// Initialize express framework
const app = express();

const server = http.createServer(app);

// Initialize root directories
if (!fs.existsSync(config.get('multer.uploadDirectoryPath'))) {
  fs.mkdirSync(config.get('multer.uploadDirectoryPath'), { recursive: true })
}

// Initialize Middlewares
require('./middlewares')(app, express, __dirname);

// Initialize routes
require('./routes')(app);

// Initialize schedular
require('./scheduler');

// Set base testing routes
app.get('/', (req, res) => {
  res.json({
    name: 'filesharing-api',
    environment: config.get('env'),
    port: config.get('server.http.port'),
  });
});

// Handle route not found
app.all('*', (req, res, next) => {
  console.error(`Requested route is not available on server!`);
  throw new AppError(
    `Requested route is not available on server!`,
    NOT_FOUND,
    ERROR_CODES.NOT_FOUND,
    req.originalUrl
  );
});

// Express global error handler middleware
app.use(globalErrorHandler);

module.exports = server;
