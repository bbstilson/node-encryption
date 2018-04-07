const crypto = require('crypto');

function getCipherKey(password) {
  return crypto.createHash('sha256').update(password).digest();
}

exports.getCipherKey = getCipherKey;
