import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Entry from './Entry';

function Comment({ props }) {
  const { comment, auth, commentsRef, getDetailsFromUID } = props;
  const { text, uid, id } = comment;

  const isUserPost = uid === auth.currentUser.uid;

  return (
    <div className='bg-gray-200 p-4 rounded-md'>
      <Entry props={{uid, getDetailsFromUID, text}} />
      {isUserPost &&
        <button
          className="mt-1 float-right"
          onClick={e => commentsRef.doc(id).delete()}>
          <FontAwesomeIcon icon="trash" color="crimson" />
        </button>}
    </div>
  );
}

export default Comment;