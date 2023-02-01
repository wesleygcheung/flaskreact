import { Outlet, Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut, signInWithRedirect } from "firebase/auth";
import {auth, provider} from '../components/Auth';
import axios from 'axios';
import '../App.css';
import { useSelector } from "react-redux";


const Layout = () => {
  const api_url = window.location.hostname === 'localhost' ? "http://localhost:5000" : "https://tastingroom.herokuapp.com";
  // State for tracking firebase auth
  const [localUser, setLocalUser] = useState(null);
  const navigate = useNavigate()
  // Retrieve state from reducers
  const state = useSelector((state)=>
    state
  );

  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
        if(user !== null) {
            // setUserAuth(user);
            console.log('onAuthStageChanged: Auth');
            setLocalUser(user);
            localStorage.setItem('user',JSON.stringify(user));
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
            // setUserAuth(null);
        }
    });

  },[localUser])

  // Firebase auth via redirect
  const handleClick = () => {
      signInWithRedirect(auth, provider);
  }
  // Firebase auth sign out
  const logout = () => {signOut(auth).then(() => {
      // Remove user info from state and local storage, then redirect to home
      setLocalUser(null);
      localStorage.removeItem('user');
      navigate("/")
      }).catch((error) => {
      console.log({error});
  })};

  return (
    <>
      <div className={state.authReducer.menuColored === 'dark' ? 'navbar-dark':'navbar'}>
        <div className="navbar-left-links">
          <Link className="navbar-link-text" to="/"><h2>MyLogo</h2></Link>
        </div>
        <div className='navbar-center-links'>
          <Link className='navbar-links navbar-link-text' to="/">Home</Link>
          <Link className='navbar-links navbar-link-text' to="/about">About</Link>
          {!!localUser && (
            <Link className='navbar-links navbar-link-text' to="/profile">Profile</Link>
          )
          }
        </div>
        <div className="navbar-right-links">
          {!!localUser ? (
            <>
                <button className="profile-button">
                  <div className='profile-pic-container'>
                    <img referrerPolicy="no-referrer" className="profile-pic" src={localUser.photoURL} alt=''></img>
                    <span className="display-name">{localUser.displayName}</span>
                    <i className="fa fa-bars burger"></i>
                  </div>
                </button>
                <div className='profile-pic-child-container'>
                  <Link to="/profile">Profile</Link><br></br>
                  <Link to="/" onClick={logout}>Sign Out</Link>
                </div>
            </>
          ) : (
              <button className="google-login" onClick={handleClick}>Sign in with Google</button>
          )}
        </div>
      </div>
      {/* Pass user data if logged in as context */}
      <Outlet context={{user: localUser}}/>
    </>
  )
};
  
  export default Layout;