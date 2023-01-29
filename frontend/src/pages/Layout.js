import { Outlet, Link } from "react-router-dom";
import React, { useState } from 'react';
import { onAuthStateChanged, signOut, signInWithRedirect, getRedirectResult } from "firebase/auth";
import {auth, provider} from '../components/Auth';
import axios from 'axios';
import '../App.css';

const Layout = () => {
  const api_url = window.location.hostname === 'localhost' ? "http://localhost:5000/" : "https://tastingroom.herokuapp.com";
  const [getUserAuth,setUserAuth] = useState(null);

  onAuthStateChanged(auth, user => {
      if(user !== null) {
          setUserAuth(user);
          console.log('onAuthStageChanged: Auth');
          console.log(user);
          const cancelToken = axios.CancelToken.source()
          axios.post(api_url+'/API/authenticate', { hello: 'world' }, {
              headers: {
                'Authorization': `${user.accessToken}`
              },
              cancelToken: cancelToken.token
            })
              .then(response => {
                  console.log(response);
              })
              .catch(error => {
                  if(axios.isCancel(error)){
                      console.log("Cancelled");
                  } else {
                      console.log(error);
                  };
              });
          return () => {
              cancelToken.cancel()
          };
      } else {
          console.log('onAuthStageChanged: No Auth');
          setUserAuth(null);
      }
  });

  const handleClick = () => {
      signInWithRedirect(auth, provider);
  }

  // getRedirectResult(auth)
  // .then((result) => {
  //     // This gives you a Google Access Token. You can use it to access Google APIs.
  //     // const credential = GoogleAuthProvider.credentialFromResult(result);
  //     // const token = credential.accessToken;

  //     console.log('getRedirectResult: Received');
  // }).catch((error) => {return});

  const logout = () => {signOut(auth).then(() => {
      // Sign-out successful.
      console.log('Signed Out');
      window.location.replace(api_url);
      }).catch((error) => {
      // An error happened.
      console.log(error);
  })};

  return (
    <>
      <div className='navbar'>
        <div className="navbar-left-links">
          <Link className="navbar-link-text" to="/"><h2>MyLogo</h2></Link>
        </div>
        <div className='navbar-center-links'>
          <Link className='navbar-links navbar-link-text' to="/">Home</Link>
          <Link className='navbar-links navbar-link-text' to="/about">About</Link>
          {getUserAuth!==null ? (
            <Link className='navbar-links navbar-link-text' to="/profile">Profile</Link>
          ): (null)
          }
        </div>
        <div className="navbar-right-links">
          {getUserAuth!==null ? (
            <>
              <Link to="/profile">
                <button className="profile-button" onClick={logout}>
                  <div className='profile-pic-container'>
                    <img referrerPolicy="no-referrer" className="profile-pic" src={getUserAuth.photoURL} alt=''></img>
                    <span className="display-name">{getUserAuth.displayName}</span>
                  </div>
                </button>
              </Link>
              {/* <button className="google-login" onClick={logout}>Sign out of Google</button> */}
            </>
          ) : (
              <button className="google-login" onClick={handleClick}>Sign in with Google</button>
          )}
        </div>
      </div>
      <Outlet context={{user: getUserAuth}}/>
    </>
  )
};
  
  export default Layout;