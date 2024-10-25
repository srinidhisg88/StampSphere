import express from "express"
import { getAllCategories,createAcategory } from "../controllers/category.controller.js"
import {authenticate} from "../middlewares/auth.middleware.js"
const router=express.Router()
router.get('/getAllCategories',getAllCategories)
router.post('/create',createAcategory)
export default router