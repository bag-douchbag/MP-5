import { Toaster } from "react-hot-toast"
import { Routes, Route } from "react-router"

import "./App.css"
import Home from "./pages/Home"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import ErrorPage from "./pages/ErrorPage"

function App() {

    return (
        <>
            <Toaster position="top-right" />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/you-fucked-up" element={<ErrorPage />} />
                <Route path="*" element={<ErrorPage />} />
            </Routes>
        </>
    )
}

export default App