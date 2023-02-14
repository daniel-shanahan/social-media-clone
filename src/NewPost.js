import { useState } from "react";

function NewPost({ addNewPost }) {
    const [newPostText, setNewPostText] = useState('');

    const handleSubmit = event => {
        event.preventDefault();

        addNewPost(newPostText);
        setNewPostText('');
      };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <textarea
                    placeholder="Start a post"
                    onChange={event => setNewPostText(event.target.value)}
                    value={newPostText}>
                </textarea>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default NewPost;