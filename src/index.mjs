import express from 'express';
import fs from 'fs';
import multer from 'multer';

import config from './config.mjs';

const upload = multer({ storage: multer.memoryStorage() });

const app = express();

app.put('/upload', upload.single('file'), function (req, res) {
  fs.writeFile(`images/${req.file.originalname}`, req.file.buffer, function () {
    res.status(200).send();
  });
});

app.use(
  express.static('public', {
    maxAge: 7 * 24 * 60 * 60 * 1000,
  }),
);

app.use(
  express.static('images', {
    maxAge: 300 * 24 * 60 * 60 * 1000,
  }),
);

app.get('*', function (_, res) {
  res.status(404).send();
});

app.listen(config.port);

console.log('App start listen at port: ', config.port);
