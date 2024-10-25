import Stamp from "../models/stamps.schema.js";
import category from "../models/categories.schema.js";
export const createStamp=async (req,res,next)=>{
    const {name,description,categoryName,image}=req.body
    const ncategory=await category.find({categoryName})
    try{
    await Stamp.create({
        name,
        description,
        created_at:Date.now(),
        image,
        category:ncategory._id,
        user_id:req.user._id

    }).then((newStamp)=>{
        return res.status(201).json({ message: 'Stamp created successfully', stamp: newStamp });
    })

    }catch(error){
        return res.status(500).json({ message: 'Error creating stamp', error: error.message });
    }
}

export const getAllStamps = async (req, res) => {
    try {
        const stamps = await Stamp.find().populate('user_id','username email').populate('category','categoryName'); // Populate user and category details
        return res.status(200).json(stamps);
    } catch (error) {
        return res.status(500).json({ message: 'Error retrieving stamps', error: error.message });
    }
};

export const getStampsByCategory=async (req,res)=>{
    const {cateogryId}=req.params
    if(!cateogryId){
        return res.status(400).json({message:'cateogry id is required'})
    }
    try{
        const stamps=await Stamp.find({category:categoryId})
        return res.status(200).json(stamps)
    }catch(error){
        return res.status(500).json({ message: 'Error retrieving stamps by category', error: error.message})
    }
}