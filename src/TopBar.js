import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';

function TopBar({ auth }) {     
  return (
    <nav className="sticky top-0 h-14 w-full bg-blue-500 text-white font-semibold shadow-md flex justify-end text-xl gap-4 pr-4 sm:gap-8 sm:pr-8">
      <NavLink to='/feed' className='text-2xl my-3 absolute left-4 sm:left-8'>Connector</NavLink>
      <NavLink to='/feed' className='my-auto'>
        <FontAwesomeIcon icon='house' className='px-1' />
      </NavLink>
      <NavLink to={'/profile/' + auth.currentUser.uid} className='my-auto'>
        <FontAwesomeIcon icon='user' className='px-1' />
      </NavLink>
      <button onClick={() => auth.signOut()}>
        <FontAwesomeIcon icon='right-from-bracket' className='px-1' />
      </button>
    </nav>
  );
}

export default TopBar;