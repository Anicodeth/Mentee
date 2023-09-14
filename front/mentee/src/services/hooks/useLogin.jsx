import auth from "../authService";
import {useState} from "react";
import {useNavigate} from "react-router-dom";


export default function useSignup() {

    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);
    const history = useNavigate();

    const validateLogin = (email,password) => {
        return !(!email ||
            !password);
    };


    const LogIn = async (credentials) => {
        const {email, password} = credentials;
        if(!validateLogin(email,password)){
            setIsError(true);
            setIsLoading(false);
            setIsSuccess(false);
            setErrorMessage("Please fill both your email and password");
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

        const response = await auth.login(credentials);
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
    return {isLoading, errorMessage, isSuccess, isError, LogIn};
}
