// import { json } from "express";
import MenteeHeader from "../components/mentee_header";
import { useState, useEffect } from "react";
import Footer from "../components/footer";

export default function CreateLecture(props) {
  function createLecture() {}

  const fields = [
    {
      label: "thumbnail",
      text: "Choose your thumbnail image",
      type: "file",
      placeholder: "",
    },
    {
      label: "title",
      text: "Title",
      type: "text",
      placeholder: "",
    },
    {
      label: "description",
      text: "Description",
      type: "text",
      placeholder: "",
    },

    {
      label: "date",
      text: "Date of the Lecture",
      type: "date",
      placeholder: "",
    },
    {
      label: "startTime",
      text: "Start Time",
      type: "time",
      placeholder: "",
    },
    {
      label: "endTime",
      text: "End Time",
      type: "time",
      placeholder: "",
    },
    {
      label: "duration",
      text: "Duration in minutes",
      type: "number",
      placeholder: "",
    },
    {
      label: "price",
      text: "Price in Birr",
      type: "number",
      placeholder: "",
    },
  ];

  return (
    <div className="bg-gray-200 min-h-screen">
      <MenteeHeader search={false} />
      <div className="max-w-4xl lg:mx-auto mt-20 bg-white rounded-lg shadow-md mx-10 ">
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
                <input
                  type={field.type}
                  id={field.label}
                  className={`w-full bg-gray-100 border border-gray-300 placeholder-gray-600 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder={field.placeholder}
                />
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
