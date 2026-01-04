import express from 'express';
import cors from 'cors';
import {connectDB}  from './config/db.js';
import dotenv from "dotenv";
import { userRouter } from './routes/userRoute.js';
import { eventRouter } from './routes/eventRoute.js';
dotenv.config();
const app = express();
const port = process.env.PORT ||  4000;

app.use(express.json());
app.use(cors({
  origin: 'https://mini-event-app-vudw.vercel.app/',
  credentials: true,
}))

// DB Connection
connectDB();

app.use('/api/auth',userRouter  )
app.use('/api/event',eventRouter)

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});