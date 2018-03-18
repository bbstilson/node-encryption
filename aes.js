const encrypt = require('./lib/encrypt');
const decrypt = require('./lib/decrypt');

const { _, file, f, password, p } = require('minimist')(process.argv.slice(2));
const shouldEncrypt = _[0] === 'encrypt';
const shouldDecrypt =  _[0] === 'decrypt';

if (!p && !password) {
  console.log('You must provide a password.');
  process.exit(1);
}

if (!f && !file) {
  console.log('You must provide a file.');
  process.exit(1);
}

const RESOLVED_FILE = f || file;
const RESOLVED_PASSWORD = p || password;

if (shouldEncrypt) {
  encrypt({
    file: RESOLVED_FILE,
    password: RESOLVED_PASSWORD
  });
}

if (shouldDecrypt) {
  decrypt({
    file: RESOLVED_FILE,
    password: RESOLVED_PASSWORD
  });
}
