const fs = require('fs');
var CryptoJS = require('crypto-js');

function decryptImage(path, cipher, file_name) {
  const dirfile = path;
  let filesize = fs.statSync(path).size;
  console.log(filesize);
  let buf = new Buffer.alloc(filesize);
  fd = fs.openSync(path, 'r');
  fs.readSync(fd, buf, 0, filesize);
  let ciphertext = buf.toString();
  var bt = CryptoJS.AES.decrypt(ciphertext, cipher);
  var decryptedData = JSON.parse(bt.toString(CryptoJS.enc.Utf8));
  fs.closeSync(fd);
  decryptedData = new Buffer(decryptedData['data']);
  //new file will br created here
  const newfile = file_name;
  fd1 = fs.openSync(newfile, 'w+');
  fs.writeSync(fd1, decryptedData, 0, decryptedData.byteLength);
  fs.closeSync(fd1);
}

encrypted_file_path = '/home/kaneki99/Documents/JS/encrypted.txt';
cipher_key = 'secret key 123';
org_file_name = 'arthur-morgan-red-dead-redemption-2-z6635.jpeg';

decryptImage(encrypted_file_path, cipher_key, org_file_name);
