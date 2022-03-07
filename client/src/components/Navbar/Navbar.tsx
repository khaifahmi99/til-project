import { BookOpenIcon } from '@heroicons/react/outline';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div
      className="w-full bg-sky-600 sticky top-0"
      style={{ borderBottom: '4px solid purple' }}
    >
      <div className="flex flex-row items-center justify-between mr-8">
        <div
          className="w-12 h-12 py-2 pl-8 pr-16 rounded-br-full text-white hover:cursor-pointer"
          style={{ backgroundColor: 'purple' }}
          onClick={() => navigate('/')}
        >
          <BookOpenIcon />
        </div>
        <div
          className="text-white text-lg hover:cursor-pointer"
          onClick={() => navigate('/add/til')}
        >
          New Entry
        </div>
      </div>
    </div>
  );
};

export default Navbar;
