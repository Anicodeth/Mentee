import React, {useEffect, useRef} from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { PrimaryButton } from "../components/buttons";
import { ThreeCircles } from  'react-loader-spinner'


import auth from "../services/authService";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [role,setRole] = useState("student");
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const loginPasswordRef = useRef(null);
  const loginEmailRef = useRef(null);
  const confirm_passwordRef = useRef(null);

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
      showWhenSignUp: !isLogin,

ref:  emailRef  },
      {
          label: "Email",
          type: "email",
          placeholder: "Enter your email",
          id: "login-email",
          showWhenSignUp: isLogin,

          ref:  loginEmailRef  },

    {
      label: "Create Password",
      type: "password",
      placeholder: "Enter your password",
      id: "password",
      showWhenSignUp: !isLogin,

ref:  passwordRef  },
    {
      label: "Confirm Password",
      type: "password",
      placeholder: "Confirm your password",
      id: "confirm_password",
      showWhenSignUp: !isLogin,
        ref:confirm_passwordRef
    },
      {
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
          id: "login-password",
          showWhenSignUp: isLogin,

          ref:  loginPasswordRef  },

  ];

  const getErrorState = () => {
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
    } else if (formState === "error") {
      return <p className="text-white text-xl font-medium px-4 py-2">{errorMessage}</p>
    } else {
      return null;
    }
  }

    const validateSignUp = () => {
        if (
            !firstNameRef.current.value ||
            !lastNameRef.current.value ||
            !emailRef.current.value ||
            !passwordRef.current.value ||
            !confirm_passwordRef.current.value ||
            passwordRef.current.value !== confirm_passwordRef.current.value
        ) {
            setFormState("error");
            setErrorMessage("Please fill in all required fields and make sure passwords match");
            return false;
        }
        return true;
    };

    // Function to validate input fields before login
    const validateLogin = () => {
        if (!loginEmailRef.current.value || !loginPasswordRef.current.value) {
            setFormState("error");
            setErrorMessage("Please fill in both email and password fields");
            return false;
        }
        return true;
    };

    const SignUp = () => {
    setFormState("inProgress");
        if (!validateSignUp()) {
            return;
        }

    const firstName = firstNameRef.current.value;
    const lastName = lastNameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    const confirmPassword = confirm_passwordRef.current.value;
    const data = {
        name: firstName+" "+lastName,
        email: email,
        password: password,
        role: role,
    };
    auth.register(data)
        .then((response) => {
            if(response === "success"){
            setFormState("done");
            window.location.href = "/dashboard";
            }
            else{
                setFormState("error");
                setErrorMessage(response)
            }
        })
        .catch((error) => {
            console.log(error);
            setFormState("error");
            setErrorMessage(error.message);
        });
}
const LogIn = () => {
    setFormState("inProgress");
    if (!validateLogin()) {
        return;
    }

    const email = loginEmailRef.current.value;
    const password = loginPasswordRef.current.value;
    const data = {
        email: email,
        password: password,
    };
    auth.login(data)
        .then((response) => {
            if(response === "success"){
                setFormState("done");
                window.location.href = "./dashboard";
            }
            else{
                setFormState("error");
                setErrorMessage(response);
            }
        })
        .catch((error) => {
            console.log(error);
            setFormState("error");
            setErrorMessage(error.message);
        });
}

  const toSignUp = () => {
      setErrorMessage("");
      setIsLogin(!isLogin);
  };

    function onChangeValue(event) {
        setRole(event.target.value);
    }

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
            if (field.showWhenSignUp) {
              return (
                <div key={index} className="w-full my-3">
                  <label className="mb-1 block relative top-1 bg-gray-200 w-fit text-gray-700 px-2 ">
                    {field.label}
                  </label>
                  <input
                    className="md:w-96 border border-gray-300 rounded px-5 py-2 text-medium focus:outline-none focus:border-gray-400"
                      autoComplete={isLogin ? "on" : "off"}
                      ref={field.ref}
                    type={field.type}
                    placeholder={field.placeholder}
                    id={field.id}
                  />
                </div>
              );
            }
            return null;
          })}
            <div onChange={onChangeValue} className={`w-full mb-4 ${isLogin?"hidden":"block"}`}>
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
          <div className={`${errorMessage===""?"hidden":""} mt-4 py-2 -mb-10 flex justify-center ${formState!=="inProgress"?"fixed bottom-12 left-5 bg-red-500":""} `}>
            {getErrorState()}
            {/*<p className="text-green-600">Success message</p>*/}
          </div>
        </div>
      </div>
    </div>
  );


}

// validation external -- not yet
// server error
// go to dashboard from login and signup
