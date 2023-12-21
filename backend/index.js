import express from 'express';
import { PORT, MongoDbUrl } from './config.js';
import mongoose from 'mongoose';
import { authRouter } from './routes/authRoute.js';
import { userRouter } from './routes/userRoute.js';
import cors from 'cors';
import dotenv from 'dotenv';

const app = express();

dotenv.config();
app.use(express.json());

app.use(cors());
// Option 2: Allow Custom Origins
// app.use(
//   cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type'],
//   })
// );

app.use('/', authRouter);
app.use('/user', userRouter);

mongoose
  .connect(MongoDbUrl)
  .then(() => {
    console.log('App connected to database');
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
