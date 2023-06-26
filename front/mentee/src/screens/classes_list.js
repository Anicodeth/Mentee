import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import ClassStatusPage from "./class_status_page";

// here we will implement lists of classes

// we will add a button to create a new class
// we will add a button to join a class
// we will add a button to go back to the home page

// now every button will redirect to classStatusPage with the class data

// to pass the class data we will use props

// we will add the functionality to get the classes data from the backend later
// the following comment shows how we will pass the data to the classStatusPage

export default function ClassesList() {
  return (
    <div className="classes bg-gray-200 min-h-screen flex justify-center items-center">
      <div className="classes-content bg-white p-8 rounded-lg shadow-lg flex flex-col min-w-1/2">
        <h2 className="classes-name text-2xl font-normal text-gray-800 mb-4">
          Classes
        </h2>

        <div className="classes-list text-lg mb-4 text-gray-700 font-bold ">
          <ul className="flex flex-col gap-4">
            <li className="flex gap-4  items-center">
              Class 1
              <button className="join-button bg-white text-back border border-gray-300 font-semibold rounded-full w-20 h-12 flex justify-center items-center cursor-pointer hover:bg-black hover:text-white transition delay-400 m-auto">
                <Link
                  to={{
                    pathname: "/status/1",
                    state: {
                      classId: "1",
                      className: "Introduction to React JS: Lecture One",
                      classDescription: "Description of the class.",
                      classStatus: "Active",
                    },
                  }}
                >
                  {" "}
                  Join
                </Link>
              </button>
            </li>

            <li className="flex gap-4  items-center">
              Class 2
              <button className="join-button bg-white text-back border border-gray-300 font-semibold rounded-full w-20 h-12 flex justify-center items-center cursor-pointer hover:bg-black hover:text-white transition delay-400 m-auto">
                <Link
                  to={{
                    pathname: "/status/2",
                    state: {
                      classId: "2",
                      className: "Introduction to React JS: Lecture Two",
                      classDescription: "Description of the class.",
                      classStatus: "Active",
                    },
                  }}
                >
                  {" "}
                  Join
                </Link>
              </button>
            </li>
            <li className="flex gap-4  items-center">
              Class 3
              <button className="join-button bg-white text-back border border-gray-300 font-semibold rounded-full w-20 h-12 flex justify-center items-center cursor-pointer hover:bg-black hover:text-white transition delay-400 m-auto">
                <Link
                  to={{
                    pathname: "/status/3",
                    state: {
                      classId: "3",
                      className: "Introduction to React JS: Lecture Three",
                      classDescription: "Description of the class.",
                      classStatus: "Active",
                    },
                  }}
                >
                  {" "}
                  Join
                </Link>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
