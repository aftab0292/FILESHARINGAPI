const fs = require('fs');
const path = require('path');

const schedule = require('node-schedule');

const config = require('../configuration');
const { removeFilesRecursively } = require('../utils/common');

const job = schedule.scheduleJob(config.get('scheduler.cronJobRule'), function () {
    if (fs.existsSync(config.get('multer.uploadDirectoryPath'))) {
        console.debug(`Deleting data due to inactivity`);
        const file_path = path.join(__dirname, '../../data/meta.json');
        fs.writeFileSync(file_path, JSON.stringify([], undefined, 2));
        removeFilesRecursively(config.get('multer.uploadDirectoryPath'));
    }
});