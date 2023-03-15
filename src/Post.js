import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
/*import NewComment from "./NewComment";
import Comment from "./Comment";*/
import ButtonBar from "./ButtonBar";

function Post({ props }) {
    const { post, auth, postsRef, displayName, photoURL } = props;
    const { text, uid, id, likes } = post;

    const isUserPost = uid === auth.currentUser.uid;

    const showLikes = (() => {
        if (likes.length > 0) {
            return (
                <div>
                    <FontAwesomeIcon icon="thumbs-up" color="blue"/>
                    <p className="inline pl-2">{likes.length}</p>
                </div>
            );
        }
    })();

    const handleClickLike = async(event) => {
        const currentUserID = auth.currentUser.uid;

        const updatedLikes = likes.includes(currentUserID) 
                                ? likes.filter(uid => uid !== currentUserID)
                                : [...likes, currentUserID];
        
        await postsRef.doc(id).set({
            likes: updatedLikes
        }, { merge: true });
    };

    const handleClickComment = async(event) => {

    };

    /*const newComment = (() => {
        if (hasNewComment === true) {
            return <NewComment addNewComment={addNewComment}/>;
        }
    })();

    const postComments = comments.map(comment => {
        return (
            <Comment key={comment.id} comment={comment} deleteComment={deleteComment} />
        );
    }); */

    return (
        <div className='feed-item'>
            <img src={photoURL} alt='Profile' className='h-10 w-10 mr-3 rounded-full inline' referrerPolicy="no-referrer"></img>
            <p className="font-semibold text-gray-600 inline">{displayName}</p>
            <p className="mt-3 mb-3">{text}</p>
            {showLikes}
            <hr className='h-0 my-1 border-b-2 border-b-gray-100'></hr>
            <ButtonBar handleClickComment={handleClickComment} handleClickLike={handleClickLike} />
            {/* {newComment}
            <div className="flex flex-col gap-4 mt-1">
                {postComments}
            </div> */}
            {isUserPost && 
                <button
                    className="mt-2 float-right"
                    onClick={e => postsRef.doc(id).delete()}>
                    <FontAwesomeIcon icon="trash" color="darkred" />
                </button>}
        </div>
    );
}

export default Post;