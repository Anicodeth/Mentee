import Footer from "../components/footer";
import { useState, useEffect } from "react";
import MenteeHeader from "../components/mentee_header.js";
import LectureCard from "../components/lecture_card";
import { localIp } from "../constants";
import {getAllClasses, searchClasses as searchClassesService} from "../services/classesService" ;
import {checkLogin} from "../services/userService";
import {useNavigate} from "react-router-dom";
import {ClassLister} from "../components/class_lister";

export default function LecturesHomePage() {
  const [allLectures, setAllLectures] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading,setIsLoading] = useState(false);
  const history = useNavigate();

  const searchClasses = async (term)=> {
      try {
          const classes = await searchClassesService(term);
          setAllLectures(classes);
      }
      catch (e){
          setErrorMessage(e.message.toString());
      }
  }

  useEffect(() => {
      const isLoggedIn = checkLogin();
      if(!isLoggedIn){
          console.log("not logged in");
          history("/login");
          return
      }
      try {
          setIsLoading(true);
          getAllClasses().then(allClasses=>{
              setIsLoading(false);
              setAllLectures(allClasses);
          });

      }
      catch (e){
          setIsLoading(false);
          setErrorMessage(e.message.toString());
      }

  }, []);

  return (
    <div className="bg-gray-200 min-h-screen">
      <MenteeHeader search={true} onSearch={searchClasses} createLecture={true} />
        <div className="courses mt-4 ">
          {/* the title first */}
          <div className="title text-3xl font-semibold text-gray-700 px-12 py-10 lg:px-40 md:px-20 text-center">
            Discover Courses
          </div>
          <ClassLister lectures={allLectures} isLoading={isLoading} />
        </div>
      <div className="footer w-full  ">
        <Footer />
      </div>
    </div>
  );
}
