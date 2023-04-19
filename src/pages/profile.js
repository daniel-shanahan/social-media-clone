import {useCollectionData, useDocumentData} from 'react-firebase-hooks/firestore';
import { useParams } from 'react-router-dom';

import FollowUnfollowButton from '../FollowUnfollowButton';
import Post from '../Post';
import { useState } from 'react';
import UserList from '../UserList';

function ProfileTabs({ selectedTab, setSelectedTab }) {
  return (
    <div className="mt-4 flex border-2 border-gray-200 shadow-sm">
      {selectedTab === 'Posts' 
                  ? <button className="button-bar-button bg-gray-100 border-r-2">Posts</button>
                  : <button className="button-bar-button" onClick={e => setSelectedTab('Posts')}>Posts</button>}
      {selectedTab === 'Followers' 
                  ? <button className="button-bar-button bg-gray-100 border-x-2">Followers</button>
                  : <button className="button-bar-button" onClick={e => setSelectedTab('Followers')}>Followers</button>}
      {selectedTab === 'Following' 
                  ? <button className="button-bar-button bg-gray-100 border-l-2">Following</button>
                  : <button className="button-bar-button" onClick={e => setSelectedTab('Following')}>Following</button>}
    </div>
  );
};

export default function Profile({ props }) {
  const { auth, db, getDetailsFromUID } = props;
  const { uid: profileUID } = useParams();
  const [selectedTab, setSelectedTab] = useState('Posts');
  const { displayName, photoURL } = getDetailsFromUID(profileUID);

  const currentUID = auth.currentUser.uid;
  
  const postsRef = db.collection('posts');
  const postsQuery = postsRef.where('uid', '==', profileUID).orderBy('createdAt').limit(25);
  const [posts] = useCollectionData(postsQuery, {initialValue: []});

  const profileUserRef = db.collection('users').doc(profileUID);
  const [profileUser] = useDocumentData(profileUserRef, {initialValue: {following: [], followers: []}});
  const { followers, following } = profileUser;

  return (
    <div className="content">
      <div className="content-item">
        <div className='flex gap-4'>
          <img src={photoURL} alt='Profile' className='w-2/5 rounded-lg shadow-sm' referrerPolicy="no-referrer"/>
          <div className='flex flex-col font-semibold gap-2'>
            <p className="text-2xl text-gray-600 align-top">{displayName}</p>
            <FollowUnfollowButton props={{db, currentUID, profileUID, followers, profileUserRef}} />
          </div>
        </div>
        <ProfileTabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      </div>
      {selectedTab === 'Posts' && posts && posts.map(post => <Post key={post.id} props={{post, auth, postsRef, getDetailsFromUID}} /> )}
      {selectedTab === 'Followers' && <UserList uids={followers} getDetailsFromUID={getDetailsFromUID} />}
      {selectedTab === 'Following' && <UserList uids={following} getDetailsFromUID={getDetailsFromUID} />}
    </div>
  );
}