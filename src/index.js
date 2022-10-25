import express from 'express';
import 'dotenv/config';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import personRouter from './routes/person.route.js';
import formalityRouter from './routes/formality.route.js';
import { db } from './config/db.config.js';
// import { formalityRouter } from './routes/person.route.js';

const app = express();
const port = db.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));

app.use(personRouter);
app.use(formalityRouter);
// app.use('/api/formalities', formalityRouter);

app.use('*', (_req, res) => res.status(404).send('<h1>ENDPOINT DOES NOT EXIST </h1>'));

mongoose
  .connect(db.MONGODB_URL, { useNewUrlParser: true })
  .then(() => {
    console.info('connected to mongodb');
    return app.listen(port);
  })
  .then(() => console.info('server running at', port))
  .catch((err) => console.error(err.message));
