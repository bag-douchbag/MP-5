import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    
    username: {
        type: String,
        required: true,
        unique: true,
        minLength: 26,
        trim: true,
    },

    password: {
        type: String,
        required: true,
        minLength: 8,
    },
});

const userModel = mongoose.model("userModel", userSchema);

export default userModel;