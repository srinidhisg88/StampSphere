import mongoose, { Schema } from "mongoose";

const stampSchema = new mongoose.Schema({
    is_sold: {
        type: Boolean,
        default: false
    },
    is_released: {
        type: Boolean,
        default: false
    },
    
    name: {
        type: String,
        required: true,
        unique:true
    },
    description: {
        type: String,
        required: true,
    },
    starting_bid: {
        type: Number,
        required: false,
        min: 0 // Ensuring starting bid is non-negative
    },
    user_id: {
        type:Schema.Types.ObjectId,
        ref:"User",

    },
    created_at: {
        type: Date,
        default: Date.now
    },
    auction_end_date: {
        type: Date,
        required: false, // Assuming the auction end date is necessary
    },
    category:{
        type:Schema.Types.ObjectId,
        ref:"Category",
        required:true
    },
    image: {
        type: String,
        required: false,
        default:"" // Assuming you want to ensure an image URL is provided
    }
}, {
    timestamps: true // This will automatically add createdAt and updatedAt fields
});

// Create the Stamp model
const Stamp = mongoose.model('Stamp', stampSchema);

export default Stamp;
