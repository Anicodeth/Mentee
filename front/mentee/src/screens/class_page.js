import React, { useState, useEffect, useRef, useCallback } from "react";
import { useParams } from "react-router-dom";
import Peer from "peerjs";
import { localIp } from "../constants";

import Pusher from "pusher-js";

import {
  faPlay,
  faPause,
  faVolumeUp,
  faVolumeMute,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ClassPage() {
  const [chatWidth, setChatWidth] = useState("w-0");
  const [videoWidth, setVideoWidth] = useState("w-full");
  const [roomJoined, setRoomJoined] = useState(false);
  const [messages, setMessages] = useState([]);

  const [isPlaying, setIsPlaying] = useState(false);
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
  const [userInfo, setUserInfo] = useState({ name: "unknown" });

  const [isStreamAvailable, setIsStreamAvailable] = useState(false);

  console.log(userInfo, ">......");
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
    const messageBox = document.getElementById("message");
    const sender = userInfo.name;
    const text = messageBox.value;

    const message = {
      sender: sender,
      text: text,
      status: "sending",
    };

    setMessages((prevMessages) => [...prevMessages, message]);
    messageBox.value = "";

    fetch(`${localIp}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: message,
        roomId: roomId,
      }),
    })
      .then((res) => {
        console.log("sucess in chat req");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleKeyDown(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      addMessage();
    }
  }

  function playPauseVideo() {
    if (videoRef.current && videoRef.current.srcObject) {
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

    if (videoRef.current && videoRef.current.srcObject === null) {
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
            setIsPlaying(true);
            setIsStreamAvailable(true);
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
    console.log(currentStudents);
    currentStudents.forEach((studentId) => {
      peerRef.current.call(studentId, stream);
    });
  }

  function joinNewStudent(userId, isUserTeacher) {
    if (videoRef.current.srcObject) {
      console.log("calling the new student");
      peerRef.current.call(userId, videoRef.current.srcObject);
    }
  }
  useEffect(() => {
    const pusher = new Pusher("20d590a2a5e4500caac1", {
      cluster: "ap2",
    });

    const myRoom = pusher.subscribe(roomId);

    myRoom.bind("user-connected", (userInfo) => {
      console.log("new user just connected");
      const { userId, isUserTeacher } = userInfo;
      addStudent(userId);
      if (isTeacher) {
        joinNewStudent(userId, isUserTeacher);
      }
    });

    myRoom.bind("user-disconnected", (userInfo) => {
      const { studentId } = userInfo;
      removeStudent(studentId);
    });

    myRoom.bind("chat-message", (message) => {
      console.log("chat from pusher:", message, userInfo);

      if (message.sender === userInfo.name) {
        console.log("here in add message");
        const date = new Date();
        message.status =
          (date.getHours() % 12).toString() +
          ":" +
          date.getMinutes().toString() +
          (date.getHours() > 11 ? " PM" : " AM");

        setMessages((prevMessages) => {
          let res = prevMessages.slice(0, prevMessages.length - 1);
          res.push(message);
          return res;
        });
      } else {
        const date = new Date();
        message.status =
          (date.getHours() % 12).toString() +
          ":" +
          date.getMinutes().toString() +
          (date.getHours() > 11 ? " PM" : " AM");

        setMessages((prevMessages) => [...prevMessages, message]);
      }
    });

    if (userInfo.name === "unknown") {
      fetch(`${localIp}/my-info`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: "",
        }),
      })
        .then((res) => {
          console.log("........", res);
          return res.json();
        })
        .then((data) => {
          console.log("hereee");
          setUserInfo((prev) => {
            return { ...prev, name: data.name, email: data.email };
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }

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
        setIsPlaying(false);
        setIsStreamAvailable(false);
        call.answer();
        call.on("stream", (userVideoStream) => {
          console.log("answering call", videoRef.current);
          videoRef.current.srcObject = userVideoStream;
          videoRef.current.addEventListener("loadedmetadata", () => {
            setIsStreamAvailable(true);
          });
        });
      });
    }

    const handleOpen = (id) => {
      if (!roomJoined) {
        fetch(`${localIp}/connection`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: id,
            roomId: roomId,
          }),
        })
          .then((res) => {
            console.log("sucess in joining req");
          })
          .catch((err) => {
            console.log(err);
          });
        setRoomJoined(true);
      }
    };

    peer.on("open", handleOpen);
    return () => {
      myRoom.unbind_all();
      pusher.unsubscribe(roomId);
      peer.off("open", handleOpen);
      peer.destroy();
    };
  }, [userInfo]);

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
        <div className="h-4/5 my-auto px-4 flex justify-center relative">
          {" "}
          {isPlaying ? (
            ""
          ) : (
            <button
              className="m-auto text-gray-300 absolute top-80 z-40 cursor-pointer"
              onClick={playPauseVideo}
            >
              {isStreamAvailable ? (
                <FontAwesomeIcon
                  icon={faPlay}
                  className="fa-6x"
                ></FontAwesomeIcon>
              ) : (
                "No Stream"
              )}
            </button>
          )}
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
              className="chat-message flex flex-col bg-gray-100 rounded-r-lg mr-4 mt-2 text-gray-700 relative"
            >
              <div className="chat-message-sender font-bold pl-2 pt-2">
                {message.sender}
              </div>
              <div className="chat-message-text p-2">{message.text}</div>
              <div className="chat-message-text p-2 absolute right-0 bottom-0 text-sm">
                {message.status}
              </div>
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
