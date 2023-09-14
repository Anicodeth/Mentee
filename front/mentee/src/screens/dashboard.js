import { useState, useEffect } from "react";
import LectureCard from "../components/lecture_card";
import Footer from "../components/footer";
import Profile from "../components/profile";
import MenteeHeader from "../components/mentee_header";
import { localIp } from "../constants";
import {getAllClasses, searchClasses as searchClassesService} from "../services/classesService";
import {checkLogin, getMe} from "../services/userService";
import {useNavigate} from "react-router-dom";
import {ClassLister} from "../components/class_lister";

export default function Dashboard() {
  const [allLectures, setAllLectures] = useState(null);
  const [upcomingLectures, setUpcomingLectures] = useState(null);
  const [completedLectures, setCompletedLectures] = useState(null);
  const [profileInfo, setProfileInfo] = useState({});
  const [subscribed, setSubscribed] = useState(true);
  const [created, setCreated] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading,setIsLoading] = useState(true);
  const history = useNavigate();

  const [totalLectures, setTotalLectures] = useState(0);
  const [pageNumbers, setPageNumbers] = useState([]);
  const lecturesPerPage = 1;

    const searchClasses = async (term)=> {
        try {
            const classes = await searchClassesService(term);
            setAllLectures(classes);
        }
        catch (e){
            setErrorMessage(e.message.toString());
        }
    }


    void function generatePageNumbers(start){
    let curPageNumbers = [];
    for (let i = start; i <= Math.ceil(totalLectures / lecturesPerPage); i++) {
        curPageNumbers.push(i);
        if(curPageNumbers.length === 4){
            break;
        }
        setPageNumbers(curPageNumbers);
    }
    };

  useEffect(() => {
      const isLoggedIn = checkLogin();

      if(!isLoggedIn){
          console.log("not logged in");
          history("/login");
          return
      }

      setIsLoading(true);
      // we should fetch for both subscribed and created lectures and set their corresponding states
      getAllClasses().then((classes)=>{
          setIsLoading(false);
          setUpcomingLectures(classes);
          setAllLectures(classes);
          setTotalLectures(classes.length);
      }).catch((e)=>{
          setIsLoading(false);
          console.log(e);
      })

      getMe().then(userInfo=>{
          setProfileInfo(userInfo);
      }).catch((e)=>{
          console.log(e);
      })

  }, []);


  function toUpcoming() {
    setCreated(false);
    setSubscribed(true);
    setAllLectures(upcomingLectures);
  }
  function toCompleted() {
    setCreated(true);
    setSubscribed(false);
    setAllLectures(completedLectures);
  }


  return (
    <div className="bg-gray-200 min-h-screen">
      <MenteeHeader search={true} onSearch={searchClasses} profileInfo={profileInfo}/>
      <div className="courses mt-4 ">
        <div className="flex flex-col gap-2">
          <div className="title text-2xl font-semibold text-gray-700 px-12 py-8 flex gap-1 justify-center">
            <div
              className={`py-1 cursor-pointer px-4  transition delay-50 ${
                subscribed ? "bg-gray-400 text-gray-100" : ""
              }`}
              onClick={toUpcoming}
            >
              {profileInfo.role === "student" ? "Subscribed" : "Created"}
            </div>{" "}
            <div
              className={`py-1 cursor-pointer px-4  transition delay-50 ${
                created ? "bg-gray-400 text-gray-100" : ""
              }`}
              onClick={toCompleted}
            >
              Completed
            </div>
          </div>
          <ClassLister lectures={allLectures} isLoading={isLoading}/>
        </div>
      </div>
      <nav className="flex items-center justify-center mt-12">
        <ul className="flex space-x-2 items-center gap-5">
            <li className="text-blue-700 cursor-pointer hover:text-blue-900 text-xl">Previous</li>
          {pageNumbers.map(page => (
              <li key={page}>
                <button
                    className={`px-4 py-2 rounded-full ${
                        currentPage === page
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-blue-100'
                    } focus:outline-none transition-colors duration-300`}
                >
                  {page}
                </button>
              </li>
          ))}
            <li className="text-blue-700 cursor-pointer hover:text-blue-900 text-xl">Next</li>
        </ul>
      </nav>

      <div className="footer w-full  ">
        <Footer />
      </div>
    </div>
  );
}