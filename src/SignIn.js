import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function SignIn({ props }) {
  const {firebase, auth, db} = props;

  const signInWithGoogle = async() => {
    const provider = new firebase.auth.GoogleAuthProvider();
    await auth.signInWithPopup(provider);

    const { uid, photoURL, displayName } = auth.currentUser;
    await db.collection("users").doc(uid).set({ uid, photoURL, displayName });
  };

  return (
    <div className='bg-gray-50 h-screen flex items-center justify-center'>
      <div className="w-[500px] flex flex-col items-center gap-28">
        <div className='text-blue-500 font-semibold text-3xl text-center'>
          <FontAwesomeIcon icon='share-nodes' className='px-1' />
          <h1 className='inline'>Connector</h1>
        </div>
        <p className="text-gray-900 text-4xl text-center">
          Connect with <p className='font-semibold inline'>friends</p> and the <p className='font-semibold inline'>world</p> around you.
        </p>
        <button 
          className="bg-blue-500 text-white px-6 py-3 rounded-full font-semibold"
          onClick={signInWithGoogle}>
          Sign in with Google
        </button>
      </div>
    </div>
  );
}

export default SignIn;