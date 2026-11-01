import express from "express"
import joinRoom from "../controllers/roomController.js"

const livekiteRoutes = express.Router()

livekiteRoutes.post("/join", joinRoom)

export default livekiteRoutes;