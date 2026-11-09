
import express from "express"
import { joinRoom } from "../controller/roomController.js"
import { verifyUser } from "../middleware/auth.js"

const livekiteRoutes = express.Router()

livekiteRoutes.post("/join", verifyUser, joinRoom)

export default livekiteRoutes
