import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import itemRouter from './routes/item.js';
import connectDB from './config/db.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
connectDB();

app.use('/api/item', itemRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));