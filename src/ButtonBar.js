import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function ButtonBar({ handleClickComment, handleClickLike }) {
  return (
    <div className="flex">
      <button 
        className="flex-1 py-3 font-semibold rounded-sm text-gray-500 hover:bg-gray-200"
        onClick={handleClickLike}>
          <FontAwesomeIcon icon="thumbs-up" className="pr-4"/>
        Like
      </button>
      <button 
        className="flex-1 py-3 font-semibold rounded-sm text-gray-500 hover:bg-gray-200"
        onClick={handleClickComment}>
          <FontAwesomeIcon icon="comment" className="pr-4"/>
        Comment
      </button>
    </div>
  );
};

export default ButtonBar;