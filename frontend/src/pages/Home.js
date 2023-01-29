import HttpCall from "../components/HttpCall";
import Socket from "../components/Socket";

const Home = () => {
  const api_url = window.location.hostname === 'localhost' ? "http://localhost:5000/" : "https://tastingroom.herokuapp.com";
  
  return (
    <div className="grid-container">
      <div className="grid-sub-container">
        <h1>React/Flask App with Socket.IO and Firebase auth</h1>
        <div className="line">
          <HttpCall />
        </div>
        <Socket apiUrl={api_url}/>
      </div>
    </div>
  );
};
  
export default Home;