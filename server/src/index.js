import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import request from 'request';

var dir = './original_files';

if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}

import resizeImage from './read_write_stream';
// import imageProcessControl from './image_process_control';

var Storage = multer.diskStorage({
  destination: (req, file, callback) => {
      callback(null, './original_files');
  },
  filename: (req, file, callback) => {
      callback(null, `${Date.now()}_${file.originalname}`);
  }
});

var download = function(uri, filename, callback){
  request.head(uri, function(err, res, body){
    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};

var upload = multer({ storage: Storage });

const app = express();
app.use(bodyParser.json({limit: '50mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.post('/files', upload.single('file'), (req, res) => {
  const { body: { details }, file } = req;
  const { width, height, format } = JSON.parse(details);
  // imageProcessControl(`./original_files/${file.filename}`, [[width, height, file.filename]]);
  resizeImage(`./original_files/${file.filename}`, [[width, height, format, file.filename]])
    .then((thumbnailPaths) => {
      console.log(thumbnailPaths);
      return res.end(thumbnailPaths[0]);
    })
    .catch((err) => {
      console.log(err);
      return res.end("File upload Failed!.");
    });
});

const port = 3000;
app.listen(port);
console.log(`Listening on port ${port}`);