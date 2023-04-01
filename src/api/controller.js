const fs = require('fs');

const helper = require('./helper');
const constants = require('../utils/constants');

const { v4: uuidv4 } = require('uuid');

exports.uploadFile = async (req, res) => {
    if (req.file) {
        req.file.publicKey = uuidv4();
        req.file.privateKey = uuidv4();

        helper.addFile(req.file);

        return res.status(constants.STATUS_CODES.OK).json({
            status: constants.ERROR_TYPES.SUCESS,
            code: constants.ERROR_CODES.OK,
            message: "File uploaded successfully!",
            data: {
                publicKey: req.file.publicKey,
                privateKey: req.file.privateKey
            }
        });
    }

    return res.status(constants.STATUS_CODES.OK).json({
        status: constants.ERROR_TYPES.ERROR,
        code: constants.ERROR_CODES.INTERNAL_SERVER_ERROR,
        message: "Something went wrong!"
    });
};

exports.getFile = async (req, res) => {
    if (!req.params.publicKey) {
        return res.status(constants.STATUS_CODES.BAD_REQUEST).json({
            status: constants.ERROR_TYPES.BAD_REQUEST,
            code: constants.ERROR_CODES.BAD_REQUEST,
            message: "Public key is required!"
        });
    }
    const fileInfo = helper.getFileByPublicKey(req.params.publicKey);
    if (fileInfo && fileInfo.length > 0) {
        const readableStream = fs.createReadStream(fileInfo[0].path);
        res.writeHead(200, { 'Content-Type': fileInfo[0].mimetype });
        readableStream.pipe(res);
    } else {
        return res.status(constants.STATUS_CODES.NOT_FOUND).json({
            status: constants.ERROR_TYPES.NOT_FOUND,
            code: constants.ERROR_CODES.NOT_FOUND,
            message: "File Not Found!"
        });
    }
};

exports.deleteFile = async (req, res) => {
    if (!req.params.privateKey) {
        return res.status(constants.STATUS_CODES.BAD_REQUEST).json({
            status: constants.ERROR_TYPES.BAD_REQUEST,
            code: constants.ERROR_CODES.BAD_REQUEST,
            message: "Private key is required!"
        });
    }
    const fileInfo = helper.getFileByPrivateKey(req.params.privateKey);
    if (fileInfo && fileInfo.length > 0) {
        helper.removeFile(req.params.privateKey)
        fs.unlinkSync(fileInfo[0].path);
        return res.status(constants.STATUS_CODES.OK).json({
            status: constants.ERROR_TYPES.SUCESS,
            code: constants.ERROR_CODES.OK,
            message: "File removed successfully!",
        });
    } else {
        return res.status(constants.STATUS_CODES.NOT_FOUND).json({
            status: constants.ERROR_TYPES.NOT_FOUND,
            code: constants.ERROR_CODES.NOT_FOUND,
            message: "File Not Found!"
        });
    }
}