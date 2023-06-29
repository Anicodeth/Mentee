import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);

  const toSignUp = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="h-screen bg-gray-200  flex justify-center items-center sm:w-full">
      <div className="w-fit h-fit bg-white flex flex-col justify-center py-10 px-1  items-center rounded rounded-2xl shadow-2xl">
        <div className="text-center">
          <div className="">
            <h1 className="text-3xl font-bold">
              {isLogin ? "Welcome Back!" : "Welcome, Join us!"}
            </h1>
            <p className="text-gray-600 w-8/12 m-auto my-1">
              {isLogin
                ? "Log in to your account to continue"
                : "Enter your details below to create your account"}
            </p>
          </div>
        </div>

        <div className="flex">
          <div className="flex flex-col p-4  items-center">
            <div className="">
              <h1 className="text-2xl font-bold text-center">{}</h1>
            </div>
            <div className="w-full">
              {!isLogin && (
                <div className="">
                  <label className="ml-4 mb-2 block relative top-5 bg-gray-100  w-fit text-gray-500 px-2 shadow shadow-md rounded">
                    First Name
                  </label>
                  <input
                    className="md:w-96 border border-gray-300 rounded px-5 py-2 text-medium focus:outline-none focus:border-gray-400"
                    type="text"
                    placeholder="Enter your first name"
                    id="first_name"
                  />
                </div>
              )}
              {!isLogin && (
                <div className="">
                  <label className="ml-4 mb-2 block relative top-5 bg-gray-100  w-fit text-gray-500 px-2 shadow shadow-md rounded">
                    Last Name
                  </label>
                  <input
                    className="md:w-96 border border-gray-300 rounded px-5 py-2 text-medium focus:outline-none focus:border-gray-400"
                    type="text"
                    placeholder="Enter your last name"
                    id="last_name"
                  />
                </div>
              )}
              <div className="">
                <label className="ml-4 mb-2 block relative top-5 bg-gray-100  w-fit text-gray-500 px-2 shadow shadow-md rounded">
                  Email
                </label>
                <input
                  className="md:w-96 border border-gray-300 rounded px-5 py-2 text-medium focus:outline-none focus:border-gray-400"
                  type="email"
                  placeholder="Enter your email"
                  id="email"
                />
              </div>
              <div className="w-full">
                <label className="ml-4 mb-2 block relative top-5 bg-gray-100  w-fit text-gray-500 px-2 shadow shadow-md rounded">
                  {isLogin ? "Password" : "Create Password"}
                </label>
                <input
                  className="md:w-96 border border-gray-300 rounded px-5 py-2 text-medium focus:outline-none focus:border-gray-400"
                  type="password"
                  placeholder="Enter your password"
                  id="password"
                />
              </div>
              {!isLogin && (
                <div className="w-full">
                  <label className="ml-4 mb-2 block relative top-5 bg-gray-100  w-fit text-gray-500 px-2 shadow shadow-md rounded">
                    Confirm Password
                  </label>
                  <input
                    className="md:w-96 border border-gray-300 rounded px-5 py-2 text-medium focus:outline-none focus:border-gray-400"
                    type="password"
                    placeholder="Confirm your password"
                    id="confirm_password"
                  />
                </div>
              )}
            </div>
            <div className=" w-full mb-2 flex flex-col items-center">
              <button className=" flex border border-gray-400 px-20 py-2 rounded hover:bg-gray-700 hover:text-gray-100 transition delay-40 mt-5 ">
                {isLogin ? "Log In" : "Sign Up"}
              </button>
              <Link to="/classes">
                <button className="flex border w-full border-gray-400 px-5 py-2 rounded hover:bg-gray-700 hover:text-gray-100 transition delay-40  mt-5">
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
                {isLogin
                  ? "Don't have an account? "
                  : "Already have an account? "}
                <Link className="text-blue-500" to="" onClick={toSignUp}>
                  {isLogin ? "Sign Up" : "Log In"}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
