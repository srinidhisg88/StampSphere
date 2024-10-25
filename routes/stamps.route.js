import express from "express"
import { authenticate } from "../middlewares/auth.middleware.js"
import { createStamp,getAllStamps,getStampsByCategory,getStamp} from "../controllers/stamp.controller.js"

import  upload  from '../middlewares/multer.middleware.js';
const router=express.Router()
router.post('/createStamp',authenticate,upload.single('image'),createStamp)
router.get('/:stampId',authenticate,getStamp)
router.get('/getStamps',authenticate,getAllStamps)
router.get('/:categoryId',getStampsByCategory)

export default router