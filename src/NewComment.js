import { useState } from "react";

function NewComment({ addNewComment }) {
    const [commentText, setCommentText] = useState('');

    const handleSubmit = event => {
        event.preventDefault();

        addNewComment(commentText);
        setCommentText('');
    };

    const submitButton = (() => {
        if (commentText === '') {
            return (
                <button 
                    type="submit"
                    hidden
                    disabled>
                    Post
                </button>
            );
        }
        return (
            <button 
                type="submit"
                className="bg-blue-500 text-white font-semibold rounded-3xl px-5 py-1">
                Post
            </button>
        );
    })();

    return (
        <div className="mb-4 text-right">
            <form onSubmit={handleSubmit}>
                <textarea
                    placeholder="Add a comment"
                    onChange={event => setCommentText(event.target.value)}
                    value={commentText}
                    className='text-input mt-2'>
                </textarea>
                {submitButton}
            </form>
        </div>
    );
}

export default NewComment;