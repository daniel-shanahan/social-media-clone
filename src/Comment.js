import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Comment({ props }) {
  const { comment, auth, commentsRef, getDetailsFromUID } = props;
  const { text, uid, id } = comment;
  const { displayName, photoURL } = getDetailsFromUID(uid);

  const isUserPost = uid === auth.currentUser.uid;

  return (
    <div className='bg-gray-200 p-2 rounded-sm'>
      <img src={photoURL} alt='Profile' className='h-10 w-10 mr-3 rounded-full inline' referrerPolicy="no-referrer"></img>
      <div className="font-semibold text-gray-600">{displayName}</div>
      <p>{text}</p>
      {isUserPost &&
        <button
          className="mt-1 float-right"
          onClick={e => commentsRef.doc(id).delete()}>
          <FontAwesomeIcon icon="trash" color="darkred" />
        </button>}
    </div>
  );
}

export default Comment;