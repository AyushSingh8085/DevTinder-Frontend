import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const { targetUserId } = useParams();

  const socket = createSocketConnection();

  const user = useSelector((store) => store.user);

  const userId = user?._id;

  const fetchChatMessages = async () => {
    try {
      const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {
        withCredentials: true,
      });

      const chatMessages = chat?.data?.messages.map((msg) => {
        const { senderId, text, createdAt } = msg;

        return {
          firstName: senderId?.firstName,
          lastName: senderId?.lastName,
          text,
          createdAt,
          _id: senderId?._id,
        };
      });

      setMessages(chatMessages);
    } catch (error) {
      console.log(error);
    }
  };

  const sendMessage = () => {
    if (!userId || !socket) return;

    socket.emit("sendMessage", {
      firstName: user?.firstName,
      lastName: user?.lastName,
      userId,
      targetUserId,
      text: newMessage,
    });

    setNewMessage("");
  };

  useEffect(() => {
    if (!userId || !socket) return;

    socket.emit("joinChat", {
      firstName: user.firstName,
      lastName: user.lastName,
      userId,
      targetUserId,
    });

    socket.on(
      "messageReceived",
      ({ firstName, lastName, text, _id, timeStamp }) => {
        setMessages((prev) => [
          ...prev,
          { firstName, lastName, text, _id, createdAt: timeStamp },
        ]);
      }
    );

    return () => {
      socket.disconnect();
    };
  }, [socket, userId, targetUserId]);

  useEffect(() => {
    fetchChatMessages();
  }, []);

  if (!user || !userId) {
    return <div className="text-center p-10">Loading chat...</div>;
  }

  return (
    <div>
      <div className="border border-gray-600 w-3/4 mx-auto m-5 h-[70vh] flex flex-col">
        <h1 className="p-5 border border-gray-600">Chat</h1>

        <div className="flex-1 overflow-y-scroll p-5">
          {messages.length > 0 &&
            messages?.map((msg, index) => {
              return (
                <div
                  key={index}
                  className={`chat ${
                    userId === msg._id ? "chat-end" : "chat-start"
                  }`}
                >
                  <div className="chat-header">
                    {userId === msg._id
                      ? "You"
                      : `${msg.firstName} ${msg.lastName}`}
                    <time className="text-xs opacity-50">
                      {new Date(msg.createdAt).toDateString()}
                    </time>
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
