import { useOutletContext } from "react-router-dom"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const context = useOutletContext()
    const navigate = useNavigate()
    useEffect(() => {
        if (context.user == null){
            navigate("/")
        }
      },[context])
    return (
        <>
            {context.user !== null ? 
                <div className="grid-container">
                    <div className="grid-sub-container">
                        <h1>Welcome, {context.user.displayName}</h1>
                    </div>
                </div>
                :
                null
            }
        </>
    );
};

export default Profile;