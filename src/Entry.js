import { NavLink } from 'react-router-dom';

function Entry({ props }) {
  const { uid, getDetailsFromUID, text } = props;
  const { displayName, photoURL } = getDetailsFromUID(uid);

  return (
    <>
      <NavLink to={'/profile/' + uid}>
        <img src={photoURL} alt='Profile' className='h-10 w-10 mr-3 rounded-full inline' referrerPolicy="no-referrer" />
      </NavLink>
      <NavLink to={'/profile/' + uid}>
        <p className="font-semibold text-gray-600 inline">{displayName}</p>
      </NavLink>
      <p className="mt-3 mb-3">{text}</p>
    </>
  );
}

export default Entry;