
import { useState } from "react"
import toast from "react-hot-toast"
import { LiveKitRoom, VideoConference } from "@livekit/components-react"
import "@livekit/components-styles"

const RoomJoinCredentials = () => {

    const [studentid, setStudentid] = useState("")
    const [roomData, setRoomData] = useState(null)

    const handleJoinRoom = async (e) => {

        e.preventDefault()

        if (!studentid.trim()) {
            toast.error("Enter your student ID")
            return
        }

        try {

            const response = await fetch("http://localhost:3000/room/join", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    studentid
                })
            })

            const data = await response.json()

            if (!response.ok) {
                toast.error(data.message)
                return
            }

            setRoomData(data)
            toast.success(`Joining ${data.roomName}`)

        } catch (error) {

            console.error(error)
            toast.error("Unable to join room")
        }
    }

    if (roomData) {
        return (
            <LiveKitRoom
                serverUrl={roomData.serverUrl}
                token={roomData.token}
                connect={true}
                video={true}
                audio={true}
                onDisconnected={() => setRoomData(null)}
            >
                <VideoConference />
            </LiveKitRoom>
        )
    }

    return (
        <div>
            <form onSubmit={handleJoinRoom}>

                <label htmlFor="studentid">
                    Enter your student ID
                </label>

                <input
                    type="text"
                    id="studentid"
                    value={studentid}
                    onChange={e => setStudentid(e.target.value)}
                />

                <button type="submit">
                    Join
                </button>

            </form>
        </div>
    )
}

export default RoomJoinCredentials
