import React from "react";
import io from "socket.io-client";
import { Link } from "react-router-dom";

import { useParams } from "react-router-dom";
import { PrimaryButton } from "../components/buttons";

import { useState, useEffect } from "react";
import { localIp } from "../constants";
import Footer from "../components/footer";
import MenteeHeader from "../components/mentee_header";

export default function ClassStatusPage(props) {
  const [lectureDetail, setLectureDetail] = useState(null);
  const { id } = useParams();

  const classId = id.toString();
  const isActive = true;
  const isInstructor = false;

  useEffect(() => {
    fetch(localIp + "/lecture/" + classId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        setLectureDetail(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(lectureDetail);

  return (
    <div className="class bg-gray-200 min-h-screen flex flex-col items-center ">
      <div className="w-full">
        <MenteeHeader />
      </div>
      {lectureDetail ? (
        <div className="flex flex-col lg:flex-row lg:gap-20  mt-40">
          <div className="bg-white px-12 py-8 flex flex-col gap-4 flex-wrap items-center rounded-lg">
            <p className="text-2xl font-semibold text-gray-600">
              {lectureDetail.title}
            </p>
            <div className="flex gap-4 items-center self-start">
              {" "}
              <img
                src={lectureDetail.instructor.image_src}
                alt="instructor"
                className="w-14"
              />
              <div>
                <p className="text-xl font-semibold text-gray-600">
                  {lectureDetail.instructor.name}
                </p>
                <p className="text-sm text-gray-500">
                  {lectureDetail.instructor.position}
                </p>
              </div>
            </div>
            <div className="w-full mt-4 text-gray-800 text-lg">
              <p>Date: {lectureDetail.date}</p>
              <p>Duration: {lectureDetail.duration} minutes</p>
            </div>
          </div>
          <div className="flex flex-col items-center py-8 gap-4 justify-center">
            <p
              className={`${
                isActive ? "text-green-600" : "text-red-500"
              } text-lg font-semibold`}
            >
              {isActive ? "Active" : "Inactive"}
            </p>
            <p className="text-normal">
              {isActive
                ? "The class has started, you can join now."
                : "The class is not active yet."}
            </p>
            <Link to={`/class/${lectureDetail.id}/${isInstructor ? "t" : "f"}`}>
              <PrimaryButton
                text={isInstructor ? "Host Class" : "Join Class"}
              />
            </Link>

            {/* temporary button */}
            <Link to={`/class/${lectureDetail.id}/t`}>
              <PrimaryButton text={"Host Class (for trial)"} />
            </Link>
            <div className="fixed bottom-0 w-full left-0">
              <Footer />
            </div>
          </div>
        </div>
      ) : (
        <div className="lecture-detail mx-auto mt-40 flex justify-center">
          <div className="text-2xl font-semibold m-auto justify-center items-center ">
            Loading...
          </div>
        </div>
      )}
    </div>
  );
}
