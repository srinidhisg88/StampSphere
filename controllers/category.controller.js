import category from "../models/categories.schema.js";


export const createAcategory=async(req,res,next)=>{
    const {categoryName}=req.body
    if(!categoryName){
        return res.status(400).json({ message: 'Category name is required' })
    }
    try{
        // newCategory=new category({
        //     categoryName:categoryName
        // })
        // const savedCategory = await newCategory.save();
        category.create({
            categoryName
        }).then((saved)=>{
            return res.status(201).json({
                message: 'Category created successfully',
                category: saved,
            });
        })
         
    } catch (error) {
        return res.status(500).json({
            message: 'Error creating category',
            error: error.message,
        });
    }
}

export const getAllCategories=async(req,res,next)=>{
    try{
        const categories = await category.find(); // Find all categories
        return res.status(200).json(categories);
        
    }
    catch(err){
        return res.status(500).json({
            message: 'Error fetching categories',
            error: err.message
        });
    }
}
