import "./App.css";
import HttpCall from "./components/HttpCall";
import Navbar from "./components/Navbar";
import Socket from "./components/Socket";

function App() {
  const api_url = window.location.hostname === 'localhost' ? "http://localhost:5000/" : "https://tastingroom.herokuapp.com";

  return (
    <div className="App">
      <Navbar apiUrl={api_url} />
      <h1>React/Flask App + socket.io</h1>
      <div className="line">
        <HttpCall />
      </div>
      <Socket apiUrl={api_url}/>
    </div>
  );
}

export default App;