import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStopwatch,
  faDollar,
  faCalendar,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useParams } from "react-router-dom";
import {defaultPersonProfile, defaultThumbnail} from "../constants";
import InstructorProfile from "./instructor_profile";

export default function LectureDetail(props) {
  let lectureId = useParams().id;
  return (
    <div className="lecture-detail w-10/12 m-auto mt-10 bg-white lg:w-6/12 shadow-md shadow-gray-400">
      <div className="lecture-image w-full">
        <img src={defaultThumbnail} alt="lecture thumbnail" className="w-full" />
      </div>
      <div className="lecture-content flex flex-col gap-4 px-8 relative px-8">
        <div className="lecture-title text-3xl font-bold text-gray-700">
          {props.title}
        </div>
        <InstructorProfile name={props.instructorName} email={props.instructorEmail} image={props.image} />
          <p className="text-lg font-semibold mt-4">Course Description</p>
        <div className="lecture-description text-gray-800">
          {props.description}
        </div>
        <p className="text-lg font-semibold mt-4">Course Details</p>

        <div className="lecture-date text-gray-600 flex items-center gap-4 mt-4">
          <div className="text-gray-900 font-bold bg-gray-200 px-4 py-1 shadow">
            <FontAwesomeIcon icon={faCalendar} className="mr-4" />
            Date
          </div>
          <div className="date text-gray-700 font-semibold">{props.date.substring(0,10)}</div>
        </div>
        <div className="lecture-time text-gray-600 flex items-center gap-4 mt-4">
          <div className="text-gray-900 font-bold bg-gray-200 px-4 py-1 shadow">
            <FontAwesomeIcon icon={faClock} className="mr-4" />
            Time
          </div>
          <div className="time text-gray-700 font-semibold">
            {props.startTime} - {props.endTime}
          </div>
        </div>
        <div className="lecture-duration text-gray-600 flex items-center gap-4 mt-4">
          <div className="text-gray-900 font-bold bg-gray-200 px-4 py-1 shadow">
            <FontAwesomeIcon icon={faStopwatch} className="mr-4" />
            Duration
          </div>
          <div className="duration text-gray-700 font-semibold">
            {props.duration} minutes
          </div>
        </div>
        <div className="lecture-price text-gray-600 flex items-center gap-4 mt-4">
          <div className="text-gray-900 font-bold bg-gray-200 px-4 py-1 shadow">
            <FontAwesomeIcon icon={faDollar} className="mr-4" />
            Price
          </div>
          <div className="price text-gray-700 font-semibold">{props.price}</div>
        </div>
        <div className="lecture-button flex justify-center relative top-5">
          <button onClick={props.onEnroll} className="shadow-lg transition delay-50 shadow-gray-400 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-xl">
            Enroll
          </button>
          <Link to={"/status/" + lectureId}>
            {/*<button className="shadow-md shadow-gray-400 bg-green-500 ml-4 hover:bg-green-700 text-white font-bold py-2 px-4 rounded text-xl">*/}
            {/*  Join (for trial)*/}
            {/*</button>*/}
          </Link>
        </div>
      </div>
    </div>
  );
}
