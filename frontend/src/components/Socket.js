import React, {useEffect, useState} from 'react';
import WebSocketCall from "./WebSocketCall";
import { io } from "socket.io-client";
import '../App.css';
import { useOutletContext } from "react-router-dom"

const Socket = ({apiUrl}) => {
    const [socketInstance, setSocketInstance] = useState("");
    const [loading, setLoading] = useState(true);
    const [buttonStatus, setButtonStatus] = useState(false);
    const context = useOutletContext()

    const handleClick = () => {
      if (buttonStatus === false) {
        setButtonStatus(true);
      } else {
        setButtonStatus(false);
      }
    };

    useEffect(() => {
        if (buttonStatus === true) {
          const socket = io(apiUrl, {
            transports: ["websocket"],
            cors: {
              origin: "http://localhost:3000/",
            },
          });
    
          setSocketInstance(socket);
    
          socket.on("connect", (data) => {
            console.log(data);
          });
    
          setLoading(false);
    
          socket.on("disconnect", (data) => {
            console.log(data);
          });
    
          return function cleanup() {
            socket.disconnect();
          };
        }
      }, [buttonStatus]);

    return (
        <>
          {context.user!==null ? (
            <>
              {!buttonStatus ? (
                  <button onClick={handleClick}>turn chat on</button>
              ) : (
                  <>
                  <button onClick={handleClick}>turn chat off</button>
                  <div className="line">
                      {!loading && <WebSocketCall socket={socketInstance} />}
                  </div>
                  </>
              )}
            </>) : null
          }
        </>
    );
}

export default Socket