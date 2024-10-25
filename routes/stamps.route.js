import express from "express"
import { authenticate } from "../middlewares/auth.middleware.js"
import { createStamp,getAllStamps,getStampsByCategory } from "../controllers/stamp.controller.js"


const router=express.Router()
router.post('/createStamp',createStamp)
router.get('/getStamps',authenticate,getAllStamps)
router.get('/:categoryId',getStampsByCategory)
export default router