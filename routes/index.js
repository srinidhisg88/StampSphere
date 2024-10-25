import express from 'express';
import userRouter from './user.route.js';
import categoryRouter from './categories.route.js';
import stampRouter from './stamps.route.js';
import { authenticate } from '../middlewares/auth.middleware.js';
const router = express.Router();

// Use user routes with '/auth' prefix
router.use('/auth', userRouter);
router.use('/categories',authenticate,categoryRouter);
router.use('/stamp',authenticate,stampRouter)
export default router;
