const fs = require('fs');
var CryptoJS = require('crypto-js');

function EncryptImage(path, cipher) {
  let filesize = fs.statSync(path).size;
  let buf = new Buffer.alloc(filesize);
  fs.open(path, 'r+', (err, fd) => {
    if (err) {
      console.log(`code :${err.code}\n message ${err.message}`);
    } else {
      let bytes = fs.readSync(fd, buf, 0, filesize);
      let data = buf;
      // Encrypting code
      let ciphertext = CryptoJS.AES.encrypt(
        JSON.stringify(data),
        cipher,
      ).toString();
      const newfile = '/home/kaneki99/Documents/JS/encrypted.txt';
      fd1 = fs.openSync(newfile, 'w+');
      fs.writeSync(fd1, ciphertext);
      fs.closeSync(fd1);
      fs.close(fd, err => {
        //console.log('file closed!');
      });
    }
  });
}

EncryptImage(
  '/home/kaneki99/Downloads/arthur-morgan-red-dead-redemption-2-z6635.jpeg',
  'secret key 123',
);

//requirements crypto-js
//nmp install crypto-js
