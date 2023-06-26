import React, { useState, useEffect, useRef, useCallback } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import Peer from "peerjs";

const socket = io.connect("http://192.168.135.214:5000");

export default function ClassPage() {
  console.log("class page");
  const [chatWidth, setChatWidth] = useState("w-4/12");
  const [videoWidth, setVideoWidth] = useState("w-8/12");
  const [roomJoined, setRoomJoined] = useState(false);
  const [messages, setMessages] = useState([]);

  const roomId = useParams().id;
  const { isteacher } = useParams();
  const isTeacher = isteacher === "t";

  const videoRef = useRef(null);
  const peerRef = useRef(null);

  const toggleChat = () => {
    if (chatWidth === "w-4/12") {
      setChatWidth("w-0");
      setVideoWidth("w-full");
    } else {
      setChatWidth("w-4/12");
      setVideoWidth("w-8/12");
    }
  };

  const handleChatMessage = useCallback(
    (message) => {
      console.log("a new message has arrived", message.text);
      if (message !== messages[messages.length - 1]) {
        console.log("adding message");
        setMessages((prevMessages) => [...prevMessages, message]);
      }
    },
    [messages]
  );

  function addMessage() {
    const messageBox = document.getElementById("message");
    const sender = "me";
    const text = messageBox.value;

    const message = {
      sender: sender,
      text: text,
    };

    messageBox.value = "";
    socket.emit("chat-message-to-server", message, roomId);

    const chatMessages = document.querySelector(".chat-messages");
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function handleKeyDown(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      addMessage();
    }
  }

  useEffect(() => {
    console.log("use effect", messages);
    const peer = new Peer();

    peerRef.current = peer;

    if (!isTeacher) {
      peer.on("call", (call) => {
        call.answer();
        call.on("stream", (userVideoStream) => {
          videoRef.current.srcObject = userVideoStream;
        });
      });
    } else {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })

        .then((stream) => {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        });
    }

    const handleOpen = (id) => {
      if (!roomJoined) {
        socket.emit("join-room", roomId, isTeacher, id);
        setRoomJoined(true);
      }

      socket.on("user-connected", (userId, isUserTeacher) => {
        if (isTeacher && !isUserTeacher) {
          navigator.mediaDevices
            .getUserMedia({ video: true, audio: true })
            .then((stream) => {
              peer.call(userId, stream);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
    };

    peer.on("open", handleOpen);
    const handleChatMessage = (message) => {
      console.log("a new message has arrived", message.text);
      if (message !== messages[messages.length - 1]) {
        console.log("adding message");
        setMessages((prevMessages) => [...prevMessages, message]);
      }
    };

    socket.on("chat-message", handleChatMessage);

    return () => {
      socket.off("chat-message", handleChatMessage);
      peer.off("open", handleOpen);
      peer.destroy();
    };
  }, []);

  return (
    <div className="class bg-gray-200 h-screen flex flex-row w-full overflow-hidden">
      <div
        className={`video-container h-full bg-gray-200 ${videoWidth} transition-all duration-500 ease-in-out flex flex-col  `}
      >
        <div className="hidden description h-28 flex justify-center items-center shadow text-2xl font-bold text-gray-600">
          Lecture One
        </div>
        <div className="h-4/5 my-auto px-4 flex justify-center ">
          {" "}
          <video ref={videoRef} className="h-full" controls></video>
        </div>
      </div>
      <div
        className={`chat-container bg-white ${chatWidth} transition-all duration-500 ease-in-out relative border border-md border-gray-900`}
      >
        <button
          className={
            "absolute top-0 rounded-b-3xl right-0 bg-gray-500 px-4 py-2 text-white"
          }
          onClick={toggleChat}
        >
          CHAT
        </button>
        <div className="chat-header flex justify-center p-8 bg-blue-200 text-gray-600 text-xl font-bold">
          Chat Room
        </div>
        <div className="chat-messages overflow-auto max-h-full p-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className="chat-message flex flex-col bg-blue-400 rounded-r-lg mr-4 mt-2 text-white"
            >
              <div className="chat-message-sender font-bold pl-2 pt-2">
                {message.sender}
              </div>
              <div className="chat-message-text p-2">{message.text}</div>
            </div>
          ))}
          <div className="h-40"></div>
        </div>
        <div className="chat-input flex absolute bottom-0 w-full">
          <input
            className="w-full border border-gray-300 rounded px-5 py-2 text-medium focus:outline-none focus:border-gray-400"
            type="text"
            placeholder="Enter your message"
            id="message"
            onKeyDown={handleKeyDown}
          />
          <button
            className="right-0 bg-gray-500 px-4 py-2 text-white"
            onClick={addMessage}
          >
            SEND
          </button>
        </div>
      </div>
    </div>
  );
}
