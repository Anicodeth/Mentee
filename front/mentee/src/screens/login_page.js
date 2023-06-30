import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);

  const toSignUp = () => {
    setIsLogin(!isLogin);
  };

  const fields = [
    {
      label: "First Name",
      type: "text",
      placeholder: "Enter your first name",
      id: "first_name",
      showWhenSignUp: !isLogin,
    },
    {
      label: "Last Name",
      type: "text",
      placeholder: "Enter your last name",
      id: "last_name",
      showWhenSignUp: !isLogin,
    },
    {
      label: "Email",
      type: "email",
      placeholder: "Enter your email",
      id: "email",
      showWhenSignUp: true,
    },
    {
      label: isLogin ? "Password" : "Create Password",
      type: "password",
      placeholder: "Enter your password",
      id: "password",
      showWhenSignUp: true,
    },
    {
      label: "Confirm Password",
      type: "password",
      placeholder: "Confirm your password",
      id: "confirm_password",
      showWhenSignUp: !isLogin,
    },
  ];

  return (
    <div className="h-screen bg-gray-200 flex justify-center items-center">
      <div className="w-fit h-fit bg-white flex flex-col justify-center py-10 px-1 items-center rounded rounded-2xl shadow-2xl">
        <div className="text-center">
          <h1 className="text-3xl font-bold">
            {isLogin ? "Welcome Back!" : "Welcome, Join us!"}
          </h1>
          <p className="text-gray-600 w-8/12 m-auto my-1">
            {isLogin
              ? "Log in to your account to continue"
              : "Enter your details below to create your account"}
          </p>
        </div>

        <div className="flex flex-col p-4 items-center w-full">
          {fields.map((field, index) =>{
            console.log(field)
            if (field.showWhenSignUp) { return (
              <div key={index} className="w-full">
                <label className="ml-4 mb-2 block relative top-5 bg-gray-100 w-fit text-gray-500 px-2 shadow shadow-md rounded">
                  {field.label}
                </label>
                <input
                  className="md:w-96 border border-gray-300 rounded px-5 py-2 text-medium focus:outline-none focus:border-gray-400"
                  type={field.type}
                  placeholder={field.placeholder}
                  id={field.id}
                />
              </div>
            )} return ( null )
          }
          )}

          <div className="w-full mb-2 flex flex-col items-center">
            <button className="flex border border-gray-400 px-20 py-2 rounded hover:bg-gray-700 hover:text-gray-100 transition delay-40 mt-5 ">
              {isLogin ? "Log In" : "Sign Up"}
            </button>
            <Link to="/classes">
              <button className="flex border w-full border-gray-400 px-5 py-2 rounded hover:bg-gray-700 hover:text-gray-100 transition delay-40 mt-5">
                Skip for now
              </button>
            </Link>
          </div>

          <div className="mb-1">
            <Link className="text-blue-500" to="">
              {isLogin ? "Forgot your password?" : ""}
            </Link>
          </div>

          <div>
            <p className="text-gray-600">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <Link className="text-blue-500" to="" onClick={toSignUp}>
                {isLogin ? "Sign Up" : "Log In"}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
