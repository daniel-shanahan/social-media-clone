import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import firebase from 'firebase/compat/app';

import NewComment from "./NewComment";
import Comment from "./Comment";
import ButtonBar from "./ButtonBar";
import { useCollectionData } from 'react-firebase-hooks/firestore';

function Post({ props }) {
    const { post, auth, postsRef, getDetailsFromUID } = props;
    const { text, uid, id, likes } = post;
    const { displayName, photoURL } = getDetailsFromUID(uid);

    const [showNewComment, setShowNewComment] = useState(false);

    const isUserPost = uid === auth.currentUser.uid;
    const postRef = postsRef.doc(id);
    const commentsRef = postRef.collection('comments');
    const query = commentsRef.orderBy('createdAt');
    const [comments] = useCollectionData(query, {idField: 'id'});


    const handleClickLike = async(e) => {
        const currentUserID = auth.currentUser.uid;

        const updatedLikes = likes.includes(currentUserID) 
                                ? likes.filter(uid => uid !== currentUserID)
                                : [...likes, currentUserID];
        
        await postRef.set({
            likes: updatedLikes
        }, { merge: true });
    };

    const addNewComment = async(commentText) => {
        const newCommentRef = postRef.collection('comments').doc();

        await newCommentRef.set({
            text: commentText,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            uid: auth.currentUser.uid,
            id: newCommentRef.id
        });

        setShowNewComment(false);
    };

    const handleClickDelete = e => {
        // Delete all comments within the post.
        comments.map(comment => commentsRef.doc(comment.id).delete());
        
        // Delete post.
        postRef.delete();
    };

    const getCommentProps = comment => {
        return {
            comment: comment,
            auth: auth,
            commentsRef: commentsRef,
            getDetailsFromUID
        };
    };

    return (
        <div className='feed-item'>
            <img src={photoURL} alt='Profile' className='h-10 w-10 mr-3 rounded-full inline' referrerPolicy="no-referrer"></img>
            <p className="font-semibold text-gray-600 inline">{displayName}</p>
            <p className="mt-3 mb-3">{text}</p>
            {likes.length > 0 && 
                <div>
                    <FontAwesomeIcon icon="thumbs-up" color="blue"/>
                    <p className="inline pl-2">{likes.length}</p>
                </div>}
            <hr className='h-0 my-1 border-b-2 border-b-gray-100'></hr>
            <ButtonBar handleClickComment={e => setShowNewComment(!showNewComment)} handleClickLike={handleClickLike} />
            {showNewComment && <NewComment addNewComment={addNewComment}/>}
            <div className="flex flex-col gap-4 mt-1">
                {comments && comments.map(comment => <Comment key={comment.id} props={getCommentProps(comment)} />)}
            </div>
            {isUserPost && 
                <button
                    className="mt-2 float-right"
                    onClick={handleClickDelete}>
                    <FontAwesomeIcon icon="trash" color="darkred" />
                </button>}
        </div>
    );
}

export default Post;