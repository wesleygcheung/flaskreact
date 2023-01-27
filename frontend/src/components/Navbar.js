import React, {useEffect, useState} from 'react';
import { onAuthStateChanged, signOut, signInWithRedirect, getRedirectResult } from "firebase/auth";
import {auth, provider} from './Auth';
import axios from 'axios';
import '../App.css';


const Navbar = ({apiUrl}) => {
    const [getUserAuth,setUserAuth] = useState(null);

    onAuthStateChanged(auth, user => {
        if(user !== null) {
            setUserAuth(user);
            console.log('onAuthStageChanged: Auth');
            const cancelToken = axios.CancelToken.source()
            axios.post(apiUrl+'API/authenticate', { hello: 'world' }, {
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
    getRedirectResult(auth)
    .then((result) => {
        // This gives you a Google Access Token. You can use it to access Google APIs.
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;

        // The signed-in user info.
        const user = result.user;
        console.log('getRedirectResult: Received');
        // setUserAuth(user);
        // axios.post(apiUrl+'API/authenticate', { hello: 'world' }, {
        //     headers: {
        //       'Authorization': `${user.accessToken}`
        //     }
        //   })
        //     .then(response => {
        //         console.log(response);
        //     })
        //     .catch(error => {
        //         console.log(error);
        //     });
        // console.log(credential);
        // console.log(token);
    }).catch((error) => {return});

    const logout = () => {signOut(auth).then(() => {
        // Sign-out successful.
        console.log('Signed Out');

        }).catch((error) => {
        // An error happened.
        console.log(error);
    })};
    return (
        <div className='navbar'>
            {getUserAuth!==null ?<div className='navbar-left-links'><button onClick={logout}>Sign Out</button></div>:
            <div className='navbar-right-links'>
                <button className="google-login" onClick={handleClick}>Sign in with Google</button>
            </div>}

        </div>
    );
}

export default Navbar