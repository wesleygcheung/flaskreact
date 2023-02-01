import { useOutletContext, useNavigate } from "react-router-dom"
import { useEffect } from "react";

const Profile = () => {
    const context = useOutletContext()
    const navigate = useNavigate()
    const localStorageUser = JSON.parse(localStorage.getItem('user'));
    useEffect(() => {
        if (localStorageUser == null){
            navigate("/")
        }
      },[localStorageUser])
    return (
        <>
            {localStorageUser !== null ? 
                <div className="grid-container">
                    <div className="grid-sub-container">
                        <h1>Welcome, {localStorageUser.displayName}</h1>
                    </div>
                </div>
                :
                null
            }
        </>
    );
};

export default Profile;