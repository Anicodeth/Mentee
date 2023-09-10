import Footer from "../components/footer";
import { useState, useEffect } from "react";
import MenteeHeader from "../components/mentee_header.js";
import LectureCard from "../components/lecture_card";
import { localIp } from "../constants";
import {getAllClasses, searchClasses as searchClassesService} from "../services/classesService" ;

export default function LecturesHomePage() {
  const [allLectures, setAllLectures] = useState(null);
  const [errorMessage, setErrorMessage] = useState("")

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
      try {
          getAllClasses().then(allClasses=>{
              setAllLectures(allClasses);
          });

      }
      catch (e){
          setErrorMessage(e.message.toString());
      }

  }, []);

  return (
    <div className="bg-gray-200 min-h-screen">
      <MenteeHeader search={true} onSearch={searchClasses} createLecture={true} />
      {allLectures !== null ? (
        <div className="courses mt-4 ">
          {/* the title first */}
          <div className="title text-4xl font-semibold text-gray-700 px-12 py-10 lg:px-40 md:px-20 text-center">
            Our Lectures
          </div>
          <div className="flex flex-col gap-2">
              {allLectures.length === 0 ? <div className="text-center py-20 text-2xl">
                  No classes found
              </div>:allLectures.map((lecture) => {
                  return (
                      <LectureCard
                          image={lecture.thumbnail}
                          title={lecture.name}
                          description={lecture.description}
                          price={lecture.price}
                          date={lecture.schedule.substring(0,10)}
                          duration={"2 hours"}
                          time={lecture.schedule.substring(11,19)}
                          id={allLectures.indexOf(lecture)}
                      />
                  );
              })}
          </div>
        </div>
      ) : (
        <div className="lecture-detail mx-auto mt-40 flex justify-center">
          <div className="text-2xl font-semibold m-auto justify-center items-center ">
            Loading...
          </div>
        </div>
      )}
      <div className="footer w-full  ">
        <Footer />
      </div>
    </div>
  );
}
