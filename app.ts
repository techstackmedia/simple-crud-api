import express, { Request, Response } from 'express';
import connectionDB from './config/database';
import router from './routes/product';

const port = process.env.PORT || 4000;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/', router);
app.use('/:id', router);

connectionDB().then(() =>
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  })
);
