
const FloatingStudentid = () => {

    const [studentid, setStudentid] = useState("")

    const handle
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="w-[375px] h-[208px] border-4 border-black bg-white flex items-center justify-center">
        <form className="w-[76%]">
          <input
            type="text"
            placeholder="Enter your Student ID"
            className="w-full h-14 border-4 border-black px-3 outline-none text-center text-lg"
          />
        </form>
      </div>
    </div>
  )
}

export default FloatingStudentid