import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import router from './router';
import { envs } from './config/envs.plugin';

const app = express();

app.use(
  cors({
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(cookieParser());
const server = http.createServer(app);

server.listen(8080, () => {
  console.log('Server is running on http://localhost:8080');
});

mongoose.Promise = Promise;

mongoose.connect(envs.MONGO_URL);
mongoose.connection.on('error', (error: Error) => console.log(error));

console.log('Connected to MongoDB');

app.use('/', router());
