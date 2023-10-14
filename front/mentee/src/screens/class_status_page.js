import React from "react";
import io from "socket.io-client";
import {Link, useNavigate} from "react-router-dom";

import { useParams } from "react-router-dom";
import { PrimaryButton } from "../components/buttons";

import { useState, useEffect } from "react";
import { localIp } from "../constants";
import Footer from "../components/footer";
import MenteeHeader from "../components/mentee_header";
import {checkLogin, getMe, getUser} from "../services/userService";
import {getClass} from "../services/classesService";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendar, faChalkboardTeacher, faClock, faDollar, faSpinner} from "@fortawesome/free-solid-svg-icons";
import {Spinner} from "@chakra-ui/react";

export default function ClassStatusPage(props) {
  const [lectureDetail, setLectureDetail] = useState(null);
  const history = useNavigate();

  const classId = localStorage.getItem("current_lecture");
  const isActive = true;
  const isInstructor = false;
  const [instructorInfo, setInstructorInfo] = useState(null);
  const [myInfo, setMyInfo] = useState(null);

  useEffect(() => {
    const isLoggedIn = checkLogin();

    if(!isLoggedIn){
      console.log("not logged in");
      history("/login");
      return
    }

    // fetch(localIp + "/lecture/" + classId, {
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // })
    //   .then((res) => {
    //     console.log(res);
    //     return res.json();
    //   })
    //   .then((data) => {
    //     setLectureDetail(data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    getClass(classId).then(classDetail => {
        setLectureDetail(classDetail);
        getMe().then(userInfo => {
            setMyInfo(userInfo);
        }).catch((e)=>{
            console.log(e);
        });
    getUser(classDetail.instructor).then(instructor=>{
      console.log(instructor)
        setInstructorInfo(instructor);
    }).catch((e)=>{
        console.log(e);
    });
    }).catch((e)=> {
      console.log(e);
    });

  }, []);

  return (
    <div className="class bg-gray-200 min-h-screen flex flex-col items-center ">
      <div className="w-full">
        <MenteeHeader />
      </div>
      {lectureDetail ? (
        <div className="flex flex-col mt-40">
          <div className="bg-white px-12 py-4 shadow-lg flex flex-col w-96 gap-4 flex-wrap items-center rounded-lg gap-8 justify-around">
            {/*<div className="flex gap-4 items-center self-start">*/}
            {/*  {" "}*/}
            {/*  <div>*/}
            {/*    <p className="text-sm text-gray-500">*/}
            {/*      /!*{lectureDetail.instructor.position}*!/*/}
            {/*    </p>*/}
            {/*  </div>*/}
            {/*</div>*/}
            <p className="text-2xl font-semibold text-gray-600">
              {lectureDetail.name}
            </p>
                  <div className="w-full lecture-date text-gray-600">
                      <FontAwesomeIcon icon={faCalendar} className="mr-2 text-black" />
                      <div className="font-semibold inline">
                          {"Date: "}
                      </div>
                      <div className="font-bold text-lg inline ml-3">
                          {lectureDetail.schedule && lectureDetail.schedule.substring(0,10)}
                      </div>
                  </div>
                  <div className="w-full lecture-time text-gray-600">
                      <FontAwesomeIcon icon={faClock} className="mr-2 text-black" />
                      <div className="font-semibold inline">
                          {"Time: "}
                      </div>
                      <div className="font-bold text-lg inline ml-3">
                      {lectureDetail.schedule && lectureDetail.schedule.substring(11,19)}
                      </div>
                  </div>
              <div className="w-full lecture-time text-gray-600">
                  <FontAwesomeIcon icon={faDollar} className="mr-2 text-black" />
                  <div className="font-semibold inline">
                      {"Price: "}
                  </div>
                  <div className="font-bold text-lg inline ml-3">
                      {lectureDetail && lectureDetail.price}
                  </div>

              </div>
              <div className="w-full lecture-time text-gray-600">
                  <FontAwesomeIcon icon={faChalkboardTeacher} className="mr-2 text-black" />
                  <div className="font-semibold inline">
                      {"Instructor: "}
                  </div>
                  <div className="font-bold text-lg inline ml-3">
                  {instructorInfo && instructorInfo.name}
                  </div>

              </div>
            {/*<div className="w-full mt-4 text-gray-800 text-lg">*/}
            {/*  <p>Date: {lectureDetail.schedule && lectureDetail.schedule.substring(0,10)}</p>*/}
            {/*    <p>Price: {lectureDetail.price} birr</p>*/}
            {/*    <p>Instructor:*/}
            {/*        {instructorInfo && instructorInfo.name}*/}
            {/*    </p>*/}
            {/*</div>*/}
            <Link to={`/class/${classId}/${myInfo && myInfo.role === "instructor" ? "t" : "f"}`}>
              <PrimaryButton
                text={myInfo && myInfo.role === "instructor" ? "Host Class" : "Join Class"}
              />
            </Link>
          </div>
          <div className="flex flex-col items-center py-8 gap-4 justify-center">
            {/*<p*/}
            {/*  className={`${*/}
            {/*    isActive ? "text-green-600" : "text-red-500"*/}
            {/*  } text-lg font-semibold`}*/}
            {/*>*/}
            {/*  {isActive ? "Active" : "Inactive"}*/}
            {/*</p>*/}
            {/*<p className="text-normal">*/}
            {/*  {isActive*/}
            {/*    ? "The class has started, you can join now."*/}
            {/*    : "The class is not active yet."}*/}
            {/*</p>*/}

            {/* temporary button */}
            {/*<Link to={`/class/${lectureDetail.id}/t`}>*/}
            {/*  <PrimaryButton text={"Host Class (for trial)"} />*/}
            {/*</Link>*/}
            <div className="fixed bottom-0 w-full left-0">
              <Footer />
            </div>
          </div>
        </div>
      ) : (
        <div className="lecture-detail mx-auto mt-40 flex justify-center">
          <div className="w-full h-full flex flex-col justify-center items-center">
            <Spinner
                thickness='4px'
                speed='0.65s'
                emptyColor='gray.200'
                color='blue.500'
                size='xl'
            />
          </div>
        </div>
      )}
    </div>
  );
}
