import mongoose, { Schema } from "mongoose";

const bidSchema = new Schema({
    bidder: { type: Schema.Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now },
  });




const stampSchema = new Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    starting_bid: { type: Number, required: true, min: 0 },
    is_sold: { type: Boolean, default: false },
    auction_end_date: { type: Date, required: false },
    seller_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    bids: [bidSchema],
    image:{type:String,default:""},
    current_highest_bid: { type: Number, default: 0 },
    top_bidder: { type: Schema.Types.ObjectId, ref: "User" },
  }, { timestamps: true });

// Create the Stamp model
const Stamp = mongoose.model('Stamp', stampSchema);

export default Stamp;
