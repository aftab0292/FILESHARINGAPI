// Internal Imports
const path = require('path');

// External Imports
const cors = require('cors');
const bodyParser = require('body-parser');
const compression = require('compression');

// Custom Imports
const config = require('../configuration');

module.exports = (app, express, root) => {
  // Enable compression
  if (config.get('server.enableCompression')) app.use(compression());

  // Enable Static Directory Path
  if (config.get('server.enableStatic')) {
    app.use(
      express.static(path.join(root, config.get('server.static.directory')))
    );
  }

  // Enable CORS
  app.use(cors());

  // Enable request body parsing
  app.use(
    bodyParser.urlencoded({
      extended: true,
      limit: config.get('server.bodyParser.limit'),
    })
  );

  // Enable request body parsing in JSON format
  app.use(
    bodyParser.json({
      limit: config.get('server.bodyParser.limit'),
    })
  );

};
