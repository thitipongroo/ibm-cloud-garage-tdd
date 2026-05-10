const fs = require('fs');
const { promisify } = require('util');

const readFile = promisify(fs.readFile);

const lineCount = filename =>
  readFile(filename, 'UTF-8')
    .then(data => data.split('\n').length)
    .catch(() => Promise.reject(new Error('problem reading file: ' + filename)));

module.exports = { lineCount };
