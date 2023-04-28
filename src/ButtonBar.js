import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function ButtonBar({ handleClickComment, handleClickLike, isLiked }) {
  return (
    <div className="flex">
      {isLiked 
        ? <button 
            className="button-bar-button text-blue-500"
            onClick={handleClickLike}>
              <FontAwesomeIcon icon="thumbs-up" className="pr-4" color='#3b82f6'/>
            Like
          </button>
        : <button 
            className="button-bar-button"
            onClick={handleClickLike}>
              <FontAwesomeIcon icon="thumbs-up" className="pr-4"/>
            Like
          </button>}
      <button 
        className="button-bar-button"
        onClick={handleClickComment}>
          <FontAwesomeIcon icon="comment" className="pr-4"/>
        Comment
      </button>
    </div>
  );
};

export default ButtonBar;