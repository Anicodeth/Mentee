import React, {useEffect, useRef} from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { PrimaryButton } from "../components/buttons";
import { ThreeCircles } from  'react-loader-spinner'



export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirm_passwordRef = useRef(null);
  // there are going to be 3 states of the form (takingInput, inProgress, done)
    // takingInput: the user is typing in the form
    // inProgress: the user has submitted the form and we are waiting for the server to respond
    // done: the server has responded and we are ready to move on
      // for this purpose, we use enums
    const [formState, setFormState] = useState("takingInput");
    // we need to store the error message from the server
    const [errorMessage, setErrorMessage] = useState("");
    // we need to store the success message from the server
    const [successMessage, setSuccessMessage] = useState("");
    // we need to store the data from the server
    const [data, setData] = useState(null);
    // we need to store the token from the server
    const [token, setToken] = useState(null);


  const fields = [
    {
      label: "First Name",
      type: "text",
      placeholder: "Enter your first name",
      id: "first_name",
      showWhenSignUp: !isLogin,
        ref:firstNameRef
    },
    {
      label: "Last Name",
      type: "text",
      placeholder: "Enter your last name",
      id: "last_name",
      showWhenSignUp: !isLogin,
        ref:lastNameRef
    },
    {
      label: "Email",
      type: "email",
      placeholder: "Enter your email",
      id: "email",
      showWhenSignUp: true,

ref:  emailRef  },
    {
      label: isLogin ? "Password" : "Create Password",
      type: "password",
      placeholder: "Enter your password",
      id: "password",
      showWhenSignUp: true,

ref:  passwordRef  },
    {
      label: "Confirm Password",
      type: "password",
      placeholder: "Confirm your password",
      id: "confirm_password",
      showWhenSignUp: !isLogin,
        ref:confirm_passwordRef
    },
  ];

  const getFormState = () => {
    if (formState === "inProgress") {
      return <ThreeCircles
          height = "40"
          width = "40"
          radius = "9"
          color = 'grey'
          ariaLabel = 'three-dots-loading'
          wrapperStyle
          wrapperClass
      />
    } else if (formState === "done") {
      return <p className="text-green-600">You have Signed up successfully</p>
    } else if (formState === "error") {
      return <p className="text-red-600">Error message</p>
    } else {
      return null;
    }
  }

const SignUp = () => {
    setFormState("done");
}

const LogIn = () => {
  setFormState("inProgress");
}


  const toSignUp = () => {
    setIsLogin(!isLogin);
  };

    useEffect(() => {

    }, []);

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
          {fields.map((field, index) => {
            console.log(field);
            if (field.showWhenSignUp) {
              return (
                <div key={index} className="w-full my-3">
                  <label className="mb-2 block relative top-1 bg-gray-200 w-fit text-gray-700 px-2 ">
                    {field.label}
                  </label>
                  <input
                      ref={field.ref}
                    className="md:w-96 border border-gray-300 rounded px-5 py-2 text-medium focus:outline-none focus:border-gray-400"
                    type={field.type}
                    placeholder={field.placeholder}
                    id={field.id}
                  />
                </div>
              );
            }
            return null;
          })}

          <div className="w-full mb-2 flex flex-col items-center gap-2 mt-4">
            {/* <PrimaryButton text={isLogin ? "Log In" : "Sign Up"} /> */}
              <PrimaryButton text={isLogin?"Log in":"Sign Up"} onPress={isLogin?LogIn:SignUp} />
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
          <div className="mt-4 py-3 -mb-10">
            {getFormState()}

            {/*<p className="text-green-600">Success message</p>*/}
          </div>
        </div>
      </div>
    </div>
  );
}
