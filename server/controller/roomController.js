import { AccessToken } from "livekit-server-sdk"
import studentModel from "../models/studentModel.js"

export const  joinRoom = async (req, res) => {

    try {


        console.log("Authenticated user:", req.userID)

        const { studentid } = req.body

        if (!studentid || !/^\d+$/.test(String(studentid))) {
            return res.status(400).json({
                message: "Enter a valid student ID"
            })
        }

        const student = await studentModel.findOne({
            studentid: Number(studentid)
        })

        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            })
        }

        const roomName = `semester-${student.semester}`

        console.log("LIVEKIT_API_KEY:", process.env.LIVEKIT_API_KEY ? "FOUND" : "MISSING")
        console.log("LIVEKIT_API_SECRET:", process.env.LIVEKIT_API_SECRET ? "FOUND" : "MISSING")
        console.log("LIVEKIT_URL:", process.env.LIVEKIT_URL ? "FOUND" : "MISSING")

        const token = new AccessToken(
            process.env.LIVEKIT_API_KEY,
            process.env.LIVEKIT_API_SECRET,
            {
                identity: `student-${student.studentid}`,
                ttl: "1h"
            }
        )

        token.addGrant({
            roomJoin: true,
            room: roomName,
            canPublish: true,
            canSubscribe: true
        })

        const accessToken = await token.toJwt()

        return res.status(200).json({
            message: "Successfully joined room",
            token: accessToken,
            serverUrl: process.env.LIVEKIT_URL,
            roomName,
            semester: student.semester
        })

    } catch (error) {

        console.error(error)

        return res.status(500).json({
            message: "Internal server error"
        })
    }
}

