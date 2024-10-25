import User from "../models/users.schema.js"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()
export const registerUser=async (req,res,next)=>{
    const {username,password,email,role}=req.body
    if (password.length < 6) {
        return res.status(400).json({ message: "Password less than 6 characters" })
      }
      const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }
        try{
            await User.create({
              username,
              password,
              email,
              role,
              created_at:Date.now()
            }).then((user) =>{
                

              return res.status(200).json({
                message: `${user.username}has successfully registered`,
                user,
              })
            }
            )
          } catch (err) {
            res.status(401).json({
              message: "User not successfully created",
              error: err.message,
            })
          }
      
      
}

export const login=async (req,res,next)=>{
    const { username, password,email} = req.body
  // Check if username and password is provided
  if (!username || !password || !email) {
    return res.status(400).json({
      message: "Username or Password not present",
    })
  }
  try {
    const user = await User.findOne({ username, email })
    if (!user) {
      res.status(401).json({
        message: "Login not successful",
        error: "User not found",
      })
    } else {
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
       
        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN,
        });
        res.cookie("jwt", token, {
            httpOnly: true,
          });
      res.status(200).json({
        message: `${user.username} has logged in successfully`,
        user,
      })
    }
  } catch (error) {
    res.status(400).json({
      message: "An error occurred",
      error: error.message,
    })
  }
}


export const logoutUser = (req, res) => {
    res.clearCookie('jwt'); // Clear the cookie with the name 'token'
    return res.status(200).json({ message: 'User logged out successfully' });
};

