import { useState } from "react";

import firebase from 'firebase/compat/app';

function NewPost({ props }) {
    const { auth, postsRef } = props;
    const [newPostText, setNewPostText] = useState('');

    const handleSubmit = async(event) => {
        event.preventDefault();

        const newPostRef = postsRef.doc();

        await newPostRef.set({
            text: newPostText,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            uid: auth.currentUser.uid,
            id: newPostRef.id,
            likes: []
        });

        setNewPostText('');
      };

    const submitButton = (() => {
        if (newPostText === '') {
            return (
                <button 
                    type="submit"
                    className="text-gray-400 bg-gray-200 font-semibold block float-right rounded-3xl px-5 py-1"
                    disabled>
                    Post
                </button>
            );
        }
        return (
            <button 
                type="submit"
                className="bg-blue-500 text-white font-semibold block float-right rounded-3xl px-5 py-1">
                Post
            </button>
        );
    })();

    return (
        <div className='feed-item'>
            <form onSubmit={handleSubmit}>
                <textarea
                    placeholder="Start a post"
                    onChange={event => setNewPostText(event.target.value)}
                    value={newPostText}
                    className="text-input">
                </textarea>
                {submitButton}
            </form>
        </div>
    );
}

export default NewPost;