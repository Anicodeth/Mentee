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
    return fetch(localIp + "/classes/" + classId, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((res) => res.json())
        .then((data) => data)
        .catch((err) => {
            console.log(err);
        });
}