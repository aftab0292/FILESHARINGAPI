// // Internal Imports
const fs = require('fs');
const util = require('util');
const path = require('path');

// External Imports
// const AWS = require('aws-sdk');
const multer = require('multer');
// const multerS3 = require('multer-s3');

// Custom Imports
const config = require('../configuration');

// const s3 = new AWS.S3({
//   accessKeyId: config.get('AWS.accessKeyId'),
//   secretAccessKey: config.get('AWS.secretAccessKey'),
// });

exports.upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, config.get('multer.uploadDirectoryPath'));
    },
    filename: (req, file, cb) => {
      cb(
        null,
        `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
      );
    },
  }),
});

// exports.uploadMedia = multer({
//   storage: multerS3({
//     s3: s3,
//     bucket: config.get('AWS.bucketName'),
//     acl: 'public-read',
//     key: (req, file, cb) => {
//       cb(
//         null,
//         `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
//       );
//     },
//   }),
// });
