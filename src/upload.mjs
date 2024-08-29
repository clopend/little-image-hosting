import fs from 'fs';
import express from 'express';
import multer from 'multer';
import config from './config.mjs';

const router = express.Router();

// make sure upload directory exist
if (!fs.existsSync(config.uploadDir)) {
  fs.mkdirSync(config.uploadDir);
}

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
  fileFilter: function (req, file, cb) {
    if (['image/png', 'image/jpg', 'image/jpeg'].includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
}).single('file');

const uploadMiddleware = function (req, res, next) {
  upload(req, res, function (err) {
    if (err) {
      res.status(400).send();
    } else {
      if (req.file) {
        fs.writeFile(
          `${config.uploadDir}/${req.file.originalname}`,
          req.file.buffer,
          function (err) {
            if (err) {
              res.status(400).send();
              return;
            }
            res.status(200).send({
              url: req.file.originalname,
            });
          },
        );
      } else {
        res.status(400).send();
      }
    }
  });
};

router.put('/', uploadMiddleware);

export default router;
