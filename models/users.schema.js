import mongoose from "mongoose";
import bcrypt from "bcryptjs"
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,  // Specify the type explicitly
        enum: ['ADMIN', 'USER', null],  // Specify allowed values
        default: 'USER',
        required: true,
    },
    net_worth:{
        type:Number,
    },
    created_at: {
        type: Date,  // Use Date type without invoking it
        default: Date.now,  // Pass the function reference directly
    }
}, {
    timestamps: true  // Corrected option name to "timestamps"
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();  // Skip hashing if password is not modified
    }

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

userSchema.methods.comparePassword = async function (enteredPassword) {
    return bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;
