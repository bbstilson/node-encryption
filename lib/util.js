const crypto = require('crypto');

function getCipherKey(key) {
  return crypto.createHash('sha256').update(key).digest();
}

exports.getCipherKey = getCipherKey;
