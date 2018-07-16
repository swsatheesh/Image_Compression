const fs = require('fs');
const sharp = require('sharp');

module.exports = function resize(inputStream, width, height) {
  let transform = sharp();
  
  // if (format) {
  //     transform = transform.toFormat(format);
  // }

  if (width || height) {
      transform = transform.resize(width, height).png().toBuffer((err, data, info) => { if(err) console.log(err); });
  }

  return new Promise((resolve, reject) => {
    inputStream.pipe(transform);
    inputStream.on('end', () => resolve(transform));
    transform.on('error', reject);
  });
};