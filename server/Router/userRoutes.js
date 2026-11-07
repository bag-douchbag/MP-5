import express from "express"
import { signin, signup } from "../controller/userController.js"

const userRoutes = express.Router()

userRoutes.post("/sign-up", signup)
userRoutes.post("/sign-in", signin)


export default userRoutes;