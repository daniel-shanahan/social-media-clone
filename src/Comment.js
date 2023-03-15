import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Comment({ comment, deleteComment }) {
  const handleClickDelete = e => {
    e.stopPropagation();
    
    deleteComment(comment.id);
  };

  return (
    <div className='bg-gray-200 p-2 rounded-sm'>
      <div className="font-semibold text-gray-600">{comment.user}</div>
      <p>{comment.text}</p>
      <button
        className="mt-1 float-right"
        onClick={handleClickDelete}>
        <FontAwesomeIcon icon="trash" color="darkred" />
      </button>
    </div>
  );
}

export default Comment;