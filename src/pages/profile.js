import {useCollectionData} from 'react-firebase-hooks/firestore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useParams } from 'react-router-dom';
import Post from '../Post';

function Profile({ props }) {
  const { auth, db, getDetailsFromUID } = props;
  const { uid } = useParams();
  const { displayName, photoURL } = getDetailsFromUID(uid);

  const currentUserID = auth.currentUser.uid;
  const isUserProfile = uid === currentUserID;
  /* User posts */
  const postsRef = db.collection('posts');
  const postsQuery = postsRef.where('uid', '==', uid).orderBy('createdAt').limit(25);
  const [posts] = useCollectionData(postsQuery, {idField: 'id'});

  const handleClickFollow = async(e) => {
    // TODO
    console.log('handleClickFollow');

  };

  return (
    <div className="content">
      <div className="content-item">
        <div className='flex gap-4'>
          <img src={photoURL} alt='Profile' className='rounded-lg' referrerPolicy="no-referrer"/>
          <div className='flex flex-col font-semibold gap-2'>
            <p className="text-2xl text-gray-600 align-top">{displayName}</p>
            {!isUserProfile &&
              <button onClick={handleClickFollow} className='bg-green-500 text-white text-lg py-1 px-4 w-fit'>
                <FontAwesomeIcon icon='plus' className='pr-1' />
                Follow
              </button>}
          </div>
        </div>
        <div className="mt-4 flex border-2 border-gray-200 shadow-sm">
          <button className="button-bar-button bg-gray-100 border-r-2">Posts</button>
          <button className="button-bar-button">Followers</button>
          <button className="button-bar-button">Following</button>
        </div>
      </div>
      {posts && posts.map(post => <Post key={post.id} props={{post, auth, postsRef, getDetailsFromUID}} /> )}
    </div>
  );
}

export default Profile;