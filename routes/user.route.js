import express from 'express';
import { authenticate } from '../middlewares/auth.middleware.js';
import { getUsersByNetWorth } from '../controllers/user.controller.js';

const router=express.Router()
router.get('/getUsers',authenticate,getUsersByNetWorth)
export default router