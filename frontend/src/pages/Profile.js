import { useOutletContext, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import axios from 'axios';

const Profile = () => {
    const api_url = window.location.hostname === 'localhost' ? "http://localhost:5000/" : "https://tastingroom.herokuapp.com";
    const context = useOutletContext()
    const navigate = useNavigate()
    const [userProfile, setUserProfile] = useState(null)

    useEffect(() => {
        if (context.user == null){
            navigate("/")
        } else {
            const cancelToken = axios.CancelToken.source()
            axios.post(api_url+'/API/profile', { hello: 'world' }, {
                headers: {
                    'Authorization': `${context.user.accessToken}`
                },
                cancelToken: cancelToken.token
                })
                .then(response => {
                    console.log(response);
                    setUserProfile(response.data.data)
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
        }
      },[context.user])

    return (
        <>
            {!!userProfile && 
                <div className="grid-container">
                    <div className="grid-sub-container">
                        <h1>Welcome, {userProfile.name}</h1>
                        <h2>Name: {userProfile.name}</h2>
                        <h2>Email: {userProfile.email}</h2>
                        <h2>Unique ID: {userProfile.uid}</h2>
                    </div>
                </div>
            }
        </>
    );
};

export default Profile;