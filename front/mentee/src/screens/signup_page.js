import React, {useEffect, useRef} from "react";
import { useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import {PrimaryButton, SecondaryButton} from "../components/buttons";
import { ThreeCircles } from  'react-loader-spinner'


import auth from "../services/authService";
import useSignup from "../hooks/useSignup";

export default function SignupPage() {
  const [role,setRole] = useState("");
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirm_passwordRef = useRef(null);
  const history = useNavigate();

  const {isLoading, isError, isSuccess, errorMessage,SignUp} = useSignup();

  const fields = [
    {
      label: "First Name",
      type: "text",
      placeholder: "Enter your first name",
      id: "first_name",
        ref:firstNameRef,
        onKeyPress: (e) => {
            if (e.key === "Enter") {
                lastNameRef.current.focus();
            }
        }
    },
    {
      label: "Last Name",
      type: "text",
      placeholder: "Enter your last name",
      id: "last_name",
        ref:lastNameRef,
        onKeyPress: (e) => {
            if (e.key === "Enter") {
                emailRef.current.focus();
            }
        }
    },
    {
      label: "Email",
      type: "email",
      placeholder: "Enter your email",
      id: "email",
      ref:  emailRef,
      onKeyPress: (e) => {
        if (e.key === "Enter") {
           passwordRef.current.focus();
        }
      }
    },

    {
      label: "Create Password",
      type: "password",
      placeholder: "Enter your password",
      id: "password",
      ref:  passwordRef,
        onKeyPress: (e) => {
            if (e.key === "Enter") {
                confirm_passwordRef.current.focus();
            }
        }
    },
    {
      label: "Confirm Password",
      type: "password",
      placeholder: "Confirm your password",
      id: "confirm_password",
      ref:confirm_passwordRef,
        onKeyPress: (e) => {
            if (e.key === "Enter") {
                handleSignup();
            }
        }
    },

  ];

  const toLogin = () => {
      history("/login");
  };

    function onChangeValue(event) {
        setRole(event.target.value);
    }


  const handleSignup = async () => {
        await SignUp({name:firstNameRef.current.value+" "+lastNameRef.current.value,email:emailRef.current.value,password:passwordRef.current.value,role:role,confirmPassword:confirm_passwordRef.current.value});
  }

  return (
    <div className="h-screen bg-gray-200 flex justify-center items-center">
      <div className="w-fit lg:w-4/12 h-fit bg-white flex flex-col justify-center py-10 px-1 items-center rounded rounded-2xl shadow-2xl">
        <div className="text-center">
          <h1 className="text-3xl font-bold">
            {"Welcome, Join us!"}
          </h1>
          <p className="text-gray-600 w-8/12 m-auto my-1">
            { "Enter your details below to create your account"}
          </p>
        </div>

        <div className="flex flex-col p-4 items-center lg:w-10/12 w-full">
          {fields.map((field, index) => {
              return (
                <div key={index} className="w-full my-3">
                  <label className="mb-1 block relative top-1 bg-gray-200 w-fit text-gray-700 px-2 ">
                    {field.label}
                  </label>
                  <input
                    className="w-96 lg:w-full border border-gray-300 rounded px-5 py-2 text-medium focus:outline-none focus:border-gray-400"
                      ref={field.ref}
                    type={field.type}
                    placeholder={field.placeholder}
                    id={field.id}
                    onKeyDown={(e)=>{
                        field.onKeyPress(e);
                    }}
                  />
                </div>
              );

          })}
            <div onChange={onChangeValue} className={`w-full mb-4 "block"}`}>
                <div className="mb-2 block relative top-1 bg-gray-200 w-fit text-gray-700 px-2 ">
                    Role
                </div>
                <div className="flex justify-center gap-8 border border-gray-300 py-2 rounded">
                    <label className="inline-flex items-center">
                        <input
                            type="radio"
                            value="student"
                            name="role"
                            className="form-radio text-blue-500 h-5 w-5"
                        />
                        <span className="ml-2 text-gray-700">Student</span>
                    </label>
                    <label className="inline-flex items-center">
                        <input
                            type="radio"
                            value="instructor"
                            name="role"
                            className="form-radio text-blue-500 h-5 w-5"
                        />
                        <span className="ml-2 text-gray-700">Instructor</span>
                    </label>
                </div>
            </div>


            <div className="w-full mb-2 flex flex-col items-center gap-2 mt-4">
              <SecondaryButton isLoading={isLoading} text={"Sign Up"} onPress={handleSignup} />
          </div>

          <div>
            <p className="text-gray-600">
            Already have an account?
              <span className="text-blue-500 cursor-pointer ml-4" onClick={toLogin}>
               Log In
              </span>
            </p>
          </div>
          <div className={`${errorMessage===""?"hidden":""} mt-4 py-2 -mb-10 flex justify-center ${!isLoading?"fixed bottom-12 left-5 bg-red-500":""} `}>
              {/*{isLoading && <ThreeCircles*/}
              {/*    height = "40"*/}
              {/*    width = "40"*/}
              {/*    radius = "9"*/}
              {/*    color = 'grey'*/}
              {/*    ariaLabel = 'three-dots-loading'*/}
              {/*    wrapperStyle*/}
              {/*    wrapperClass*/}
              {/*/>}*/}
              {isError&&<p className="text-white text-xl font-medium px-4 py-2">{errorMessage}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}