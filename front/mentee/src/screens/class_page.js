import React, { useState, useEffect, useRef, useCallback } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import Peer from "peerjs";
import { localIp } from "../constants";

import {
  faPlay,
  faPause,
  faVolumeUp,
  faVolumeMute,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const socket = io.connect(localIp);

export default function ClassPage() {
  const [chatWidth, setChatWidth] = useState("w-0");
  const [videoWidth, setVideoWidth] = useState("w-full");
  const [roomJoined, setRoomJoined] = useState(false);
  const [messages, setMessages] = useState([]);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  const roomId = useParams().id;
  const { isteacher } = useParams();
  const isTeacher = isteacher === "t";

  const videoRef = useRef(null);
  const peerRef = useRef(null);

  const [videoStream, setVideoStream] = useState(null);
  const [screenStream, setScreenStream] = useState(null);

  const [lectureDetails, setLectureDetails] = useState({});
  const [isVideoStream, setIsVideoStream] = useState(true);

  const [currentStudents, setCurrentStudents] = useState([]);

  // TODO first we fetch the user details from the backend and will use it to display the user details including in the chat

  const toggleChat = () => {
    if (chatWidth === "w-4/12") {
      setChatWidth("w-0");
      setVideoWidth("w-full");
    } else {
      setChatWidth("w-4/12");
      setVideoWidth("w-8/12");
    }
  };

  function shareButton(text, onPress) {
    return (
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        onClick={onPress}
      >
        {text}
      </button>
    );
  }

  function addStudent(studentId) {
    setCurrentStudents((prevStudents) => [...prevStudents, studentId]);
  }

  function removeStudent(studentId) {
    setCurrentStudents((prevStudents) =>
      prevStudents.filter((id) => id !== studentId)
    );
  }

  const handleChatMessage = useCallback(
    (message) => {
      if (message !== messages[messages.length - 1]) {
        setMessages((prevMessages) => [...prevMessages, message]);
      }
    },
    [messages]
  );

  function addMessage() {
    // to avoid manipulating the DOM directly

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

  function playPauseVideo() {
    if (videoRef.current.srcObject) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  }

  function muteUnmute() {
    if (videoRef.current.srcObject) {
      if (isMuted) {
        videoRef.current.muted = false;
        setIsMuted(false);
      } else {
        videoRef.current.muted = true;
        setIsMuted(true);
      }
    }
  }

  function changeVolume(event) {
    if (videoRef.current.srcObject) {
      videoRef.current.volume = event.target.value;

      if (videoRef.current.volume === 0) {
        setIsMuted(true);
      } else {
        setIsMuted(false);
      }
    }
  }

  function controls() {
    return (
      <div className="controls flex  bg-gray-700 px-10 py-4 w-80 justify-between h-fit mt-8">
        <button onClick={playPauseVideo} className="">
          <FontAwesomeIcon
            icon={isPlaying ? faPause : faPlay}
            className="fa-2x text-red"
          />
        </button>

        <button onClick={muteUnmute}>
          {" "}
          <FontAwesomeIcon
            icon={isMuted ? faVolumeMute : faVolumeUp}
            className="fa-2x text-red"
          />
        </button>

        <input
          className="w-1/2 bg-gray-200 "
          type="range"
          min="0"
          max="1"
          step="0.01"
          onChange={changeVolume}
        />
      </div>
    );
  }

  function startScreenShare() {
    setIsVideoStream(false);
    if (videoStream) {
      stopVideoStream();
    }
    if (screenStream) {
      stopScreenShare();
    }

    navigator.mediaDevices
      .getDisplayMedia({ video: true, audio: true })

      .then((stream) => {
        setScreenStream(stream);
        sendStreamToAll(stream);
        if (videoRef.current.srcObject) {
          videoRef.current.srcObject = null;
        }
        videoRef.current.srcObject = stream;
        videoRef.current.addEventListener("loadedmetadata", () => {
          videoRef.current.play();
        });
        return stream;
      })
      .catch((err) => {
        startVideoStream();
        console.log(err);
      });
  }

  function stopScreenShare() {
    if (screenStream) {
      if (videoRef.current.srcObject) {
        videoRef.current.srcObject = null;
      }
      screenStream.getTracks().forEach((track) => track.stop());
      setScreenStream(null);
    }
  }

  function startVideoStream() {
    if (screenStream) {
      stopScreenShare();
    }
    setIsVideoStream(true);

    if (videoRef.current.srcObject === null) {
      navigator.mediaDevices
        .getUserMedia({
          video: true,
          audio: true,
        })
        .then((curVideoStream) => {
          setVideoStream(curVideoStream);
          sendStreamToAll(curVideoStream);

          videoRef.current.srcObject = curVideoStream;
          videoRef.current.addEventListener("loadedmetadata", () => {
            videoRef.current.play();
          });
          return curVideoStream;
        });
    } else {
      sendStreamToAll(videoRef.current.srcObject);
      return videoRef.current.srcObject;
    }
  }

  function stopVideoStream() {
    if (videoStream) {
      if (videoRef.current.srcObject) {
        videoRef.current.srcObject = null;
      }
      videoStream.getTracks().forEach((track) => track.stop());
      setVideoStream(null);
    }
  }

  function sendStreamToAll(stream) {
    currentStudents.forEach((studentId) => {
      peerRef.current.call(studentId, stream);
    });
  }

  function joinNewStudent(userId, isUserTeacher) {
    if (videoRef.current.srcObject) {
      peerRef.current.call(userId, videoRef.current.srcObject);
    }
  }
  useEffect(() => {
    fetch(`${localIp}/lecture/${roomId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        const data = res.json();
        return data;
      })
      .then((data) => {
        setLectureDetails((prevData) => {
          return {
            ...prevData,
            title: data.title,
            description: data.description,
            date: data.date,
            time: data.time,
            duration: data.duration,
          };
        });
      })
      .catch((err) => {
        console.log(err);
      });

    const peer = new Peer();

    peerRef.current = peer;

    if (!isTeacher) {
      peer.on("call", (call) => {
        call.answer();
        call.on("stream", (userVideoStream) => {
          videoRef.current.srcObject = userVideoStream;
          videoRef.current.addEventListener("loadedmetadata", () => {
            videoRef.current.play();
          });
        });
      });
    }

    const handleOpen = (id) => {
      if (!roomJoined) {
        socket.emit("join-room", roomId, isTeacher, id);
        setRoomJoined(true);
      }

      socket.on("user-connected", (userId, isUserTeacher) => {
        addStudent(userId);
        if (isTeacher) {
          joinNewStudent(userId, isUserTeacher);
        }
      });

      socket.on("user-disconnected", (studentId) => {
        removeStudent(studentId);
      });
    };

    peer.on("open", handleOpen);

    socket.on("chat-message", handleChatMessage);

    return () => {
      socket.off("chat-message", handleChatMessage);
      peer.off("open", handleOpen);
      peer.destroy();
    };
  }, []);

  return (
    <div className="class bg-gray-800 h-screen flex w-full overflow-hidden relative">
      <div
        className={`flex justify-center align-center py-8 text-xl font-semibold text-gray-100 fixed bg-black opacity-80 bottom-0 gap-8 transition-all duration-500 ease-in-out ${videoWidth}`}
      >
        <div className="text-xl font-bold">
          {lectureDetails === undefined
            ? "Error loading Lecture data"
            : lectureDetails.title}
        </div>
      </div>

      <div
        className={`video-container h-full  ${videoWidth} transition-all duration-500 ease-in-out flex flex-col`}
      >
        <div className="h-4/5 my-auto px-4 flex justify-center">
          {" "}
          <video ref={videoRef} className="h-full bg-gray-900"></video>
        </div>
        <div className="h-1/5 flex justify-evenly text-white items-baseline">
          <div className="flex gap-4 flex-wrap ml-10">
            {isTeacher
              ? shareButton("Start Screen Share", startScreenShare)
              : ""}
            {isTeacher ? shareButton("Stop Screen Share", stopScreenShare) : ""}
          </div>
          {controls()}
          <div className="flex gap-4 flex-wrap ml-10">
            {" "}
            {isTeacher ? shareButton("Start Video", startVideoStream) : ""}
            {isTeacher ? shareButton("Stop Video", stopVideoStream) : ""}
          </div>
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
