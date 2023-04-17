import { useDocumentData} from 'react-firebase-hooks/firestore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function FollowUnfollowButton({ props }) {  
  const { db, currentUID, profileUID, profileUser, profileUserRef } = props;

  const currentUserRef = db.collection('users').doc(currentUID);
  const [currentUser] = useDocumentData(currentUserRef, {initialValue: {following: []}});
  const { following } = currentUser;

  const handleClickFollow = e => {
    updateFollowers();
    updateFollowing();
  };

  const updateFollowers = async() => {
    const { followers } = profileUser;
    const updatedFollowers = followers.includes(currentUID) 
                              ? followers.filter(u => u !== currentUID)
                              : [...followers, currentUID];
    
    await profileUserRef.set({ followers: updatedFollowers }, { merge: true });
  };

  const updateFollowing = async() => {
    const updatedFollowing = following.includes(profileUID) 
                              ? following.filter(u => u !== profileUID)
                              : [...following, profileUID];
    
    await currentUserRef.set({ following: updatedFollowing }, { merge: true });
  };
  
  if (currentUID === profileUID) {
    return null;
  } else if (following.includes(profileUID)) {
    return (
      <button onClick={handleClickFollow} className='bg-red-500 text-white text-lg py-1 px-4 w-fit rounded-lg shadow-sm'>
        <FontAwesomeIcon icon='minus' className='pr-2' />
        Unfollow
      </button>
    );
  } else {
    return (
      <button onClick={handleClickFollow} className='bg-green-500 text-white text-lg py-1 px-4 w-fit rounded-lg shadow-md'>
        <FontAwesomeIcon icon='plus' className='pr-2' />
        Follow
      </button>
    );
  }
};