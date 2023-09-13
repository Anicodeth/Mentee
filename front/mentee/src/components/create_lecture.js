// import { json } from "express";
import MenteeHeader from "../components/mentee_header";
import {useState, useEffect, useRef} from "react";
import Footer from "../components/footer";
import {getMe} from "../services/userService";
import {createClass} from "../services/classesService";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import SideMessage from "./error_message";

export default function CreateLecture(props) {
  const titleRef = useRef(null);
  const thumbnailRef = useRef(null);

  const descriptionRef = useRef(null);
  const priceRef = useRef(null);
  const dateRef = useRef(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const validateCreateLecture = () => {
    if (
      titleRef.current.value === "" ||
      descriptionRef.current.value === "" ||
      priceRef.current.value === "" ||
      dateRef.current.value === ""
    ) {
      setIsError(true);
      setErrorMessage("Please fill all the fields");
      return false;
    }
    return true;
  }

  function createLecture() {
    if(!validateCreateLecture()){
      setTimeout(()=>{
        setIsError(false);
      },3000);
        return;
    }
    setIsLoading(true);
    setIsError(false);
    setIsSuccess(false);
    getMe().then(userInfo=>{
      const newClassDetail = {
        "name": titleRef.current.value,
        "type": "Math",
        "description": descriptionRef.current.value,
        "schedule": dateRef.current.value,
        "price": priceRef.current.value,
        "instructor": userInfo.id,
      }
       createClass(newClassDetail).then(newClass=>{
            setIsLoading(false);
            setIsSuccess(true);

       }).catch(e=>{
            setIsLoading(false);
            setIsError(true);
            setErrorMessage(e.message.toString());
       })
    }).catch(e=>{
        setIsLoading(false);
        setIsError(true);
        setErrorMessage(e.message.toString());
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
      <div className="max-w-4xl lg:mx-auto mt-10 bg-white rounded-lg shadow-md mx-10 shadow-gray-400">
        <div className="py-4 px-6">
          <div className="text-2xl font-semibold text-gray-700 text-center">
            Create a new Lecture
          </div>

          {fields.map((field) => {
            return (
              <div className="mb-6">
                <label
                  className="block mb-2 text-lg font-medium text-gray-700 w-fit"
                >
                  {field.text}
                </label>
                {
                  field.label === "description" ? (
                    <textarea
                        ref={field.ref}
                        id={field.label}
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
              className="w-20 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {isLoading ? <FontAwesomeIcon icon={ faSpinner}/> : "Create"}
            </button>
            {isError ? (
               <SideMessage message={errorMessage}/>
            ) : null}
            {isSuccess ? (
                <SideMessage message={"Course successfully created!"} isError={false}/>
            ) : null}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
