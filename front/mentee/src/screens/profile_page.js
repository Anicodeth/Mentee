// import { json } from "express";
import MenteeHeader from "../components/mentee_header";
import { useState, useEffect } from "react";

export default function ProfilePage(props) {
  const [isEditable, setIsEditable] = useState(false);
  const [profileData, setProfileData] = useState({});

  //   useEffect(() => {
  //     fetch("http://localhost:5000/profile")
  //       .then((res) => {
  //         return res.json;
  //       })
  //       .then((data) => {
  //         setProfileData(data);
  //         return data;
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }, []);

  function enableEditting() {
    setIsEditable(true);
  }

  function disableEditting() {
    setIsEditable(false);
  }

  function saveChanges() {
    disableEditting();
  }

  const fields = [
    {
      label: "profile",
      text: "New profile picture?",
      type: "file",
      placeholder: "",
    },
    {
      label: "firstname",
      text: "First Name",
      type: "text",
      placeholder: "Mary",
    },
    {
      label: "lastname",
      text: "Last Name",
      type: "text",
      placeholder: "Smith",
    },
    {
      label: "email",
      text: "Email",
      type: "email",
      placeholder: "marysmith@example.com",
    },
    {
      label: "date",
      text: "Date of Birth",
      type: "date",
      placeholder: "11/02/2002",
    },
  ];

  return (
    <div className="bg-gray-200 h-screen ">
      <MenteeHeader search={false} />
      <div className="max-w-4xl lg:mx-auto mt-20 bg-white rounded-lg shadow-md mx-10 ">
        <div className="py-4 px-6">
          <h2 className="text-2xl font-semibold mb-4">Profile Information</h2>
          <div className="flex items-center mb-6">
            <img
              src="images/person_3.png"
              alt="User Avatar"
              className="w-20 rounded-full"
            />
            <div className="ml-4">
              <h3 className="text-xl font-semibold">Mary Smith</h3>
              <p className="text-gray-600">john.doe@example.com</p>
            </div>
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
                  className={`w-full ${
                    isEditable ? "bg-gray-100" : "bg-gray-200"
                  } border border-gray-300 placeholder-gray-600 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder={field.placeholder}
                  disabled={!isEditable}
                />
              </div>
            );
          })}

          <div className="flex justify-end gap-4">
            <button
              onClick={enableEditting}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md font-medium hover:text-gray-800 hover:bg-gray-300"
            >
              Edit
            </button>
            <button
              onClick={saveChanges}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
