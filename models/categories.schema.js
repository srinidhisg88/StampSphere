import mongoose, { Schema } from "mongoose";
const categorySchema=mongoose.Schema({
    categoryName:{
        type:String,
        required:true,
    },
})

const category=mongoose.model("Category",categorySchema)
export default category