// Internal Imports
const fs = require('fs');
const path = require('path');
const util = require('util');

// External Imports
const AWS = require('aws-sdk');

// Custom Imports
const config = require('../configuration');

const s3 = new AWS.S3({
  accessKeyId: config.get('AWS.accessKeyId'),
  secretAccessKey: config.get('AWS.secretAccessKey'),
});

exports.upload = (filePath) =>
  new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, file) => {
      if (err) {
        console.error(
          util.format(`Error occurred while reading file, ERROR: %O`, err)
        );
        throw err;
      } else {
        const extention = path.extname(filePath);
        const params = {
          Bucket: '', // pass your bucket name
          Key: `${Date.now().toString()}${extention}`,
          Body: Buffer.from(file, 'base64'),
          ContentType: 'application/pdf',
        };
        s3.upload(params, (error, data) => {
          if (error) {
            console.error(
              util.format(
                `Error occurred while uploading file to s3 bucket, ERROR: %O`,
                error
              )
            );
            reject();
          } else {
            console.debug(`File uploaded successfully at ${data.Location}`);
            resolve(data.Location);
          }
        });
      }
    });
  });
