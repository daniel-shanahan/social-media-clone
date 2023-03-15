function SignIn({ props }) {
  const {firebase, auth, db} = props;

  const signInWithGoogle = async() => {
    const provider = new firebase.auth.GoogleAuthProvider();
    await auth.signInWithPopup(provider);

    const { uid, photoURL, displayName } = auth.currentUser;
    await db.collection("users").doc(uid).set({ uid, photoURL, displayName });
  };

  return (
    <div className="bg-gray-50 h-full flex flex-col items-center gap-32">
      <h1 className="text-blue-500 font-semibold text-5xl text-center flex-wrap">Join the conversation on Connector!</h1>
      <button 
        className="bg-blue-500 text-white px-6 py-3 rounded-full font-semibold"
        onClick={signInWithGoogle}>
        Sign in with Google
      </button>
    </div>
  );
}

export default SignIn;