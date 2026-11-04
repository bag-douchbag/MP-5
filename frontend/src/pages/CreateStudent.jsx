import { useState } from "react"
import { X, UserPlus } from "lucide-react"
import toast from "react-hot-toast"

const CreateStudent = ({ onClose }) => {

    const [studentname, setStudentname] = useState("")
    const [contactno, setContactno] = useState("")
    const [semester, setSemester] = useState("")
    const [loading, setLoading] = useState(false)
    const [createdStudent, setCreatedStudent] = useState(null)

    const handleSubmit = async (e) => {

        e.preventDefault()

        if (!studentname.trim() || !contactno.trim() || !semester) {
            toast.error("All fields are required")
            return
        }

        if (studentname.trim().length < 2) {
            toast.error("Student name must contain at least 2 characters")
            return
        }

        if (!/^\d{10}$/.test(contactno)) {
            toast.error("Enter a valid 10-digit contact number")
            return
        }

        try {

            setLoading(true)

            const response = await fetch("http://localhost:3000/api/students/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    studentname,
                    contactno,
                    studentcourse: "bca",
                    semester: Number(semester)
                })
            })

            const data = await response.json()

            if (!response.ok) {
                toast.error(data.message || "Unable to create student")
                return
            }

            setCreatedStudent(data.data)
            toast.success("Student created successfully!")

        } catch (error) {
            console.error(error)
            toast.error("Something went wrong")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">

            <div className="relative w-full max-w-lg rounded-2xl border border-white/10 bg-gray-900 p-6 md:p-8 shadow-2xl">

                <button
                    onClick={onClose}
                    className="absolute right-5 top-5 rounded-lg p-2 text-gray-400 hover:bg-gray-800 hover:text-white transition"
                >
                    <X size={22} />
                </button>

                <div className="mb-7">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
                        <UserPlus size={25} className="text-white" />
                    </div>

                    <h2 className="text-2xl font-semibold text-white">
                        Create Student
                    </h2>

                    <p className="mt-1 text-sm text-gray-400">
                        Enter the student details below.
                    </p>
                </div>

                {createdStudent ? (

                    <div className="space-y-5">

                        <div className="rounded-xl border border-green-500/20 bg-green-500/10 p-5">
                            <p className="text-sm text-green-400">
                                Student created successfully!
                            </p>

                            <h3 className="mt-2 text-2xl font-bold text-white">
                                {createdStudent.studentid}
                            </h3>

                            <p className="mt-1 text-xs text-gray-400">
                                Generated Student ID
                            </p>
                        </div>

                        <div className="space-y-2 text-sm text-gray-300">
                            <p>Name: {createdStudent.studentname}</p>
                            <p>Contact: {createdStudent.contactno}</p>
                            <p>Course: {createdStudent.studentcourse?.toUpperCase()}</p>
                            <p>Semester: {createdStudent.semester}</p>
                        </div>

                        <button
                            onClick={onClose}
                            className="w-full rounded-xl bg-white py-3 font-semibold text-black hover:bg-gray-200 transition"
                        >
                            Done
                        </button>

                        <button
                            onClick={() => {
                                setCreatedStudent(null)
                                setStudentname("")
                                setContactno("")
                                setSemester("")
                            }}
                            className="w-full rounded-xl border border-gray-700 py-3 text-white hover:bg-gray-800 transition"
                        >
                            Create Another Student
                        </button>

                    </div>

                ) : (

                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">

                        <div>
                            <label className="mb-2 block text-sm text-gray-300">
                                Student Name
                            </label>

                            <input
                                type="text"
                                placeholder="Enter student name"
                                value={studentname}
                                onChange={e => setStudentname(e.target.value)}
                                className="w-full rounded-xl border border-gray-700 bg-gray-800 px-4 py-3 text-white outline-none placeholder:text-gray-500 focus:border-white transition"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm text-gray-300">
                                Contact Number
                            </label>

                            <input
                                type="tel"
                                maxLength={10}
                                placeholder="10-digit contact number"
                                value={contactno}
                                onChange={e => setContactno(e.target.value.replace(/\D/g, ""))}
                                className="w-full rounded-xl border border-gray-700 bg-gray-800 px-4 py-3 text-white outline-none placeholder:text-gray-500 focus:border-white transition"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm text-gray-300">
                                Course
                            </label>

                            <input
                                type="text"
                                value="BCA"
                                disabled
                                className="w-full rounded-xl border border-gray-700 bg-gray-800/50 px-4 py-3 text-gray-400 outline-none"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm text-gray-300">
                                Semester
                            </label>

                            <select
                                value={semester}
                                onChange={e => setSemester(e.target.value)}
                                className="w-full rounded-xl border border-gray-700 bg-gray-800 px-4 py-3 text-white outline-none focus:border-white transition"
                            >
                                <option value="" disabled>
                                    Select semester
                                </option>

                                <option value="1">Semester 1</option>
                                <option value="2">Semester 2</option>
                                <option value="3">Semester 3</option>
                                <option value="4">Semester 4</option>
                            </select>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="mt-2 w-full rounded-xl bg-white py-3 font-semibold text-black hover:bg-gray-200 disabled:opacity-50 transition"
                        >
                            {loading ? "Creating Student..." : "Create Student"}
                        </button>

                    </form>

                )}

            </div>
        </div>
    )
}

export default CreateStudent