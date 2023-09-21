import React, {useEffect, useRef} from "react";
import { useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import {PrimaryButton, SecondaryButton} from "../components/buttons";
import { ThreeCircles } from  'react-loader-spinner'


import auth from "../services/authService";
import useLogin from "../hooks/useLogin";
export default function LoginPage() {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const history = useNavigate();
    const {isLoading, isError, isSuccess, errorMessage,LogIn} = useLogin();

    const fields = [
        {
            label: "Email",
            type: "email",
            placeholder: "Enter your email",
            id: "email",
            ref:  emailRef,
            onKeyPress: (e) => {
                if (e.key === "Enter") {
                    // now we will put the focus on the password field
                    passwordRef.current.focus();
                }
            }
        },

        {
            label: "Password",
            type: "password",
            placeholder: "Enter your password",
            id: "password",
            ref:  passwordRef,
            onKeyPress: (e) => {
                if (e.key === "Enter") {
                handleLogin()}
            }
        },

    ];

    const toSignUp = () => {
        history("/signup");
    };

    const handleLogin = async () => {
        await LogIn({email:emailRef.current.value,password:passwordRef.current.value});
    }

    return (
        <div className="h-screen bg-gray-200 flex justify-center items-center">
            <div className="min-w-96 w-fit lg:w-3/12 h-fit bg-white flex flex-col justify-center py-10 px-1 items-center rounded-2xl shadow-2xl">
                <div className="text-center">
                    <h1 className="text-3xl font-bold">
                        {"Welcome Back!"}
                    </h1>
                    <p className="text-gray-600  m-auto my-1">
                        { "Enter your details to log in"}
                    </p>
                </div>

                <div className="flex flex-col p-4 items-center w-full lg:w-10/12">
                    {fields.map((field, index) => {
                        return (
                            <div key={index} className="w-full my-3">
                                <label className="mb-1 block relative top-1 bg-gray-200 w-fit text-gray-700 px-2 ">
                                    {field.label}
                                </label>
                                <input
                                    className="lg:w-full border border-gray-300 rounded px-5 py-2 text-medium focus:outline-none focus:border-gray-400"
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
                    <div className="w-full mb-2 flex flex-col items-center gap-2 mt-4">
                        <SecondaryButton isLoading={isLoading} text={"Log in"} onPress={handleLogin} />
                    </div>

                    <div className="mb-1">
                        <Link className="text-blue-500" to="">
                            Forgot your password?
                        </Link>
                    </div>

                    <div>
                        <p className="text-gray-600">
                            Don't have an account?
                            <span className="text-blue-500 ml-4 cursor-pointer" onClick={toSignUp}>
                                Sign Up
                            </span>
                        </p>
                    </div>
                    <div className={`${errorMessage===""?"hidden":""} mt-4 py-2 -mb-10 flex justify-center ${!isLoading?"fixed bottom-12 left-5 bg-red-500":""} `}>
                        {isError && <p className="text-white text-xl font-medium px-4 py-2">{errorMessage}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
}