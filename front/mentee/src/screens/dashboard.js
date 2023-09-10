import { useState, useEffect } from "react";
import LectureCard from "../components/lecture_card";
import Footer from "../components/footer";
import Profile from "../components/profile";
import MenteeHeader from "../components/mentee_header";
import { localIp } from "../constants";

export default function Dashboard() {
  const [allLectures, setAllLectures] = useState(null);
  const [upcomingLectures, setUpcomingLectures] = useState([]);
  const [completedLectures, setCompletedLectures] = useState([]);
  const [profileInfo, setProfileInfo] = useState({});
  const [subscribed, setSubscribed] = useState(true);
  const [created, setCreated] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [totalLectures, setTotalLectures] = useState(0);
  const [pageNumbers, setPageNumbers] = useState([]);
  const lecturesPerPage = 1;

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
    // we should fetch for both subscribed and created lectures and set their corresponding states
    fetch(localIp + "/classes", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("token")
        }
    })
      .then((res) => res.json())
      .then((data) => {
        setUpcomingLectures(data);
        setAllLectures(data);
        setTotalLectures(data.length);
      })
      .catch((err) => {
        console.log(err);
      });

    fetch(localIp + "/users/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token")
      }
    })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setProfileInfo(data);
        })
        .catch((err) => {
          console.log(err);
        });
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
      <MenteeHeader search={false} profileInfo={profileInfo}/>
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
          {allLectures && allLectures.length === 0 && (
            <div className="lecture-detail mx-auto mt-40 flex justify-center">
              <div className="text-2xl font-semibold m-auto justify-center items-center ">
                No lectures to show
              </div>
            </div>
          )}
          {allLectures ? (
            allLectures.map((lecture) => {
              return (
                <LectureCard
                  image={lecture.thumbnail}
                  title={lecture.name}
                  description={lecture.description}
                  price={lecture.price + " (Paid)"}
                  date={lecture.schedule.substring(0, 10)}
                  duration={"2 hours"}
                  time={lecture.schedule.substring(11,19)}
                />
              );
            })
          ) : (
            <div className="lecture-detail mx-auto mt-40 flex justify-center">
              <div className="text-2xl font-semibold m-auto justify-center items-center ">
                Loading...
              </div>
            </div>
          )}
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

// dashboard contents for student
// - completed lectures
// - subscribed/upcoming lectures

// dashboard contents for teacher
// - created/upcoming lectures
// - completed lectures

// common contents
// a side bar for navigation
// navigation to:
// - account settings
// - logout
