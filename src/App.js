import { useState } from 'react';
import NewPost from './NewPost';
import Feed from './Feed';

const USERNAME = 'Daniel Shanahan';

function App() {
  const [posts, setPosts] = useState([]);
  const [postId, setPostId] = useState(0);

  const addNewPost = newPostText => {
    setPosts(
      [
        { 
          id: postId,
          user: USERNAME,
          text: newPostText 
        },
        ...posts
      ]
    );

    setPostId(pid => pid + 1);
  };

  return (
    <div className='bg-gray-50 h-full flex flex-col items-center gap-7 py-3'>
      <NewPost addNewPost={addNewPost} />
      <hr className='h-0 w-96 border-b-2 border-b-gray-300'></hr>
      <Feed posts={posts} />
    </div>
  );
}

export default App;
