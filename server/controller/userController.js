import bcrypt from "bcrypt";
import User from "../models/userModel.js";
import { generateToken } from "../JWT/token.js";

export const signup = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(422).json({
                status: "failure",
                message: "All fields are required!"
            });
        }

        const existingUser = await User.findOne({ username: username.trim() });

        if (existingUser) {
            return res.status(409).json({
                status: "failure",
                message: "Username already exists!"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            username: username.trim(),
            password: hashedPassword
        });

        const token = generateToken({
            id: user._id
        });

        return res.status(201).json({
            status: "success",
            message: "User registered successfully!",
            token,
            user: {
                _id: user._id,
                username: user.username,
                studentId: user.studentId
            }
        });

    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({
                status: "failure",
                message: "Username already exists!"
            });
        }

        return res.status(500).json({
            status: "failure",
            message: error.message
        });
    }
};

export const signin = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Fixed: changed userModel to User to match the import at the top
        const user = await User.findOne({ username });
        
        if (!user) {
            return res.status(400).json({
                status: "failure",
                message: "Invalid credentials!!"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                status: "failure",
                message: "Invalid credentials!!"
            });
        }

        const token = generateToken({
            id: user._id,
            username: user.username
        });

        return res.status(200).json({
            status: "success",
            message: "Login successful!",
            token,
            user: {
                id: user._id,
                username: user.username
            }
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: "failure",
            message: "Internal server error"
        });
    }
};  