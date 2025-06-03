import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const { targetUserId } = useParams();

  const socket = createSocketConnection();

  const user = useSelector((store) => store.user);

  const userId = user?._id;

  const sendMessage = () => {
    socket.emit("sendMessage", {
      firstName: user?.firstName,
      userId,
      targetUserId,
      text: newMessage,
    });

    setNewMessage("");
  };

  useEffect(() => {
    if (!userId) return;

    socket.emit("joinChat", {
      firstName: user.firstName,
      userId,
      targetUserId,
    });

    socket.on("messageReceived", ({ firstName, text, _id }) => {
      setMessages((prev) => [...prev, { firstName, text, _id }]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  return (
    <div>
      <div className="border border-gray-600 w-3/4 mx-auto m-5 h-[70vh] flex flex-col">
        <h1 className="p-5 border border-gray-600">Chat</h1>

        <div className="flex-1 overflow-y-scroll p-5">
          {messages.length > 0 &&
            messages?.map((msg, index) => {
              return (
                <div key={index} className="chat chat-start">
                  <div className="chat-header">
                    {userId === msg._id ? "You" : msg.firstName}
                    <time className="text-xs opacity-50">2 hours ago</time>
                  </div>
                  <div className="chat-bubble">{msg.text}</div>
                </div>
              );
            })}
        </div>
        <div className="p-5 border-t border-gray-600 flex gap-2 items-center">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 border border-gray-500 text-white rounded p-2"
          />
          <button className="btn btn-secondary" onClick={sendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
