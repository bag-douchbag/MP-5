import { useState } from 'react'
import toast from 'react-hot-toast'
import { Link } from 'react-router'

const SignUp = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handelSignUP = async(e) => {

        e.preventDefault()

        if(!username.trim() || !password.trim()){
            toast.error("All fields are required!")
            return
        }

        try {
            const response = await fetch("http://localhost:3000", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, password })
            })

            const data = await response.json()

            if(!response.ok || data.status === "failure"){
                toast.error(data.message || "Signup failed!")
                return
            }

            toast.success(data.message || "Signup successful!")
            setUsername("")
            setPassword("")

        } catch(error) {
            toast.error("Something went wrong! Please try again later")
            console.log(error)
        }
    }

    return (
        <div className="relative min-h-screen flex items-center justify-center px-4 py-10 bg-black">

            <div className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-2xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.37)] rounded-3xl p-8 sm:p-10">

                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-white tracking-tight">
                        Create an account
                    </h1>
                    <p className="text-gray-400 mt-2 text-sm">
                        Enter your details to get started
                    </p>
                </div>

                <form onSubmit={handelSignUP} className="space-y-6">
                    <div>
                        <label htmlFor="username" className="block text-sm font-semibold text-gray-200 mb-2">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            placeholder="Enter your username"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 outline-none focus:bg-white/10 focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30 transition duration-300"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-semibold text-gray-200 mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 outline-none focus:bg-white/10 focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30 transition duration-300"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-indigo-600 active:scale-[0.98] transition duration-300 shadow-lg shadow-blue-500/20"
                    >
                        Create Account
                    </button>
                </form>

                <p className="text-center text-sm text-gray-400 mt-8">
                    Already have an account?
                    <Link to="/sign-in" className="text-blue-400 font-bold ml-1 hover:text-indigo-400 transition">
                        Sign in
                    </Link>
                </p>

            </div>
        </div>
    )
}

export default SignUp