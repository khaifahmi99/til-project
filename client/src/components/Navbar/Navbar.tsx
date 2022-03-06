import { BookOpenIcon } from "@heroicons/react/outline";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return(
    <div className="w-full h-16 bg-sky-900">
      <div className="flex flex-row items-center justify-between mx-8">
        <div className='w-12 h-12 p-2 text-white hover:cursor-pointer' onClick={() => navigate('/')}>
          <BookOpenIcon />
        </div>
        <div className="text-white text-lg hover:cursor-pointer" onClick={() => navigate('/add/til')}>
          New Entry
        </div>
      </div>
    </div>
  )
}

export default Navbar;