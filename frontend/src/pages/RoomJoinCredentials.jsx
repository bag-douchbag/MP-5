import { useState } from "react"
import toast from "react-hot-toast"

const RoomJoinCredentials = ({ onClose, onConnect }) => {
    const [studentid, setStudentid] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!studentid.trim()) {
            toast.error("Please enter a student ID!")
            return
        }

        setLoading(true)
        await onConnect(studentid)
        setLoading(false)
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-50 px-4">
            <div className="w-full max-w-md rounded-2xl border border-white/20 bg-gray-900 p-6 shadow-2xl text-white">
                <h2 className="text-xl font-bold mb-4">Enter Student ID to Join Room</h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm text-gray-300 mb-1">Student ID</label>
                        <input
                            type="text"
                            placeholder="Enter numeric student ID"
                            value={studentid}
                            onChange={(e) => setStudentid(e.target.value)}
                            className="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-indigo-400"
                        />
                    </div>

                    <div className="flex justify-end gap-3 mt-6">
                        <button type="button" onClick={onClose} className="px-4 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 transition">
                            Cancel
                        </button>
                        <button type="submit" disabled={loading} className="px-4 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-400 font-semibold transition disabled:opacity-50">
                            {loading ? "Connecting..." : "Join Room"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RoomJoinCredentials