import { UserRound, Video, Plus, Calendar, Settings, LogIn, LogOut, BookUser } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router"
import { Room } from "livekit-client"
import toast from "react-hot-toast"
import RoomJoinCredentials from "./RoomJoinCredentials"
import CreateStudent from "./CreateStudent"

const Home = () => {
    const navigate = useNavigate()

    const [username, setUsername] = useState("")
    const [time, setTime] = useState(new Date())
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [showJoinPopup, setShowJoinPopup] = useState(false)
    const [showCreateStudent, setShowCreateStudent] = useState(false)
    
    const [activeRoomData, setActiveRoomData] = useState(null)
    const [activeRoomInstance, setActiveRoomInstance] = useState(null)
    
    const localVideoContainerRef = useRef(null)

    useEffect(() => {
        const token = localStorage.getItem("token")
        const storedUsername = localStorage.getItem("username")

        if (token) {
            setIsLoggedIn(true)
            if (storedUsername) setUsername(storedUsername)
        } else {
            setIsLoggedIn(false)
        }

        const timer = setInterval(() => {
            setTime(new Date())
        }, 1000)

        return () => clearInterval(timer)
    }, [])

    const handleConnectRoom = async (studentid) => {
        try {
            const token = localStorage.getItem("token")

            const response = await fetch("http://localhost:5000/livekit/join", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ studentid })
            })

            const data = await response.json()

            if (!response.ok) {
                toast.error(data.message || "Failed to join room")
                return
            }

            const room = new Room()

            await room.connect(data.serverUrl, data.token)
            await room.localParticipant.enableCameraAndMicrophone()

            setActiveRoomData(data)
            setActiveRoomInstance(room)
            setShowJoinPopup(false)
            toast.success("Successfully joined room!")

            // Safely attach local video track once container is rendered
            setTimeout(() => {
                attachLocalVideo(room);
            }, 300)

        } catch (error) {
            console.error("LiveKit connection error:", error)
            toast.error("Failed to connect to video room!")
        }
    }

    const attachLocalVideo = (roomInstance) => {
        if (!localVideoContainerRef.current || !roomInstance?.localParticipant) return;
        
        try {
            const participant = roomInstance.localParticipant;
            // Support multiple LiveKit SDK versions for track storage
            const publications = participant.videoTrackPublications || participant.videoTracks;
            
            if (publications) {
                const pubsArray = publications instanceof Map ? Array.from(publications.values()) : Object.values(publications);
                const activePub = pubsArray.find(p => p.track);
                
                if (activePub && activePub.track) {
                    const videoElement = activePub.track.attach();
                    videoElement.className = "w-full h-full object-cover";
                    localVideoContainerRef.current.innerHTML = "";
                    localVideoContainerRef.current.appendChild(videoElement);
                }
            }
        } catch (err) {
            console.error("Error attaching local track:", err);
        }
    }

    // Safely attach via useEffect as fallback
    useEffect(() => {
        if (activeRoomInstance) {
            setTimeout(() => {
                attachLocalVideo(activeRoomInstance);
            }, 300);
        }
    }, [activeRoomData, activeRoomInstance])

    const handleLogout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("username")
        setUsername("")
        setIsLoggedIn(false)
        setShowJoinPopup(false)
        setShowCreateStudent(false)
        toast.success("Logged out successfully!")
        navigate("/sign-in")
    }

    const handleJoinClick = () => {
        const token = localStorage.getItem("token")
        if (!token || !isLoggedIn) {
            toast.error("Please sign in to join a room!")
            navigate("/sign-in")
            return
        }
        setShowJoinPopup(true)
    }

    const formatTime = (date, timeZone) => {
        return date.toLocaleTimeString("en-US", { timeZone, hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true })
    }

    const formatDate = (date, timeZone) => {
        return date.toLocaleDateString("en-US", { timeZone, weekday: "long", month: "long", day: "numeric", year: "numeric" })
    }

    if (activeRoomData) {
        return (
            <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center p-6">
                <div className="w-full max-w-4xl bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-2xl flex flex-col items-center gap-6">
                    <div className="flex justify-between items-center w-full">
                        <div>
                            <h2 className="text-xl font-bold text-white tracking-tight">{activeRoomData.roomName}</h2>
                            <p className="text-gray-400 text-xs mt-0.5">Semester {activeRoomData.semester} • Live Video Active</p>
                        </div>
                        <button
                            onClick={() => {
                                if (activeRoomInstance) activeRoomInstance.disconnect()
                                window.location.reload()
                            }}
                            className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-sm font-semibold transition shadow-lg"
                        >
                            Leave Room
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full min-h-[350px] bg-black/40 rounded-xl p-4 border border-white/10 items-center justify-center">
                        <div 
                            ref={localVideoContainerRef} 
                            className="relative w-full h-[300px] bg-gray-950 rounded-lg overflow-hidden border border-white/10 flex items-center justify-center"
                        >
                            <span className="absolute bottom-3 left-3 bg-black/60 px-2 py-1 rounded text-xs text-white z-10">You</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="relative min-h-screen bg-gray-950 text-white flex flex-col md:flex-row overflow-hidden">
            <aside className="w-full md:w-20 md:min-h-screen bg-gray-900/60 border-b md:border-b-0 md:border-r border-gray-800 flex md:flex-col items-center justify-between p-4 z-10">
                <div className="flex md:flex-col items-center gap-6">
                    <button title="Create Student" onClick={() => setShowCreateStudent(true)} className="p-3 rounded-xl hover:bg-gray-800 text-gray-400 hover:text-white transition-colors">
                        <BookUser size={24} />
                    </button>
                    <button title="Settings" onClick={() => navigate("/you-fucked-up")} className="p-3 rounded-xl hover:bg-gray-800 text-gray-400 hover:text-white transition-colors">
                        <Settings size={24} />
                    </button>
                </div>

                <div className="flex md:flex-col items-center gap-6">
                    {isLoggedIn ? (
                        <button title="Log Out" onClick={handleLogout} className="p-3 rounded-xl hover:bg-red-500/10 text-gray-400 hover:text-red-400 transition-colors">
                            <LogOut size={24}/>
                        </button>
                    ) : (
                        <button title="Log In" onClick={() => navigate("/sign-in")} className="p-3 rounded-xl hover:bg-green-500/10 text-gray-400 hover:text-green-400 transition-colors">
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
                        <button onClick={handleJoinClick} className="w-28 h-28 md:w-36 md:h-36 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all shadow-lg group">
                            <Video className="w-10 h-10 md:w-12 md:h-12 text-gray-300 group-hover:text-white transition-all" />
                        </button>
                        <button onClick={() => navigate("/you-fucked-up")} className="w-28 h-28 md:w-36 md:h-36 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all shadow-lg group">
                            <Plus className="w-10 h-10 md:w-12 md:h-12 text-gray-300 group-hover:text-white transition-all" />
                        </button>
                        <button onClick={() => navigate("/you-fucked-up")} className="w-28 h-28 md:w-36 md:h-36 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all shadow-lg group">
                            <Calendar className="w-10 h-10 md:w-12 md:h-12 text-gray-300 group-hover:text-white transition-all" />
                        </button>
                        <button onClick={() => navigate("/you-fucked-up")} className="w-28 h-28 md:w-36 md:h-36 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all shadow-lg group">
                            <Settings className="w-10 h-10 md:w-12 md:h-12 text-gray-300 group-hover:text-white transition-all" />
                        </button>
                    </div>

                    <div className="w-full max-w-sm lg:w-[360px] bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8 shadow-lg flex flex-col justify-center gap-5">
                        <div>
                            <span className="text-[11px] font-semibold tracking-wider text-gray-400 uppercase">IST (Asia/Kolkata)</span>
                            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white leading-tight mt-0.5">{formatTime(time, "Asia/Kolkata")}</h2>
                            <p className="text-xs md:text-sm text-gray-400 mt-0.5">{formatDate(time, "Asia/Kolkata")}</p>
                        </div>
                        <div className="pt-4 border-t border-white/10">
                            <span className="text-[11px] font-semibold tracking-wider text-gray-400 uppercase">UTC Standard</span>
                            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white leading-tight mt-0.5">{formatTime(time, "UTC")}</h2>
                            <p className="text-xs md:text-sm text-gray-400 mt-0.5">{formatDate(time, "UTC")}</p>
                        </div>
                    </div>
                </div>

                {showJoinPopup && (
                    <RoomJoinCredentials
                        onClose={() => setShowJoinPopup(false)}
                        onConnect={handleConnectRoom}
                    />
                )}

                {showCreateStudent && (
                    <CreateStudent onClose={() => setShowCreateStudent(false)} />
                )}
            </main>
        </div>
    )
}

export default Home