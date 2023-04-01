// Internal Imports
const fs = require('fs');

exports.removeFilesRecursively = (dirPath) => {
    const files = fs.readdirSync(dirPath);
    if (files.length > 0) {
        for (var i = 0; i < files.length; i++) {
            var filePath = dirPath + '/' + files[i];
            if (fs.statSync(filePath).isFile()) {
                fs.unlinkSync(filePath);
            }
        }
    }
}