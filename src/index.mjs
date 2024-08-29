import express from 'express';
import config from './config.mjs';
import upload from './upload.mjs';

const app = express();

app.use('/upload', upload);

app.use(
  express.static('public', {
    maxAge: 7 * 24 * 60 * 60 * 1000,
  }),
);

app.use(
  express.static(config.uploadDir, {
    maxAge: 300 * 24 * 60 * 60 * 1000,
  }),
);

app.get('*', function (_, res) {
  res.status(404).send();
});

app.listen(config.port);

console.log('App listening on port:', config.port);
