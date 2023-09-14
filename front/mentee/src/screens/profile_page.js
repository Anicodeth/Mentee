// import { json } from "express";
import MenteeHeader from "../components/mentee_header";
import {useState, useEffect, useRef} from "react";
import {getMe, updateUser} from "../services/userService";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";
import {createClass} from "../services/classesService";
import {SecondaryButton} from "../components/buttons";
import SideMessage from "../components/side_message";

export default function ProfilePage(props) {
  const [isEditable, setIsEditable] = useState(false);
  const [profileInfo, setProfileInfo] = useState({});
  const [isError, setIsError] = useState(false);
  const [isLoading,setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [fields,setFields] = useState([]);
  const [isUpdateLoading, setIsUpdateLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const imageRef = useRef(null);

    useEffect(() => {
      setIsUpdateLoading(true);
      setIsError(false);
      getMe().then(userProfile=>{
        console.log(userProfile);
        setProfileInfo(userProfile);
        setIsUpdateLoading(false);
        setFields([
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
            placeholder: userProfile.name.split(" ")[0],
            ref:firstNameRef
          },
          {
            label: "lastname",
            text: "Last Name",
            type: "text",
            placeholder: userProfile.name.split(" ")[1],
            ref:lastNameRef
          },
          {
            label: "email",
            text: "Email",
            type: "email",
            placeholder: userProfile.email,
            ref:emailRef
          },
        ]);
      }).catch(e=>{
        setIsError(true);
        setIsUpdateLoading(false);
        setErrorMessage(e.message.toString());
      })
    }, []);

  function enableEditting() {
    setIsEditable(true);
  }

  function disableEditting() {
    setIsEditable(false);
  }

  function saveChanges() {
    setIsUpdateLoading(true);
    setIsError(false);
    setIsSuccess(false);
    getMe().then(async (userInfo)=>{
      const userDetail = {
        "name": firstNameRef.current.value+" " + lastNameRef.current.value,
        "email": emailRef.current.value,
      }
      const response = await updateUser(userDetail)
      console.log(response);
      if(response.statusCode === 200){
        setIsUpdateLoading(false);
        setIsSuccess(true);
        setIsError(false);
        disableEditting();
      }
      else{
        setIsUpdateLoading(false);
        setIsSuccess(false);
        setIsError(true);
        setErrorMessage("Error occurred while updating user profile");
      }

    }).catch(e=>{
      setIsUpdateLoading(false);
      setIsError(true);
      setIsSuccess(false);
      setErrorMessage("Error occurred while updating user profile");
    })
  }

  return (
    <div className="bg-gray-200 h-screen ">
      <MenteeHeader search={false} />
      {isLoading ? <div className="w-screen h-full flex justify-center items-center">
          <FontAwesomeIcon className="h-14" icon={faSpinner}/>
      </div>
        :<div className="max-w-4xl lg:mx-auto mt-20 bg-white rounded-lg shadow-md mx-10 ">
        <div className="py-4 px-6">
          <h2 className="text-2xl font-semibold mb-4">Profile Information</h2>
          <div className="flex items-center mb-6">
            <img
              src={profileInfo.image_src?profileInfo.image_src:"images/person_3.png"}
              alt="User Avatar"
              className="w-20 rounded-full"
            />
            <div className="ml-4">
              <h3 className="text-xl font-semibold">{profileInfo.name}</h3>
              <p className="text-gray-600">{profileInfo.email}</p>
            </div>
          </div>
          {
            fields.map((field) => {
              return (
                  <div className="mb-6">
                    <label
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
                        ref={field.ref}
                    />
                  </div>
              );
            })
          }

          <div className="flex justify-end gap-4">
            <button
              onClick={enableEditting}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md font-medium hover:text-gray-800 hover:bg-gray-300"
            >
              Edit
            </button>
            <SecondaryButton isLoading={isUpdateLoading} onPress={saveChanges} text="Save Changes" />
            {isError && <SideMessage isError={true} message={errorMessage} />}
            {isSuccess && <SideMessage isError={false} message="Profile successfully updated" />}
          </div>
        </div>
      </div>}
    </div>
  );
}
