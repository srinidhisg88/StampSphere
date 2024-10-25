import Stamp from "../models/stamps.schema.js";
import category from "../models/categories.schema.js";

export const createStamp = async (req, res) => {
  const { name, description, starting_bid, categoryName} = req.body;
  const image=req.file
  const result = await cloudinary.uploader.upload(image.path);
    const imageUrl =  result.secure_url;
  try {
    const categoryObj = await category.findOne({ categoryName });
    if (!categoryObj) return res.status(400).json({ message: "Invalid category" });

    const stamp = new Stamp({
      name,
      description,
      starting_bid,
      auction_end_date:new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      seller_id: req.user,
      category: categoryObj._id,
      image:imageUrl
    });
    await stamp.save();
    res.status(201).json(stamp);
  } catch (error) {
    res.status(500).json({ message: "Error creating stamp", error: error.message });
  }
};

export const getStamp=async (req,res)=>{
    const { stampId } = req.params;

  try {
    // Find the stamp by ID, populating related fields like 'bids' and references
    const stamp = await Stamp.findById(stampId)
      .populate('seller_id', 'name email') // Populate seller details
      .populate('category', 'name'); // Populate category name if needed

    if (!stamp) {
      return res.status(404).json({ message: 'Stamp not found' });
    }

    res.status(200).json(stamp);
  } catch (error) {
    console.error('Error retrieving stamp:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

export const getAllStamps = async (req, res) => {
  try {
    const stamps = await Stamp.find().populate("seller_id", "username email").populate("category", "category");
    res.status(200).json(stamps);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving stamps", error: error.message });
  }
};

export const getStampsByCategory = async (req, res) => {
  const { categoryId } = req.params;
  try {
    const stamps = await Stamp.find({ category: categoryId }).populate("seller_id", "username email");
    res.status(200).json(stamps);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving stamps", error: error.message });
  }
};

