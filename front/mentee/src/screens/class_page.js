import React, { useState, useEffect, useRef, useCallback } from "react";
import {useNavigate, useParams} from "react-router-dom";
import Peer from "peerjs";
import { localIp } from "../constants";

import Pusher from "pusher-js";

import {
  faPlay,
  faPause,
  faVolumeUp,
  faVolumeMute,
  faStop,
  faVideo,
  faPaperPlane,
  faVideoSlash,
  faShareSquare,
  faComments,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {checkLogin, getMe} from "../services/userService";

export default function ClassPage() {
  const [chatPos, setChatPos] = useState("-right-full");
  const [videoWidth, setVideoWidth] = useState("w-full");
  const [roomJoined, setRoomJoined] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const roomId = useParams().id;
  const { isteacher } = useParams();
  const isTeacher = isteacher === "t";
  const videoRef = useRef(null);
  const messageBoxRef = useRef(null);
  const peerRef = useRef(null);
  const [videoStream, setVideoStream] = useState(null);
  const [screenStream, setScreenStream] = useState(null);
  const [currentStudents, setCurrentStudents] = useState([]);
  const [userInfo, setUserInfo] = useState({ name: "unknown" });
  const [isStreamAvailable, setIsStreamAvailable] = useState(false);
  const [isVideoStream,setIsVideoStream] = useState(false);
  const [lectureDetails,setLectureDetails] = useState({});
  const history = useNavigate();


  const toggleChat = () => {
    if (chatPos === "right-0") {
      setChatPos("-right-full");
      setVideoWidth("w-full");
    } else {
      setChatPos("right-0");
      setVideoWidth("w-9/12");
    }
  };

  function shareButton(text, onPress) {
    var icon = <></>;
    if (text === "Start Screen Share") {
      icon = <FontAwesomeIcon icon={faShareSquare} className="mr-2" />;
    } else if (text === "Stop Screen Share") {
      icon = <FontAwesomeIcon icon={faStop} className="mr-2" />;
    } else if (text === "Start Video") {
      icon = <FontAwesomeIcon icon={faVideo} className="mr-2" />;
    } else if (text === "Stop Video") {
      icon = <FontAwesomeIcon icon={faVideoSlash} className="mr-2" />;
    }

    return (
      <button
        className="bg-blue-600 text-gray-200 font-semibold text-lg px-4 py-2 rounded hover:bg-blue-700 transition-all duration-200 ease-in-out shadow  shadow-md-gray-8"
        onClick={onPress}
      >
        {icon}
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

  function addMessage() {
    const sender = userInfo.name;
    const text = messageBoxRef.current.value;

    const message = {
      sender: sender,
      text: text,
      status: "sending",
    };

    messageBoxRef.current.value = "";
    setMessages((prevMessages) => [...prevMessages, message]);

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
      <div className="controls flex  bg-gray-700 px-10 py-4 w-80 justify-between h-fit ">
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
    const isLoggedIn = checkLogin();

    if(!isLoggedIn){
      console.log("not logged in");
      history("/login");
      return
    }
    // initialize pusher with your app key and cluster
    const pusher = new Pusher("20d590a2a5e4500caac1", {
      cluster: "ap2",
    });

    // subscribe to your channel which is the same as your room
    const myRoom = pusher.subscribe(roomId);
    myRoom.bind("user-connected", (userInfo) => {
      const { userId, isUserTeacher } = userInfo;
      addStudent(userId);
      if (isTeacher) {
        joinNewStudent(userId, isUserTeacher);
      }
    });

    // remove student from the list when disconnected
    myRoom.bind("user-disconnected", (userInfo) => {
      const { studentId } = userInfo;
      removeStudent(studentId);
    });

    // handle when a new message is sent to the chat room
    myRoom.bind("chat-message", (message) => {
      if (message.sender === userInfo.name) {
        const date = new Date();
        message.status =
          (date.getHours() % 12).toString() +
          ":" +
          (date.getMinutes() < 10 ? "0" : "") +
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
          (date.getMinutes() < 10 ? "0" : "") +
          date.getMinutes().toString() +
          (date.getHours() > 11 ? " PM" : " AM");

        setMessages((prevMessages) => [...prevMessages, message]);
      }
    });

    // get the user info from the server
    if (userInfo.name === "unknown") {
      getMe().then(user=>{
        setUserInfo(prevState => {
            return {
                ...prevState,
                name: user.name,
                id: user._id,
            }
        });
      }).catch((e)=>{
        console.log(e);
      });
    }

    // get the lecture details from the server
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

    // initialize peer server and set the peerRef that will be used to call other users
    const peer = new Peer();
    peerRef.current = peer;

    // if the user is not a teacher, then when called answer the call and set the video stream
    if (!isTeacher) {
      peer.on("call", (call) => {
        setIsPlaying(false);
        setIsStreamAvailable(false);

        call.answer();
        call.on("stream", (userVideoStream) => {
          videoRef.current.srcObject = userVideoStream;
          videoRef.current.addEventListener("loadedmetadata", () => {
            setIsStreamAvailable(true);
          });
        });
      });
    }

    // when the peer is open and the user hasn't joined a room, send a request to the server to join the room
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

    // when the peer is open, set the peer id and send a request to the server to join the room
    peer.on("open", handleOpen);
    return () => {
      // when the component is unmounted, unsubscribe from the pusher channel, destroy the peer connection and unbind all the events

      myRoom.unbind_all();
      pusher.unsubscribe(roomId);
      peer.off("open", handleOpen);
      peer.destroy();
    };
  }, [userInfo]);

  return (
    <div className="class bg-gray-800 h-screen flex w-full overflow-hidden relative">
      <div
        className={`video-container h-full relative ${videoWidth} transition-all duration-500 ease-in-out flex flex-col`}
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
        <div className="pb-12 flex justify-evenly text-white items-center">
          <div className="flex gap-4 flex-wrap w-fit">
            {isTeacher
              ? shareButton("Start Screen Share", startScreenShare)
              : ""}
            {isTeacher ? shareButton("Stop Screen Share", stopScreenShare) : ""}
          </div>
          {controls()}
          <div className="flex gap-4 flex-wrap w-fit">
            {" "}
            {isTeacher ? shareButton("Start Video", startVideoStream) : ""}
            {isTeacher ? shareButton("Stop Video", stopVideoStream) : ""}
          </div>
        </div>
      </div>
      <div
        className={`chat-container bg-gray-600 w-3/12 fixed ${chatPos} h-screen transition-all duration-500 ease-in-out border border-md border-gray-900`}
      >
        <button
          className={
            "fixed top-0 rounded-b-3xl right-0 bg-gray-500 px-4 py-2 text-white z-10"
          }
          onClick={toggleChat}
        >
          CHAT
        </button>
        <div className="chat-header flex justify-center py-8 bg-gray-200 text-gray-700 text-xl font-bold items-center ">
          <FontAwesomeIcon
            icon={faComments}
            className="mr-2 text-blue-600 fa-2x"
          ></FontAwesomeIcon>
          Chat Room
        </div>
        <div className="chat-messages overflow-auto max-h-full p-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className="chat-message flex flex-col bg-gray-200 rounded-r-lg mr-4 mt-2 text-gray-700 relative"
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
            ref={messageBoxRef}
            className="w-full border border-gray-100  px-5 py-3 text-lg focus:outline-none focus:border-gray-400 bg-gray-200"
            type="text"
            placeholder="Enter your message"
            id="message"
            onKeyDown={handleKeyDown}
          />
          <button
            className="right-0 bg-blue-600 px-5 py-2 text-white font-semibold flex gap-2 items-center"
            onClick={addMessage}
          >
            <FontAwesomeIcon icon={faPaperPlane} className=""></FontAwesomeIcon>
            SEND
          </button>
        </div>
      </div>
    </div>
  );
}
