const fs = require('fs');
const path = require('path');
const data = require('../../data/meta.json');

exports.addFile = (fileInfo) => {
    data.push(fileInfo);
    const file_path = path.join(__dirname, '../../data/meta.json');
    fs.writeFileSync(file_path, JSON.stringify(data, undefined, 2));
}

exports.getFileByPublicKey = (publicKey) => {
    return data.filter((file) => file.publicKey === publicKey);
}

exports.getFileByPrivateKey = (privateKey) => {
    return data.filter((file) => file.privateKey === privateKey);
}

exports.removeFile = (privateKey) => {
    const updated = data.filter((file) => file.privateKey !== privateKey);
    const file_path = path.join(__dirname, '../../data/meta.json');
    fs.writeFileSync(file_path, JSON.stringify(updated, undefined, 2));
}