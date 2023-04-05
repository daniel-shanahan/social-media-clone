import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function ButtonBar({ handleClickComment, handleClickLike }) {
  return (
    <div className="flex">
      <button 
        className="button-bar-button"
        onClick={handleClickLike}>
          <FontAwesomeIcon icon="thumbs-up" className="pr-4"/>
        Like
      </button>
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