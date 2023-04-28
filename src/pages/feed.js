import {useCollectionData} from 'react-firebase-hooks/firestore';

/* Components */
import NewPost from '../NewPost';
import Post from '../Post';

function Feed({ props }) {
  const { auth, db, getDetailsFromUID } = props;

  const postsRef = db.collection('posts');
  const query = postsRef.orderBy('createdAt', 'desc').limit(25);
  const [posts] = useCollectionData(query);

  return (
    <div className='content'>
      <NewPost props={{auth, postsRef}} />
      <hr className='h-0 border-b-2 border-b-gray-300 sm:w-[512px] sm:mx-auto' />
      {posts 
        ? posts.map(post => <Post key={post.id} props={{post, auth, postsRef, getDetailsFromUID}} /> )
        : <div className='content-item'><p className='text-center'>Be the first to share your thoughts!</p></div>}
    </div>
  );
}

export default Feed;