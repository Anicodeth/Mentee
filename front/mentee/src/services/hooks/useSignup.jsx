import auth from "../authService";
import {useState} from "react";
import {useNavigate} from "react-router-dom";


export default function useSignup() {

    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);
    const history = useNavigate();

    const validateSignUp = (firstName,lastName,email,password,confirmPassword,role) => {
        return !(!firstName ||
            !lastName ||
            !email ||
            !password ||
            !confirmPassword ||
            !(role === "student" || role === "instructor") ||
            password !== confirmPassword);
    };


    const SignUp = async (credentials) => {
        const {name, email, password, role,confirmPassword} = credentials;
        const firstName = (name.split(" ")[0]);
        const lastName = (name.split(" ")[1]);
        if (!validateSignUp(firstName, lastName, email, password,confirmPassword, role)) {
                setIsError(true);
                setIsLoading(false);
                setIsSuccess(false);
                setErrorMessage("Please fill all the fields and make sure that the passwords match");
            setTimeout(() => {
                setIsError(false);
                setIsLoading(false);
                setIsSuccess(false);
                setErrorMessage("");
            }, 3000);
            return;

        }
        setIsLoading(true);
        setIsSuccess(false);
        setIsError(false);

        const response = await auth.register(credentials)
        if(response === "success"){
            setIsLoading(false);
            setIsSuccess(true);
            setIsError(false);
            history("/dashboard");
        }
        else{
            setIsError(true);
            setIsLoading(false);
            setIsSuccess(false);
            setErrorMessage(response);
            setTimeout(() => {
                setIsError(false);
                setIsLoading(false);
                setIsSuccess(false);
                setErrorMessage("");
            }, 3000);
        }
    }

    return {isLoading, errorMessage, isSuccess, isError, SignUp};
}