import { useState } from "react"
import { Link } from "react-router"
import toast from "react-hot-toast"

const SignIn = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleSignIn = async(e) => {
        e.preventDefault()

        if(!username.trim() || !password.trim()){
            toast.error("all fields are required!!")
            return
        }

        const response = await fetch("http://localhost:3000", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        })

        const data = await response.json()

        if(data.status === "failure"){
            toast.error("invalid credentials!!")
        }else{
            toast.success("login-success!!")
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 px-4">

            <div className="w-full max-w-md rounded-2xl border border-white/20 bg-white/10 p-8 shadow-2xl backdrop-blur-xl">

                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-white">
                        Welcome Back
                    </h1>
                    <p className="mt-2 text-sm text-gray-300">
                        Sign in to continue to your account
                    </p>
                </div>

                <form onSubmit={handleSignIn} className="space-y-6">

                    <div>
                        <label htmlFor="username" className="mb-2 block text-sm font-medium text-gray-200">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            placeholder="Enter your username"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-gray-400 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/30"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-200">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-gray-400 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/30"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full rounded-xl bg-indigo-500 py-3 font-semibold text-white shadow-lg transition hover:bg-indigo-400 active:scale-[0.98]"
                    >
                        Sign In
                    </button>

                </form>

            <p className="mt-8 text-center text-sm text-gray-300">
                New here?
                <Link to="/sign-up" className="mx-2 font-semibold text-indigo-300 transition hover:text-white">
                    Sign Up
                </Link>
                here
            </p>

            </div>
        </div>
    )
}

export default SignIn
