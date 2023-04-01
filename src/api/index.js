// External Imports
const express = require('express');

// Custom Imports
const controller = require('./controller');
const { upload } = require('../middlewares/upload');
const asyncMiddleware = require('../middlewares/asyncMiddleware');

const router = express.Router();

router
  .route('/files')
  .post(upload.single('file'), asyncMiddleware(controller.uploadFile))

router
  .route('/files/:publicKey')
  .get(asyncMiddleware(controller.getFile))

router
  .route('/files/:privateKey')
  .delete(asyncMiddleware(controller.deleteFile));

module.exports = router;
