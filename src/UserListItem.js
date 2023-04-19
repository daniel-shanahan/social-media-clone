import { NavLink } from 'react-router-dom';

export default function UserListItem({ uid, getDetailsFromUID }) {
  const { displayName, photoURL } = getDetailsFromUID(uid);

  return (
    <div>
      <NavLink to={'/profile/' + uid}>
        <img src={photoURL} alt='Profile' className='h-10 w-10 mr-3 rounded-full inline' referrerPolicy="no-referrer" />
      </NavLink>
      <NavLink to={'/profile/' + uid}>
        <p className="font-semibold text-gray-600 inline">{displayName}</p>
      </NavLink>
    </div>
  );
}