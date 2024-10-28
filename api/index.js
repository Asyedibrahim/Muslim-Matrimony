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

app.use(express.static(path.join(__dirname, '/frontend/dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
});

const PORT = 3004;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} !!!`);
1});

