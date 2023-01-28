import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NoPage = () => {
  const navigate = useNavigate()
  useEffect(() => {
    setTimeout(() => {
      navigate("/")
    }, 2000)
  },[])
  return <h1>Not Found</h1>;
};
  
export default NoPage;