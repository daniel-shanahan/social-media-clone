import { useState } from "react";
import NewComment from "./NewComment";

function Post({ post }) {
    const [comments, setComments] = useState([]);
    const [commentId, setCommentId] = useState(0);
    const [hasNewComment, setHasNewComment] = useState(false);

    const addNewComment = commentText => {
        setComments(
            [
                ...comments,
                {
                    id: commentId,
                    user: 'default user',
                    text: commentText
                }
            ]
        );

        setCommentId(cid => cid + 1);
        setHasNewComment(false);
    };

    const handleClick = () => {
        if (!hasNewComment) {
            setHasNewComment(true);
        }
    }

    const newComment = (() => {
        if (hasNewComment === true) {
            return (
                <NewComment addNewComment={addNewComment}/>
            );
        }
    })();

    const postComments = comments.map(comment => {
        return (
            <div key={comment.id} className='bg-gray-200 p-2 rounded-sm'>
                <div className="font-semibold text-gray-600">{comment.user}</div>
                <p>{comment.text}</p>
            </div>
        );
    });

    return (
        <div key={post.id} className='feed-item'>
            <div className="font-semibold text-gray-600">{post.user}</div>
            <p className="mt-3 mb-3">{post.text}</p>
            <hr className='h-0 my-1 border-b-2 border-b-gray-100'></hr>
            <div className="block">
                <button 
                    className="py-3 px-10 font-semibold rounded-sm text-gray-500 hover:bg-gray-200"
                    onClick={handleClick}>
                    Comment
                </button>
            </div>
            {newComment}
            <div className="flex flex-col gap-4 ">
                {postComments}
            </div>
        </div>
    );
}

export default Post;