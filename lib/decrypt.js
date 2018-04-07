const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const { ALGORITHM, ENCRYPED_EXT, UNENCRYPED_EXT } = require('./constants');
const { getCipherKey } = require('./util');

function decrypt({ file, password }) {
  const readPath = path.join(file + ENCRYPED_EXT);

  // First, get the initialization vector from the file.
  const readIv = fs.createReadStream(readPath, { end: 15 });

  let IV;
  readIv.on('data', (chunk) => {
    IV = chunk;
  });

  // Once we've got the initialization vector, we can decrypt the file.
  readIv.on('close', () => {
    const CIPHER_KEY = getCipherKey(password);

    const readData = fs.createReadStream(readPath, { start: 16 });
    const decipher = crypto.createDecipheriv(ALGORITHM, CIPHER_KEY, IV);
    const unzip = zlib.createUnzip();
    const writeStream = fs.createWriteStream(path.join(file + UNENCRYPED_EXT));

    writeStream.on('close', () => {
      console.log('Decryption success!');
    });

    readData
      .pipe(decipher)
      .pipe(unzip)
      .pipe(writeStream);
  });
}

module.exports = decrypt;
