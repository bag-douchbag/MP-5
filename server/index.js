import "dotenv/config"

import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import userRoutes from "./Router/userRoutes.js"
import studentRoutes from "./Router/studentRoutes.js"
import livekiteRoutes from "./Router/roomRoutes.js"
import { connectDB } from "./database/database.js"

const app = express()


dotenv.config({ path: "./.env" })

app.use(express.json())
app.use(cors({
    origin:"https://perucreations.tech",
    credentials: true
}))

app.use("/users", userRoutes)
app.use("/students", studentRoutes)
app.use("/livekit", livekiteRoutes)

const port = process.env.PORT || 5000

const startServer = async () => {
    try {
        await connectDB()

        app.listen(port, () => {
            console.log(`Server running on port ${port} 🔥`)
        })

    } catch (error) {
        console.log("Database connection failed:", error)
    }
}

startServer()