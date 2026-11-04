import express from "express"
import userRoutes from "./Router/userRoutes"
import studentRoutes from "./Router/studentRoutes"
import livekiteRoutes from "./Router/roomRoutes"

const app = express()

app.use(express.json())
app.use(Cors())

app.use("/user", userRoutes)
app.use("/student", studentRoutes)
app.use("/livekit", livekiteRoutes)


const port = process.env.PORT || 5000;

app.listen(port, () => `Server running on port ${port} 🔥`);