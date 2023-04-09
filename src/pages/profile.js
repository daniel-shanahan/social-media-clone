import {useCollectionData} from 'react-firebase-hooks/firestore';
import Post from '../Post';

function Profile({ props }) {
  const { auth, db, getDetailsFromUID } = props;
  const uid = auth.currentUser.uid;
  const { displayName, photoURL } = getDetailsFromUID(uid);

  const postsRef = db.collection('posts');
  const postsQuery = postsRef.where('uid', '==', uid).orderBy('createdAt').limit(25);
  const [posts] = useCollectionData(postsQuery, {idField: 'id'});

  const getPostProps = post => {
    return  { 
      post: post, 
      auth: auth, 
      postsRef: postsRef,
      getDetailsFromUID
    };
  };

  return (
    <div className="content">
      <div className="content-item">
        <img src={photoURL} alt='Profile' className='mr-4 rounded-lg inline' referrerPolicy="no-referrer"/>
        <p className="text-2xl font-semibold text-gray-600 align-top inline">{displayName}</p>
        <div className="mt-4 flex border-2 border-gray-200 shadow-sm">
          <button className="button-bar-button bg-gray-100 border-r-2">Posts</button>
          <button className="button-bar-button">Followers</button>
          <button className="button-bar-button">Following</button>
        </div>
      </div>
      {posts && posts.map(post => <Post key={post.id} props={getPostProps(post)} /> )}
    </div>
  );
}

export default Profile;