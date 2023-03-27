import {useCollectionData} from 'react-firebase-hooks/firestore';

/* Components */
import TopBar from './TopBar';
import NewPost from './NewPost';
import Post from './Post';

function Feed({ props }) {
  const { auth, db } = props;

  const postsRef = db.collection('posts');
  const query = postsRef.orderBy('createdAt').limit(25);

  const [posts] = useCollectionData(query, {idField: 'id'});
  const [users] = useCollectionData(db.collection('users'), {idField: 'id'});

  const getDetailsFromUID = (uid) => {
    const [postedBy] = users.filter(user => user.uid === uid);

    return {
      displayName: postedBy.displayName,
      photoURL: postedBy.photoURL
    };
  };

  const newPostProps = {
    auth: auth,
    postsRef: postsRef
  }

  const getPostProps = post => {
    return  { 
      post: post, 
      auth: auth, 
      postsRef: postsRef,
      getDetailsFromUID
    };
  };

  return (
    <div className='bg-gray-50 h-full flex flex-col items-center gap-7'>
      <TopBar auth={auth} />
      <NewPost props={newPostProps} />
      <div className="flex flex-col gap-6">
        {posts && <hr className='h-0 w-96 border-b-2 border-b-gray-300'></hr>}
        {posts && posts.map(post => <Post key={post.id} props={getPostProps(post)} /> )}
      </div>
    </div>
  );
}

export default Feed;