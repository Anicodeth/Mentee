import Footer from "../components/footer";
import CourseCard from "../components/lecture_card";
import { useState, useEffect } from "react";
import MenteeHeader from "../components/mentee_header.js";
import LectureCard from "../components/lecture_card";

export default function LecturesHomePage() {
  const [allLectures, setAllLectures] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/lectures")
      .then((res) => res.json())
      .then((data) => {
        setAllLectures(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="bg-gray-200 min-h-screen">
      <MenteeHeader search={true} createLecture={true} />
      <div className="courses mt-4 ">
        {/* the title first */}
        <div className="title text-3xl font-semibold text-gray-700 px-12 py-8 lg:px-40 md:px-20">
          Our Lectures
        </div>
        <div className="flex flex-col gap-2">
          {allLectures ? (
            allLectures.map((lecture) => {
              return (
                <LectureCard
                  image={lecture.thumbnail}
                  title={lecture.title}
                  description={lecture.description}
                  price={lecture.price}
                  date={lecture.date}
                  duration={lecture.duration}
                  time={lecture.startTime}
                  id={allLectures.indexOf(lecture)}
                />
              );
            })
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>
      <div className="footer w-full  ">
        <Footer />
      </div>
    </div>
  );
}
