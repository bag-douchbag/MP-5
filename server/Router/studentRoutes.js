import express from "express"
import { registerStudent, getStudentInfo } from "../controller/studentController.js"

const studentRoutes = express.Router()

studentRoutes.post("/create-student", registerStudent)
studentRoutes.get("/get-student/:studentid", getStudentInfo)

export default studentRoutes;