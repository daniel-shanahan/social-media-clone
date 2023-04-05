import {useCollectionData} from 'react-firebase-hooks/firestore';

/* Components */
import NewPost from '../NewPost';
import Post from '../Post';

function Feed({ props }) {
  const { auth, db, getDetailsFromUID } = props;

  const postsRef = db.collection('posts');
  const query = postsRef.orderBy('createdAt').limit(25);

  const [posts] = useCollectionData(query, {idField: 'id'});

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
    <div className='content'>
      <NewPost props={newPostProps} />
      {posts && <hr className='h-0 border-b-2 border-b-gray-300 sm:w-[512px] sm:mx-auto'></hr>}
      {posts && posts.map(post => <Post key={post.id} props={getPostProps(post)} /> )}
    </div>
  );
}

export default Feed;