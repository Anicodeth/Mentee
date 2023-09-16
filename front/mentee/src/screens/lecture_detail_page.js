import { useState, useEffect } from "react";
import { useParams,useNavigate } from "react-router-dom";
import LectureDetail from "../components/lecture_detail";
import Footer from "../components/footer";
import MenteeHeader from "../components/mentee_header";
import { localIp } from "../constants";
import {getAllClasses, getClass} from "../services/classesService";
import {checkLogin, getUser} from "../services/userService";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";

export default function LectureDetailPage() {
  const lectureId = localStorage.getItem("current_lecture");
  const [lectureDetail, setLectureDetail] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [instructorInfo, setInstructorInfo] = useState(null);
  const history = useNavigate();

  useEffect(() => {
      const isLoggedIn = checkLogin();

      if(!isLoggedIn){
          console.log("not logged in");
          history("/login");
          return
      }
      console.log(lectureId);
      getClass(lectureId).then(classDetail => {
          setLectureDetail(classDetail);
          getUser(classDetail.instructor).then(instructor=>{
              setInstructorInfo(instructor);
          });
      }).catch(e=>{
          console.log(e);
      });


  }, []);
  // title, image, instructorName, date, duration, description, isActive
  return (
    <div className="bg-gray-200 min-h-screen">
      <MenteeHeader search={false} />
      {(lectureDetail && instructorInfo)  ? (
        <LectureDetail
          title={lectureDetail.title}
          // image={lectureDetail.instructor.image_src}
          instructorName={instructorInfo.name}
          instructorEmail={"tigabu@example.com"}
          date={lectureDetail.schedule}
          duration={"2 hours"}
          description={lectureDetail.description}
          // thumbnail={lectureDetail.thumbnail}
          // startTime={lectureDetail.startTime}
          // endTime={lectureDetail.endTime}
          price={lectureDetail.price}
        />
      ) : (
        <div className="lecture-detail mx-auto mt-40 flex justify-center">
          <div className="text-2xl font-semibold m-auto justify-center items-center ">
            <FontAwesomeIcon icon={faSpinner} />
          </div>
        </div>
      )}
      <div className="">
        <Footer />
      </div>
    </div>
  );
}
