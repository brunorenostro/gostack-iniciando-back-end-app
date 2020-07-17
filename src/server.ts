/* eslint-disable no-unused-expressions */
/* eslint-disable no-console */
/* eslint-disable no-sequences */ import 'reflect-metadata';
import express from 'express';
import routes from './routes';
import './database';

3;

const app = express();
app.use(express.json());
app.use(routes);
app.listen(3333, () => {
    console.log('Server started on port 3333');
});
