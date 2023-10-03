import { useState, useEffect } from "react";
import {useParams, useNavigate, json} from "react-router-dom";
import LectureDetail from "../components/lecture_detail";
import Footer from "../components/footer";
import MenteeHeader from "../components/mentee_header";
import { localIp,baseFrontApi } from "../constants";
import {getAllClasses, getClass} from "../services/classesService";
import {checkLogin, getMe, getUser} from "../services/userService";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";
import {makePayment} from "../services/payment_service";
import {Skeleton} from "@chakra-ui/react";
import { Spinner } from '@chakra-ui/react'
export default function LectureDetailPage() {
  const lectureId = localStorage.getItem("current_lecture");
  const [lectureDetail, setLectureDetail] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [instructorInfo, setInstructorInfo] = useState(null);
  const history = useNavigate();
  const [isLoading,setIsLoading] = useState(false);
  const [isError,setIsError] = useState(false);
  const [isSuccess,setIsSuccess] = useState(false);

  const _makePayment = async () => {
          const userInfo = await getMe();
          const paymentDetail = {classId: lectureId,amount:lectureDetail.price,email:userInfo.email,first_name:userInfo.name.split(" ")[0],last_name:userInfo.name.split(" ")[1],phone_number:"0948671562",returnUrl:`${baseFrontApi}/success`};
          try {
              setIsLoading(true);
              setIsSuccess(false);
              setIsError(false);
              const response = await makePayment(paymentDetail);
              const url = response.url;
              const text_ref = response.textRef;
              localStorage.setItem("text_ref",text_ref);
              setIsLoading(false);
              setIsSuccess(true);
              setIsError(false);
              window.location.replace(url);
          }
          catch (e){
              setIsLoading(false);
              setIsSuccess(false);
              setIsError(true);
              console.log(e);
          }
  }

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
    <div className="bg-gray-200 min-h-screen flex flex-col justify-between">
      <MenteeHeader search={false} />
      {(lectureDetail && instructorInfo)  ? (
        <LectureDetail
          title={lectureDetail.title}
          // image={lectureDetail.instructor.image_src}
          instructorName={instructorInfo.name}
          instructorEmail={instructorInfo.email}
          date={lectureDetail.schedule}
          time={lectureDetail.schedule.substring(11,16)}
          duration={"120"}
          description={lectureDetail.description}
          // thumbnail={lectureDetail.thumbnail}
          // startTime={lectureDetail.startTime}
          // endTime={lectureDetail.endTime}
          price={lectureDetail.price}
          onEnroll={_makePayment}
          isLoading={isLoading}
        />
      ) : (
          <div className="w-full h-full flex flex-col justify-center items-center">
              <Spinner
                  thickness='4px'
                  speed='0.65s'
                  emptyColor='gray.200'
                  color='blue.500'
                  size='xl'
              />
          </div>
      )}
      <div className="">
        <Footer />
      </div>
    </div>
  );
}
// {classId, amount, email, first_name, last_name, phone_number, returnUrl}