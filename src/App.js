import { useState } from 'react';
import NewPost from './NewPost';
import Feed from './Feed';

const USERNAME = 'Daniel Shanahan';

function App() {
  const [posts, setPosts] = useState([]);
  const [postId, setPostId] = useState(0);

  const addNewPost = (newPostText) => {
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
    <div>
      <NewPost addNewPost={addNewPost} />
      <Feed posts={posts} />
    </div>
  );
}

export default App;
