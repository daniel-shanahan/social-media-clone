import { useState } from "react";

import firebase from 'firebase/compat/app';

function SubmitButton({ newPostText }) {
    if (newPostText === '') {
        return null;
    }
    return (
        <button 
            type="submit"
            className="bg-blue-500 text-white font-semibold block float-right rounded-3xl px-5 py-1">
            Post
        </button>
    );
};

export default function NewPost({ props }) {
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

    return (
        <div className='content-item'>
            <form onSubmit={handleSubmit}>
                <textarea
                    placeholder="Start a post"
                    onChange={event => setNewPostText(event.target.value)}
                    value={newPostText}
                    className="text-input">
                </textarea>
                <SubmitButton newPostText={newPostText} />
            </form>
        </div>
    );
}