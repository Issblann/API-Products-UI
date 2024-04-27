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
    origin: true,
    credentials: true,
  })
);
const port = envs.PORT;
const uri = envs.MONGO_URI;

app.use(bodyParser.json());
app.use(cookieParser());
const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server is running on ${port}`);
});

mongoose.Promise = Promise;

mongoose.connect(uri);
mongoose.connection.on('error', (error: Error) => console.log(error));

console.log('Connected to MongoDB');

app.use('/', router());
