import mongoose from "mongoose";
import Counter from "./counterModel.js";

const studentSchema = new mongoose.Schema({
    studentid: {
        type: Number,
        unique: true,
        required: true,
    },

    studentname: {
        type: String,
        required: true,
        minlength: 2,
        trim: true,
    },

    contactno: {
        type: String,
        required: true,
        unique: true,
        match: /^\d{10}$/,
    },

    studentcourse: {
        type: String,
        default: "bca",
        enum : ["bca"],
    },

    semester: {
        type: Number,
        required: true,
        enum: [1, 2, 3, 4],
    },
});

studentSchema.pre("validate", async function () {

    if (!this.isNew || this.studentid != null) return;

    const counter = await Counter.findOneAndUpdate(
        { _id: "studentid" },
        {
            $inc: { sequence: 1 }
        },
        { 
            new: true, 
            upsert: true 
        }
    );

    this.studentid = counter.sequence;
});

const studentModel = mongoose.model("Student", studentSchema);

export default studentModel;