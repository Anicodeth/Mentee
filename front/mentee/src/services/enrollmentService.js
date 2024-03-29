import {localIp} from "../constants";

export async function enrollUser(classDetail){
    return fetch(localIp + `/enrollments/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": sessionStorage.getItem("token")
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

export async function getMyEnrollments(){
    console.log("calling get my enrollments");
    const response = await fetch(localIp + `/enrollments/user`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": sessionStorage.getItem("token")
        },
    });
    if(response.status === 200){
        const data = response.json();
        console.log("successfully got enrolled courses")
        return data;
    }
    else{
        throw new Error("Failed to get enrolled courses");
    }
   
}

export async function getEnrolledStudents(classId){
    return fetch(localIp + `/enrollments/class/${classId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": sessionStorage.getItem("token")
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

export async function confirmEnrollment(textRef){
    const response = await fetch(localIp + `/payment/verify-payment/${textRef}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": sessionStorage.getItem("token")
        },
    });
    if(response.ok){
        const data = response.json();
        console.log("successfully confirmed enrollment");
        console.log(data);
        return data;
    }
    throw new Error("Failed to confirm enrollment");
}

export async function goToClass(classId){
    console.log(classId);
    return fetch(localIp + `/enrollments/enrolled/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": sessionStorage.getItem("token")
        },
        body: JSON.stringify({classId:classId}),
    })
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            console.log(data.isEnrolled);
            return data.isEnrolled;
        })
        .catch((err) => {
            console.log(err);
        });
}