import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

mongoose.connect(process.env.MONGO).then(() => {
    console.log("Connected to MongoDb!!!");
}).catch ((err) => {
    console.log(err);
});

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} !!!`);
1});

