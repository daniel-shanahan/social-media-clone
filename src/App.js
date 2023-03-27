/* FontAwesome */
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrash, faComment, faThumbsUp, faShareNodes } from "@fortawesome/free-solid-svg-icons";

/* Firebase */
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import {useAuthState} from 'react-firebase-hooks/auth';

import Feed from './Feed';
import SignIn from "./SignIn";


// FontAwesome
library.add(faTrash, faComment, faThumbsUp, faShareNodes);

// Firebase
firebase.initializeApp({
  apiKey: "AIzaSyBvMOmAbtS7BoIJOfoKoWR692xL8GVWKSU",
  authDomain: "social-media-clone-322b4.firebaseapp.com",
  projectId: "social-media-clone-322b4",
  storageBucket: "social-media-clone-322b4.appspot.com",
  messagingSenderId: "285331149861",
  appId: "1:285331149861:web:d9fd737d0e62dc16fedbcc",
  measurementId: "G-XR57LM88NP"
});

const auth = firebase.auth();
const db = firebase.firestore();


function App() {
  const [user] = useAuthState(auth);
  const feedProps = {
    auth: auth,
    db: db
  };

  const signInProps = {
    firebase: firebase,
    auth: auth,
    db: db
  };

  return (
    user ? <Feed props={feedProps} /> : <SignIn props={signInProps} />
  );
}

export default App;
