import { UserRound, Video, Plus, Calendar, Settings, LogIn, LogOut, BookUser } from "lucide-react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router"
import RoomJoinCredentials from "./RoomJoinCredentials"
import CreateStudent from "./CreateStudent"

const Home = () => {

    const navigate = useNavigate()

    const [username, setUsername] = useState("")
    const [time, setTime] = useState(new Date())
    const [isLoggedIn, setIsLoggedIn] = useState(true)
    const [showJoinPopup, setShowJoinPopup] = useState(false)
    const [showCreateStudent, setShowCreateStudent] = useState(false)

    const fetchUsername = async () => {

        try {

            const token = localStorage.getItem("token")
            if (!token) return

            const response = await fetch("http://localhost:5000/auth/me", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message)
            }

            setUsername(data.username)

        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {

        fetchUsername()

        const timer = setInterval(() => {
            setTime(new Date())
        }, 1000)

        return () => clearInterval(timer)

    }, [])

    const formatTime = (date, timeZone) => {
        return date.toLocaleTimeString("en-US", {
            timeZone,
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true
        })
    }

    const formatDate = (date, timeZone) => {
        return date.toLocaleDateString("en-US", {
            timeZone,
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric"
        })
    }

    return (
        <div className="relative min-h-screen bg-gray-950 text-white flex flex-col md:flex-row overflow-hidden">

            <aside className="w-full md:w-20 md:min-h-screen bg-gray-900/60 border-b md:border-b-0 md:border-r border-gray-800 flex md:flex-col items-center justify-between p-4 z-10">

                <div className="flex md:flex-col items-center gap-6">

                    <button
                        title="Create Student"
                        onClick={() => setShowCreateStudent(true)}
                        className="p-3 rounded-xl hover:bg-gray-800 text-gray-400 hover:text-white transition-colors"
                    >
                        <BookUser size={24} />
                    </button>

                    <button
                        title="Settings"
                        onClick={() => navigate("/you-fucked-up")}
                        className="p-3 rounded-xl hover:bg-gray-800 text-gray-400 hover:text-white transition-colors"
                    >
                        <Settings size={24} />
                    </button>

                </div>

                <div className="flex md:flex-col items-center gap-6">

                    {isLoggedIn ? (
                        <button
                            title="Log Out"
                            onClick={() => setIsLoggedIn(false)}
                            className="p-3 rounded-xl hover:bg-red-500/10 text-gray-400 hover:text-red-400 transition-colors"
                        >
                            <LogOut size={24} />
                        </button>
                    ) : (
                        <button
                            title="Log In"
                            onClick={() => setIsLoggedIn(true)}
                            className="p-3 rounded-xl hover:bg-green-500/10 text-gray-400 hover:text-green-400 transition-colors"
                        >
                            <LogIn size={24} />
                        </button>
                    )}

                </div>

            </aside>

            <main className="flex-1 relative flex flex-col items-center justify-center p-6 lg:p-12">

                <div className="absolute top-6 right-6 flex items-center gap-3">

                    <div className="border border-gray-800 rounded-lg px-4 py-2 bg-gray-900/80 backdrop-blur-md shadow-md">
                        <p className="text-sm font-medium">{username || "Guest User"}</p>
                    </div>

                    <div className="border border-gray-800 rounded-full p-2 bg-gray-900/80 backdrop-blur-md shadow-md">
                        <UserRound size={24} />
                    </div>

                </div>

                <div className="flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-16 w-full max-w-6xl mt-12 md:mt-0">

                    <div className="grid grid-cols-2 gap-4 md:gap-6">

                        <button
                            onClick={() => setShowJoinPopup(true)}
                            className="w-28 h-28 md:w-36 md:h-36 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all duration-200 shadow-lg group"
                        >
                            <Video className="w-10 h-10 md:w-12 md:h-12 text-gray-300 group-hover:text-white group-hover:scale-105 transition-all" />
                        </button>

                        <button
                            onClick={() => navigate("/you-fucked-up")}
                            className="w-28 h-28 md:w-36 md:h-36 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all duration-200 shadow-lg group"
                        >
                            <Plus className="w-10 h-10 md:w-12 md:h-12 text-gray-300 group-hover:text-white group-hover:scale-105 transition-all" />
                        </button>

                        <button
                            onClick={() => navigate("/you-fucked-up")}
                            className="w-28 h-28 md:w-36 md:h-36 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all duration-200 shadow-lg group"
                        >
                            <Calendar className="w-10 h-10 md:w-12 md:h-12 text-gray-300 group-hover:text-white group-hover:scale-105 transition-all" />
                        </button>

                        <button
                            onClick={() => navigate("/you-fucked-up")}
                            className="w-28 h-28 md:w-36 md:h-36 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all duration-200 shadow-lg group"
                        >
                            <Settings className="w-10 h-10 md:w-12 md:h-12 text-gray-300 group-hover:text-white group-hover:scale-105 transition-all" />
                        </button>

                    </div>

                    <div className="w-full max-w-sm lg:w-[360px] bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8 shadow-lg flex flex-col justify-center gap-5">

                        <div>
                            <span className="text-[11px] font-semibold tracking-wider text-gray-400 uppercase">
                                IST (Asia/Kolkata)
                            </span>

                            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white leading-tight mt-0.5">
                                {formatTime(time, "Asia/Kolkata")}
                            </h2>

                            <p className="text-xs md:text-sm text-gray-400 mt-0.5">
                                {formatDate(time, "Asia/Kolkata")}
                            </p>
                        </div>

                        <div className="pt-4 border-t border-white/10">

                            <span className="text-[11px] font-semibold tracking-wider text-gray-400 uppercase">
                                UTC Standard
                            </span>

                            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white leading-tight mt-0.5">
                                {formatTime(time, "UTC")}
                            </h2>

                            <p className="text-xs md:text-sm text-gray-400 mt-0.5">
                                {formatDate(time, "UTC")}
                            </p>

                        </div>

                    </div>

                </div>

                {showJoinPopup && (
                    <RoomJoinCredentials
                        onClose={() => setShowJoinPopup(false)}
                    />
                )}

                {showCreateStudent && (
                    <CreateStudent
                        onClose={() => setShowCreateStudent(false)}
                    />
                )}

            </main>
        </div>
    )
}

export default Home