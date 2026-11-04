import studentModel from "../models/studentModel.js";

export const registerStudent = async(req, res) => {

    try {

        const { studentname, contactno, semester } = req.body;

        if(!studentname || !contactno || semester == null){
            return res.status(422).json({
                status: "failure",
                message: "all fields are required!!"
            })
        }

        if(studentname.trim().length < 3 || studentname.trim().length > 25){
            return res.status(400).json({
                status: "failure",
                message: "student name must be between 3 and 25 characters!"
            })
        }

        if(!/^\d{10}$/.test(contactno)){
            return res.status(400).json({
                status: "failure",
                message: "invalid contact number!!"
            })
        }

        if(semester < 1 || semester > 4 || !Number.isInteger(Number(semester))){
            return res.status(400).json({
                status: "failure",
                message: "invalid semester"
            })
        }

        const student = await studentModel.create({
            studentname,
            contactno,
            semester,
            studentcourse: "bca"
        })

        return res.status(201).json({
            status: "success",
            message: "student created",
            student
        })

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            status: "failure",
            message: "something went wrong, please try again!!"
        })

    }
}

export const getStudentInfo = async (req, res) => {

    try {

        const { studentid } = req.params

        if (!studentid || !/^\d{10}$/.test(studentid)) {
            return res.status(422).json({
                status: "failure",
                message: "Invalid student ID"
            })
        }

        const student = await studentModel.findOne({
            studentid: Number(studentid)
        }).select("-_id -__v")

        if (!student) {
            return res.status(404).json({
                status: "failure",
                message: "Student not found"
            })
        }

        return res.status(200).json({
            status: "success",
            message: "Student found successfully",
            student: {
                studentid: student.studentid,
                studentname: student.studentname,
                studentcourse: student.studentcourse,
                semester: student.semester
            }
        })

    } catch (error) {

        console.error("getStudentInfo error:", error)

        return res.status(500).json({
            status: "failure",
            message: "Internal server error"
        })
    }
}
