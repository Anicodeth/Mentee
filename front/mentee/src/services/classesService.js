import {localIp} from "../constants";

export function searchClasses(term){
   return fetch(localIp+"/classes/search",{
        method:"POST",
        headers:{
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("token")
        },
        body:JSON.stringify({
            "query":term
        })
    }).then((res) => {
        console.log(res);
        return res.json()})
        .then((data) => {
            console.log(data);
            return data;
        })
        .catch((err) => {
            console.log(err);
        });}

export function getAllClasses(){
    return fetch(localIp + "/classes",{
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

export async function getClass(classId){
    return fetch(localIp + "/classes/id/" + classId, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("token"),
        },
    })
        .then((res) => res.json())
        .then((data) => data)
        .catch((err) => {
            console.log(err);
        });
}

export async function createClass(classDetail){
    return fetch(localIp + "/classes/createClass", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("token")
        },
        body: JSON.stringify(classDetail),
    })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            return data;
        })
        .catch((err) => {
            console.log(err);
        });
}

export async function deleteClass(classId){
    return fetch(localIp + `/classes/${classId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("token")
        },
    })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            return data;
        })
        .catch((err) => {
            console.log(err);
        });
}

export async function updateClass(classDetail){
    return fetch(localIp + `/classes/${classDetail.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("token")
        },
        body: JSON.stringify(classDetail),
    })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            return data;
        })
        .catch((err) => {
            console.log(err);
        });
}

// Instructor gets classes created by them
export function getMyClasses(){
    return fetch(localIp + "/my-classes",{
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