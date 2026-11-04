import express from "express"
import {joinRoom} from "../controller/roomController.js"

const livekiteRoutes = express.Router()

livekiteRoutes.post("/join", joinRoom)

export default livekiteRoutes;