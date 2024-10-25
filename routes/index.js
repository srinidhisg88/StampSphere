import express from 'express';
import userRouter from './user.route.js';

const router = express.Router();

// Use user routes with '/auth' prefix
router.use('/auth', userRouter);

export default router;
