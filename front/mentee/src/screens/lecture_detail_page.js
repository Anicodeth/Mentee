import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import LectureDetail from "../components/lecture_detail";
import Footer from "../components/footer";
import MenteeHeader from "../components/mentee_header";
import { localIp } from "../constants";

export default function LectureDetailPage() {
  const lectureId = useParams().id;
  const [lectureDetail, setLectureDetail] = useState(null);

  useEffect(() => {
    fetch(localIp + "/lecture/" + lectureId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setLectureDetail(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  // title, image, instructorName, date, duration, description, isActive
  return (
    <div className="bg-gray-200 min-h-screen">
      <MenteeHeader search={false} />
      {lectureDetail ? (
        <LectureDetail
          title={lectureDetail.title}
          image={lectureDetail.instructor.image_src}
          instructorName={lectureDetail.instructor.name}
          instructorEmail={lectureDetail.instructor.email}
          date={lectureDetail.date}
          duration={lectureDetail.duration}
          description={lectureDetail.description}
          thumbnail={lectureDetail.thumbnail}
          startTime={lectureDetail.startTime}
          endTime={lectureDetail.endTime}
          price={lectureDetail.price}
        />
      ) : (
        <div className="lecture-detail mx-auto mt-40 flex justify-center">
          <div className="text-2xl font-semibold m-auto justify-center items-center ">
            Loading...
          </div>
        </div>
      )}
      <div className="">
        <Footer />
      </div>
    </div>
  );
}
