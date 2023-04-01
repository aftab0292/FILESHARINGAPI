// Internal Imports
const path = require('path');

// External Imports
const convict = require('convict');

// Define a schema
const config = convict({
  env: {
    doc: 'The application environment.',
    format: ['production', 'staging', 'development'],
    default: 'development',
    env: 'NODE_ENV',
  },
  server: {
    http: {
      port: {
        doc: 'HTTP port to bind',
        format: 'port',
        default: 3001,
        env: 'PORT',
      },
    },
    enableCompression: {
      doc: 'Enable HTTP compression',
      format: Boolean,
      default: false,
    },
    enableStatic: {
      doc: 'Enable Express static server',
      format: Boolean,
      default: true,
    },
    static: {
      directory: {
        doc: 'Express static server content directory',
        format: String,
        default: '../public',
      },
      options: {
        doc: 'Express static server options',
        format: Object,
        default: { maxAge: 0 },
      },
    },
    bodyParser: {
      limit: {
        doc: 'maximum request body size',
        format: String,
        default: '100mb',
      },
    },
  },
  AWS: {
    accessKeyId: {
      doc: 'AWS access key id',
      format: String,
      default: '',
      env: 'ACCESS_KEY_ID',
    },
    secretAccessKey: {
      doc: 'Service Access Key',
      format: String,
      default: '',
      env: 'SECRET_ACCESS_KEY',
    },
    region: {
      doc: 'AWS region',
      format: String,
      default: '',
      env: 'REGION',
    },
    bucketName: {
      doc: 'Aws bucket name',
      format: String,
      default: '',
      env: 'BUCKET',
    },
  },
  multer: {
    uploadDirectoryPath: {
      doc: 'Multer upload directory path',
      format: String,
      default: 'public/uploads/',
      env: 'FOLDER',
    },
  },
  scheduler: {
    cronJobRule: {
      doc: 'Cron job rule to for scheduler',
      format: String,
      default: '42 * * * *',
    },
  },
});

// Load environment dependent configuration
const env = config.get('env');

config.loadFile(path.join(__dirname, 'environment', `${env}.json`));

// // Perform validation
config.validate({ allowed: 'strict' });

module.exports = config;
