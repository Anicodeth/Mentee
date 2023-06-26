import React from "react";
import io from "socket.io-client";
import { Link } from "react-router-dom";

import { useParams } from "react-router-dom";

import { useState } from "react";

// here is the intermideate page before joining the class
// we will add a description of the class and a button to join the class and status of the class
// we will also add a button to go back to the classes page

// we will have props for the class name, description and status as well as the class id

export default function ClassStatusPage(props) {
  // const { classId, className, classDescription, classStatus } = props;

  // for now we will hard code the class id, name, description and status
  // we will add the functionality to get the class data from the backend later

  const { id } = useParams();
  console.log(props);
  const classId = id.toString();
  const className = "Introduction to React JS: Lecture One";
  const classDescription = "Description of the class.";
  const classStatus = "Active";
  const socket = io.connect("http://localhost:5000");

  // we will add the functionality to join the class
  // we will use the class id to join the class

  function joinRoom() {
    if (classStatus === "Inactive") {
      alert("This class is not active yet.");
      return;
    }

    // now we redirect to the class page using router

    // we will add the functionality to redirect to lecture streaming and chat page
  }

  return (
    <div className="class bg-gray-200 min-h-screen flex justify-center items-center">
      <div className="class-content bg-white p-8 rounded-lg shadow-lg flex flex-col min-w-1/2 ">
        <h2 className="class-name text-2xl font-normal text-gray-800 mb-4">
          {className}
        </h2>

        <p className="class-description text-xl mb-6 text-gray-600">
          {classDescription}
        </p>

        <div className="class-status text-lg mb-4 text-gray-700 font-bold">
          Status: <span className="text-green-500">{classStatus}</span>
        </div>

        <div className="flex justify-around">
          <Link to={classStatus === "Active" ? `/class/${classId}/t` : ""}>
            <button
              onClick={joinRoom}
              className="join-button bg-white border border-gray-400 rounded px-4 py-2 flex cursor-pointer hover:bg-gray-700 hover:text-gray-100 transition delay-400 m-auto"
            >
              Join as Teacher
            </button>
          </Link>
          <Link to={classStatus === "Active" ? `/class/${classId}/f` : ""}>
            <button
              onClick={joinRoom}
              className="join-button bg-white border border-gray-400 rounded px-4 py-2 flex cursor-pointer hover:bg-gray-700 hover:text-gray-100 transition delay-400 m-auto"
            >
              Join as Student
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
