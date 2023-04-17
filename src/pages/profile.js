import {useCollectionData, useDocumentData} from 'react-firebase-hooks/firestore';
import { useParams } from 'react-router-dom';
import FollowUnfollowButton from '../FollowUnfollowButton';
import Post from '../Post';

export default function Profile({ props }) {
  const { auth, db, getDetailsFromUID } = props;
  const { uid: profileUID } = useParams();
  const { displayName, photoURL } = getDetailsFromUID(profileUID);

  const currentUID = auth.currentUser.uid;
  
  const postsRef = db.collection('posts');
  const postsQuery = postsRef.where('uid', '==', profileUID).orderBy('createdAt').limit(25);
  const [posts] = useCollectionData(postsQuery, {idField: 'id'});

  const profileUserRef = db.collection('users').doc(profileUID);
  const [profileUser] = useDocumentData(profileUserRef, {idField: 'id'});

  return (
    <div className="content">
      <div className="content-item">
        <div className='flex gap-4'>
          <img src={photoURL} alt='Profile' className='w-2/5 rounded-lg shadow-sm' referrerPolicy="no-referrer"/>
          <div className='flex flex-col font-semibold gap-2'>
            <p className="text-2xl text-gray-600 align-top">{displayName}</p>
            <FollowUnfollowButton props={{db, currentUID, profileUID, profileUser, profileUserRef}} />
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