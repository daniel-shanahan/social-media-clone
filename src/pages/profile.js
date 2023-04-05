function Profile({ props }) {
  const { auth, db, uid, getDetailsFromUID } = props;
  const { displayName, photoURL } = getDetailsFromUID(uid);

  return (
    <div className="content">
      <div className="content-item">
        <img src={photoURL} alt='Profile' className='mr-4 rounded-lg inline' referrerPolicy="no-referrer"/>
        <p className="text-2xl font-semibold text-gray-600 align-top inline">{displayName}</p>
      </div>
      <div className="content-item">
        <div className="flex">
          <button className="button-bar-button">Posts</button>
          <button className="button-bar-button">Followers</button>
          <button className="button-bar-button">Following</button>
        </div>
        <div className="flex flex-col border-t-2">

        </div>
      </div>
    </div>
  );
}

export default Profile;