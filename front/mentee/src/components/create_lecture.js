// import { json } from "express";
import MenteeHeader from "../components/mentee_header";
import {useState, useEffect, useRef} from "react";
import Footer from "../components/footer";
import {getMe} from "../services/userService";
import {createClass} from "../services/classesService";

export default function CreateLecture(props) {
  const titleRef = useRef(null);
  const thumbnailRef = useRef(null);

  const descriptionRef = useRef(null);
  const startTimeRef = useRef(null);
  const endTimeRef = useRef(null);
  const durationRef = useRef(null);
  const priceRef = useRef(null);
  const dateRef = useRef(null);


  function createLecture() {
    console.log("here");
    getMe().then(userInfo=>{
      const newClassDetail = {
        "name": titleRef.current.value,
        "type": "Math",
        "description": descriptionRef.current.value,
        "schedule": dateRef.current.value,
        "price": priceRef.current.value,
        "instructor": userInfo._id,
      }
      console.log(userInfo);
       createClass(newClassDetail).then(newClass=>{
         console.log("Created Class:",newClass);
       }).catch(e=>{
         console.log("Error in creating task:",e);
       })
    }).catch(e=>{
      console.log(e);
    })

  }

  const fields = [
    {
      label: "thumbnail",
      text: "Choose your thumbnail image",
      type: "file",
      placeholder: "",
      ref: thumbnailRef
    },
    {
      label: "title",
      text: "Title",
      type: "text",
      placeholder: "",
      ref: titleRef
    },
    {
      label: "description",
      text: "Description",
      type: "text",
      placeholder: "",
      ref: descriptionRef
    },

    {
      label: "date",
      text: "Date of the Lecture",
      type: "date",
      placeholder: "",
      ref: dateRef
    },
    {
      label: "startTime",
      text: "Start Time",
      type: "time",
      placeholder: "",
      ref: startTimeRef
    },
    {
      label: "endTime",
      text: "End Time",
      type: "time",
      placeholder: "",
      ref: endTimeRef
    },
    {
      label: "duration",
      text: "Duration in minutes",
      type: "number",
      placeholder: "",
      ref: durationRef
    },
    {
      label: "price",
      text: "Price in Birr",
      type: "number",
      placeholder: "",
      ref: priceRef
    },
  ];

  return (
    <div className="bg-gray-200 min-h-screen">
      <MenteeHeader search={false} />
      <div className="max-w-4xl lg:mx-auto mt-20 bg-white rounded-lg shadow-md mx-10 shadow-gray-400">
        <div className="py-4 px-6">
          <div className="text-2xl font-semibold text-gray-700 text-center">
            Create a new Lecture
          </div>

          {fields.map((field) => {
            return (
              <div className="mb-6">
                <label
                  for={field.label}
                  className="block mb-2 text-lg font-medium text-gray-700 w-fit"
                >
                  {field.text}
                </label>
                {
                  field.label === "description" ? (
                    <textarea
                        ref={field.ref}
                        id={field.label}
                        type={field.type}
                        placeholder={field.placeholder}
                        className={`w-full bg-gray-100 border border-gray-300 placeholder-gray-600 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        rows="4"
                    />
                    ) : (
                      <input
                          ref={field.ref}
                          type={field.type}
                          id={field.label}
                          className={`w-full bg-gray-100 border border-gray-300 placeholder-gray-600 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                          placeholder={field.placeholder}
                      />
                    )
                }
              </div>
            );
          })}

          <div className="flex justify-end gap-4">
            <button
              onClick={createLecture}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Create
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
