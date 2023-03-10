import { initializeApp } from 'firebase/app';
import { getAuth,GoogleAuthProvider } from "firebase/auth";

const auth_domain = window.location.hostname === 'localhost' ? "flaskreact-2c53b.firebaseapp.com" : "tastingroom.herokuapp.com"

const firebaseConfig = {
    apiKey: "AIzaSyCm4Kn2kNenlE4TeNlmD9a79BVall5ujs0",
    authDomain: auth_domain,
    projectId: "flaskreact-2c53b",
    storageBucket: "flaskreact-2c53b.appspot.com",
    messagingSenderId: "113661173572",
    appId: "1:113661173572:web:6c3eca538b76f977094111",
    measurementId: "G-LZCFKVW456"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export {auth, provider};