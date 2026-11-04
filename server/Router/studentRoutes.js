import express from "express"
import { registerStudent } from "../controller/studentController"

const studentRoutes = express.Router()

studentRoutes.post("/create-student", registerStudent)
studentRoutes.get("/get-student/:studentid", getStudentInfo)

export default studentRoutes;