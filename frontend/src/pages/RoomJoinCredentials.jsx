import { useState } from "react"
import toast from "react-hot-toast"
import { LiveKitRoom, VideoConference } from "@livekit/components-react"
import { X } from "lucide-react"
import "@livekit/components-styles"

const RoomJoinCredentials = ({ onClose }) => {

    const [studentid, setStudentid] = useState("")
    const [roomData, setRoomData] = useState(null)

    const handleJoinRoom = async (e) => {

        e.preventDefault()

        if (!studentid.trim()) {
            toast.error("Enter your student ID")
            return
        }

        try {

            const response = await fetch("http://localhost:3000/livekit/join", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ studentid })
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
            <div className="fixed inset-0 z-50 bg-black">
                <button
                    onClick={() => {
                        setRoomData(null)
                        onClose()
                    }}
                    className="absolute top-4 right-4 z-[60] p-2 bg-gray-800 rounded-full text-white hover:bg-red-500"
                >
                    <X size={24} />
                </button>

                <LiveKitRoom
                    serverUrl={roomData.serverUrl}
                    token={roomData.token}
                    connect={true}
                    video={true}
                    audio={true}
                    onDisconnected={onClose}
                >
                    <VideoConference />
                </LiveKitRoom>
            </div>
        )
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">

            <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-gray-900 p-8 shadow-2xl">

                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
                >
                    <X size={22} />
                </button>

                <h2 className="text-2xl font-semibold text-white mb-2">
                    Join a Room
                </h2>

                <p className="text-sm text-gray-400 mb-6">
                    Enter your student ID to join your semester room.
                </p>

                <form onSubmit={handleJoinRoom} className="flex flex-col gap-4">

                    <input
                        type="text"
                        placeholder="Enter your student ID"
                        value={studentid}
                        onChange={e => setStudentid(e.target.value)}
                        className="w-full rounded-xl bg-gray-800 border border-gray-700 px-4 py-3 text-white outline-none focus:border-white"
                    />

                    <button
                        type="submit"
                        className="w-full rounded-xl bg-white py-3 font-semibold text-black hover:bg-gray-200 transition"
                    >
                        Join Room
                    </button>

                </form>

            </div>
        </div>
    )
}

export default RoomJoinCredentials