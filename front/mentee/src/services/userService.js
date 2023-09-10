import {localIp} from "../constants";


export async function getMe() {
    return await fetch(`${localIp}/users/me`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("token")
        }
    })
        .then((res) => res.json())
        .then((data) => data)
        .catch((err) => {
            console.log(err);
        });
}

export function checkLogin() {
    return !!window.localStorage.getItem("token");
}