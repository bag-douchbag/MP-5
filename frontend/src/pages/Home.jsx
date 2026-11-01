import { UserRound, Video, Plus, Calendar, Settings } from "lucide-react"
import { useState, useEffect } from "react"

const Home = () => {
    const [username, setUsername] = useState("")
    const [time, setTime] = useState(new Date())

    const fetchUsername = async () => {
        try {
            const token = localStorage.getItem("token")

            const response = await fetch("http://localhost:3000/auth/me", {
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
        <div className="relative min-h-screen bg-gray-950 text-white flex items-center justify-center p-6 lg:p-12">

            <div className="absolute top-5 right-6 flex items-center gap-2.5">
                <div className="border border-gray-800 rounded-lg px-4 py-2 bg-gray-900 shadow-md">
                    <p className="text-sm font-medium">{username || "Loading..."}</p>
                </div>
                <div className="border border-gray-800 rounded-full p-2 bg-gray-900 shadow-md">
                    <UserRound size={24}/>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row items-center justify-center gap-10 xl:gap-14 w-full max-w-5xl my-auto">

                    <div className="w-28 h-28 md:w-36 md:h-36 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all duration-200 cursor-pointer shadow-lg">
                        <Video className="w-10 h-10 md:w-12 md:h-12 text-white" />
                    </div>

                    <div className="w-28 h-28 md:w-36 md:h-36 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all duration-200 cursor-pointer shadow-lg">
                        <Plus className="w-10 h-10 md:w-12 md:h-12 text-white" />
                    </div>

                    <div className="w-28 h-28 md:w-36 md:h-36 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all duration-200 cursor-pointer shadow-lg">
                        <Calendar className="w-10 h-10 md:w-12 md:h-12 text-white" />
                    </div>

                    <div className="w-28 h-28 md:w-36 md:h-36 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all duration-200 cursor-pointer shadow-lg">
                        <Settings className="w-10 h-10 md:w-12 md:h-12 text-white" />
                    </div>

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
        </div>
    )
}

export default Home