function SignIn({ props }) {
  const {firebase, auth, db} = props;

  const signInWithGoogle = async() => {
    const provider = new firebase.auth.GoogleAuthProvider();
    await auth.signInWithPopup(provider);

    const { uid, photoURL, displayName } = auth.currentUser;
    const userRef = db.collection('users').doc(uid);
    userRef.get().then(async(doc) => {
      if(doc.exists) {
        // Update name and photo if there have been changes.
        await userRef.set({photoURL, displayName}, {merge: true});
      } else {
        // Create new user entry.
        await userRef.set({ uid, photoURL, displayName, followers: [], following: [] });
      }
    }).catch(error => {
      console.log('Error getting user information:', error);
    });
  };

  return (
    <div className='bg-gray-50 h-screen flex items-center justify-center'>
      <div className=" w-4/5 sm:w-[500px] flex flex-col items-center gap-24">
        <h1 className='text-blue-500 font-semibold text-5xl'>Connector</h1>
        <p className="text-gray-900 text-4xl text-center">
          Connect with <b className='font-semibold inline'>friends</b> and the <b className='font-semibold inline'>world</b> around you.
        </p>
        <button 
          className="bg-blue-500 text-white text-lg px-6 py-3 rounded-full font-semibold"
          onClick={signInWithGoogle}>
          Sign in with Google
        </button>
      </div>
    </div>
  );
}

export default SignIn;