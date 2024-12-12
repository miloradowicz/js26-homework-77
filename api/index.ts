import express from 'express';
import cors from 'cors';

import config from './config';

import feedbackRouter from './routers/feedback';
import fileDb from './fileDb';

const app = express();

app.use(express.json());
app.use(express.static('public'));
app.use(cors());
app.use('/feedback', feedbackRouter);

(async () => {
  await fileDb.init();

  app.listen(config.port, () => {
    console.log(`Listening on http://localhost:${config.port}`);
  });
})().catch(console.error);
