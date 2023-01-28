import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NoPage = () => {
  const navigate = useNavigate()
  useEffect(() => {
    setTimeout(() => {
      navigate("/")
    }, 2000)
  },[])
  return (
    <div className="grid-container">
      <h1>Not Found</h1>
    </div>
  )
  ;
};
  
export default NoPage;