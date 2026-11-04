import React from 'react'
import { Link } from 'react-router'
import { Home, ArrowLeft } from 'lucide-react'

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center  px-4">
      <div className="w-full max-w-lg text-center p-10 rounded-2xl border">

        <h1 >404!!</h1>
     



        <p className="text-gray-400 mb-8">
            Something went wrong please try again later!!
        </p>

        <div className="flex items-center justify-center gap-4">
 

          <Link
            to="/"
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 text-white hover:bg-indigo-500 transition"
          >
            <Home size={18} />
            Home
          </Link>
        </div>

      </div>
    </div>
  )
}

export default ErrorPage