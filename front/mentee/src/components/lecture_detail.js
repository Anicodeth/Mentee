import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStopwatch,
  faDollar,
  faCalendar,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useParams } from "react-router-dom";

export default function LectureDetail(props) {
  let lectureId = useParams().id;
  return (
    <div className="lecture-detail w-10/12 m-auto mt-10 bg-white lg:w-8/12">
      <div className="lecture-image w-full">
        <img src={props.thumbnail} alt="lecture thumbnail" className="w-full" />
      </div>
      <div className="lecture-content flex flex-col gap-4 p-4 relative">
        <div className="lecture-title text-3xl font-bold text-gray-700">
          {props.title}
        </div>
        <div className="lecture-description text-gray-600">
          {props.description}
        </div>

        <div className="lecture-instructor flex items-center gap-4 mt-4">
          <div className="instructor-image">
            <img src={props.image} alt="instructor" className="w-20" />
          </div>
          <div>
            <div className="instructor-name text-gray-700 font-semibold">
              {props.instructorName}
            </div>

            <div className="instructor-email text-gray-600 font-normal">
              {props.instructorEmail}
            </div>
          </div>
        </div>

        <div className="lecture-date text-gray-600 flex items-center gap-4 mt-4">
          <div className="text-gray-900 font-bold bg-gray-200 px-4 py-1 shadow">
            <FontAwesomeIcon icon={faCalendar} className="mr-4" />
            Date
          </div>
          <div className="date text-gray-700 font-semibold">{props.date}</div>
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
        <div className="lecture-button flex justify-center mt-">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-xl">
            Enroll
          </button>
          <Link to={"/status/" + lectureId}>
            <button className="bg-green-500 ml-4 hover:bg-green-700 text-white font-bold py-2 px-4 rounded text-xl">
              Join (for trial)
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
