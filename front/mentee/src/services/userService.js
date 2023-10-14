import {localIp} from "../constants";


export async function getMe() {
    return await fetch(`${localIp}/users/me`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": sessionStorage.getItem("token")
        }
    })
        .then((res) => res.json())
        .then((data) => data)
        .catch((err) => {
            console.log(err);
        });
}

export function checkLogin() {
    return !!window.sessionStorage.getItem("token");
}

export async function updateUser(userDetail){
    return await fetch(`${localIp}/users/${userDetail.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": sessionStorage.getItem("token")
        },
        body: userDetail
    })
        .then((res) => res.json())
        .then((data) => data)
        .catch((err) => {
            console.log(err);
        });
}

export async function deleteUser(userId){
    return await fetch(`${localIp}/users/${userId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": sessionStorage.getItem("token")
        },
    })
        .then((res) => res.json())
        .then((data) => data)
        .catch((err) => {
            console.log(err);
        });
}

export async function getUser(userId){
    return await fetch(`${localIp}/users/id/${userId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": sessionStorage.getItem("token")
        },
    })
        .then((res) => res.json())
        .then((data) => data)
        .catch((err) => {
            console.log(err);
        });
}

export function getAllUsers(){
    const response = fetch(`${localIp}/users`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": sessionStorage.getItem("token")
        },
    });
    if(response.ok){
        return response.json();
    }
    else{
        throw new Error("Something went wrong while fetching users");
    }
}