import express from 'express';

import { imageUpload } from '../multer';
import fileDb from '../fileDb';

const router = express.Router();

router.get('/', (req, res) => {
  res.send(fileDb.getItems());
});

router.post('/', imageUpload.single('image'), async (req, res) => {
  if (!req.body.message) {
    res.status(400).send({ error: 'Message must be present in the request.' });
  } else {
    const message = {
      id: crypto.randomUUID(),
      author: req.body.author ? req.body.author : null,
      message: req.body.message,
      image: req.file ? req.file.filename : null,
    };

    await fileDb.addItem(message);

    res.send(message);
  }
});

export default router;
