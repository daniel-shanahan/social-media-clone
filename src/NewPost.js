import { useState } from "react";

function NewPost({ addNewPost }) {
    const [newPostText, setNewPostText] = useState('');

    const handleSubmit = event => {
        event.preventDefault();

        addNewPost(newPostText);
        setNewPostText('');
      };

    return (
        <div className='feed-item'>
            <form onSubmit={handleSubmit}>
                <textarea
                    placeholder="Start a post"
                    onChange={event => setNewPostText(event.target.value)}
                    value={newPostText}
                    className="min-w-full min-h-fit rounded-sm mb-2">
                </textarea>
                <button 
                    type="submit"
                    className="bg-blue-500 text-white font-semibold block float-right rounded-3xl px-5 py-1">
                    Post
                </button>
            </form>
        </div>
    );
}

export default NewPost;