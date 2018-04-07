const encrypt = require('./lib/encrypt');
const decrypt = require('./lib/decrypt');

const [ mode, file, password ] = process.argv.slice(2);
const shouldEncrypt = mode === 'encrypt';
const shouldDecrypt =  mode === 'decrypt';

if (shouldEncrypt) {
  encrypt({ file, password });
}

if (shouldDecrypt) {
  decrypt({ file, password });
}
