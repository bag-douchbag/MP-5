import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from "../models/userModel.js";
import studentModel from "../models/studentModel.js";

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

        return res.status(201).json({
            status: "success",
            message: "User registered successfully!",
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

        if (!username || !password) {
            return res.status(422).json({
                status: "failure",
                message: "Username and password are required!"
            });
        }

        const user = await User.findOne({ username: username.trim() });

        if (!user) {
            return res.status(401).json({
                status: "failure",
                message: "Invalid username or password!"
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({
                status: "failure",
                message: "Invalid username or password!"
            });
        }

        return res.status(200).json({
            status: "success",
            message: "Login successful!",
            user: {
                _id: user._id,
                username: user.username,
                studentId: user.studentId
            }
        });

    } catch (error) {

        return res.status(500).json({
            status: "failure",
            message: error.message
        });
    }
};



