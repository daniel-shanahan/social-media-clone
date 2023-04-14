/* FontAwesome */
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrash, faComment, faThumbsUp, faHouse, faUser, faRightFromBracket, faPlus } from "@fortawesome/free-solid-svg-icons";

/* Firebase */
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import {useAuthState} from 'react-firebase-hooks/auth';
import {useCollectionData} from 'react-firebase-hooks/firestore';

import { Routes, Route } from "react-router-dom";

/* Components */
import TopBar from './TopBar';
import SignIn from "./SignIn";
import Feed from './pages/feed';
import Profile from "./pages/profile";


// FontAwesome
library.add(faTrash, faComment, faThumbsUp, faHouse, faUser, faRightFromBracket, faPlus);

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
  const [users] = useCollectionData(db.collection('users'), {idField: 'id'});
  
  const getDetailsFromUID = (uid = auth.currentUser.uid) => {
    const [postedBy] = users.filter(user => user.uid === uid);

    return {
      displayName: postedBy.displayName,
      photoURL: postedBy.photoURL
    };
  };

  return (
    user 
      ? (
        <>
          <TopBar auth={auth}/>
          <Routes>
            <Route exact path='/' element={<Feed props={{auth, db, getDetailsFromUID}} />} />
            <Route path='/feed' element={<Feed props={{auth, db, getDetailsFromUID}} />} />
            <Route path='/profile/:uid' element={<Profile props={{auth, db, getDetailsFromUID}}/>} />
          </Routes>
        </>
        ) 
      : <SignIn props={{firebase, auth, db}} />
  );
}

export default App;
