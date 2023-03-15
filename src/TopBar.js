import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function TopBar({ auth }) {
  return (
    <div className="h-14 w-full bg-blue-500 flex justify-between text-white font-semibold">
      <div className='text-2xl'>
        <FontAwesomeIcon icon='share-nodes' color='white' className='px-1' />
        <p className='inline'>Connector</p>
      </div>
      <button className="text-lg" onClick={() => auth.signOut()}>Sign Out</button>
    </div>
  );
}

export default TopBar;