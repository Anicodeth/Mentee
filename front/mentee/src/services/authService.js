import httpService from "./httpService";
import {baseApi} from "../constants.js";

const apiEndpointLogin = "/users/login/";
const apiEndpointRegister = "/users/";
const tokenKey = "token";

export async function register(user) {
    try{
        console.log(user);
        const response = await httpService.post(apiEndpointRegister, {
            name: user.name,
            email: user.email,
            password: user.password,
            role: user.role,
        });

        if (response.status === 201) {
        const { data } = response;

        sessionStorage.setItem(tokenKey, data["token"]);

        return "success";
        }
        else{
            console.log("Error in register",response.statusText);
            if(response.status === 401){
                return "Email already in use";
            }
            else if(response.status >= 500){
                return "Server error, please try again"
            }
        }
    }
    catch(ex){
        console.log("Error in register");
        return "Email already in use"
    }
}

export async function login({email, password}) {
    try{
        const response = await httpService.post(apiEndpointLogin, {"email":email, "password":password});

        console.log(response.status);
        if (response.status === 200) {
            const { data } = response;
            sessionStorage.setItem(tokenKey, data["token"]);
            return "success";}
        else{
                if(response.status === 401){
                    return "Invalid credentials. Try again.";
                }
                else if(response.status >= 500){
                    return "Server error, please try again"
                }
            }

    }
    catch(ex){
        console.log("Error in login");
        return "Invalid credentials. Try again.";
    }
}

export function logout() {
    localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
    try{
        const jwt = getJwt();
        return jwt;
    }
    catch(ex){
        console.log("Error in getCurrentUser", ex);
    }
}

export function getJwt() {
    try{
        return localStorage.getItem(tokenKey);
    }
    catch(ex){
        console.log("Error in getJwt", ex);
    }
}

export default {
    login,
    logout,
    getCurrentUser,
    getJwt,
    register,
}