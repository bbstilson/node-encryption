const { Transform } = require('stream');

// Appends the initialization vector to the front of the stream, which is then
// used for decryption later.
class AppendInitVect extends Transform {
  constructor(IV, opts) {
    super(opts);
    this.IV = IV;
    this.appended = false;
  }

  _transform(chunk, encoding, cb) {
    if (!this.appended) {
      this.push(this.IV);
      this.appended = true;
    }
    this.push(chunk);
    cb();
  }
}

module.exports = AppendInitVect;
