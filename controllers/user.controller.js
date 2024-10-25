import User from "../models/users.schema.js";


export const getUsersByNetWorth = async (req, res) => {
  try {
    // Query for all users, sorted by net worth in descending order
    const users = await User.find().sort({ net_worth: -1 }); // -1 for descending order

    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users by net worth:", error);
    res.status(500).json({ message: "Server error" });
  }
};
