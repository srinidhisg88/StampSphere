import express from 'express';
import connectDb from './config/db.js';
import cors from 'cors';
import router from './routes/index.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to the database
connectDb();

// Middleware
app.use(express.json());
app.use(cookieParser())
app.use(cors({ origin: [`http://localhost:5173`], credentials: true }));

// Routes
app.use('/api', router);
app.get('/', (req, res) => {
    res.send('index route');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
