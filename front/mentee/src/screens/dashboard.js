import { useState, useEffect } from "react";
import LectureCard from "../components/lecture_card";
import Footer from "../components/footer";
import Profile from "../components/profile";
import MenteeHeader from "../components/mentee_header";

export default function Dashboard() {
  const [allLectures, setAllLectures] = useState([]);
  const [subscribedLectures, setSubscribedLectures] = useState([]);
  const [createdLectures, setCreatedLectures] = useState([]);
  const [profileInfo, setProfileInfo] = useState({});
  const [subscribed, setSubscribed] = useState(true);
  const [created, setCreated] = useState(false);

  useEffect(() => {
    // we should fetch for both subscribed and created lectures and set their corresponding states
    fetch("http://localhost:5000/lectures")
      .then((res) => res.json())
      .then((data) => {
        setAllLectures(data);
      })
      .catch((err) => {
        console.log(err);
      });

    // and the above fetch should be removed

    fetch("http://localhost:5000/profile")
      .then((res) => res.json())
      .then((data) => {
        setProfileInfo(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function toSubscribed() {
    setCreated(false);
    setSubscribed(true);
    setAllLectures(subscribedLectures);
  }
  function toCreated() {
    setCreated(true);
    setSubscribed(false);
    setAllLectures(createdLectures);
  }

  return (
    <div className="bg-gray-200 min-h-screen">
      <MenteeHeader search={false} />
      <div className="courses mt-4 ">
        {profileInfo ? (
          <Profile
            name={profileInfo.name}
            email={profileInfo.email}
            image={profileInfo.image_src}
          />
        ) : (
          <div>loading</div>
        )}

        <div className="flex flex-col gap-2">
          <div className="title text-2xl font-semibold text-gray-700 px-12 py-8 flex gap-1 justify-center">
            <div
              className={`py-1 cursor-pointer px-4  transition delay-50 ${
                subscribed ? "bg-gray-400 text-gray-100" : ""
              }`}
              onClick={toSubscribed}
            >
              Subscribed
            </div>{" "}
            <div
              className={`py-1 cursor-pointer px-4  transition delay-50 ${
                created ? "bg-gray-400 text-gray-100" : ""
              }`}
              onClick={toCreated}
            >
              Created
            </div>
          </div>
          {allLectures ? (
            allLectures.map((lecture) => {
              return (
                <LectureCard
                  image={lecture.thumbnail}
                  title={lecture.title}
                  description={lecture.description}
                  price={lecture.price + " (Paid)"}
                  date={lecture.date}
                  duration={lecture.duration}
                  time={lecture.startTime}
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
