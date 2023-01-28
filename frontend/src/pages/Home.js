import HttpCall from "../components/HttpCall";
import Socket from "../components/Socket";
import { useOutletContext } from "react-router-dom"

const Home = () => {
  const api_url = window.location.hostname === 'localhost' ? "http://localhost:5000/" : "https://tastingroom.herokuapp.com";
  const context = useOutletContext()
  console.log(context)

  return (
  <div className="App">
    <h1>React/Flask App + socket.io {context.user !==null ? context.user.displayName : null}</h1>
    <div className="line">
      <HttpCall />
    </div>
    <Socket apiUrl={api_url}/>
  </div>
  );
};
  
  export default Home;