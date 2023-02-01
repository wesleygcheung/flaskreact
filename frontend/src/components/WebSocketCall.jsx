import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom"

export default function WebSocketCall({ socket }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const context = useOutletContext()

  const handleText = (e) => {
    const inputMessage = e.target.value;
    setMessage(inputMessage);
  };

  const handleSubmit = () => {
    if (!message) {
      return;
    }
    socket.emit("data", [message, context.user]);
    setMessage("");
  };

  useEffect(() => {
    socket.on("data", (data) => {
      console.log(data);
      setMessages([...messages, data.displayName+": "+data.data]);
    });
    return () => {
      socket.off("data", () => {
        console.log("data event was removed");
      });
    };
  }, [socket, messages]);

  return (
    <div>
      <h2>WebSocket Communication</h2>
      <input type="text" value={message} onChange={handleText} />
      <button onClick={handleSubmit}>submit</button>
      <ul>
        {messages.map((message, ind) => {
          return <li key={ind}>{message}</li>;
        })}
      </ul>
    </div>
  );
}