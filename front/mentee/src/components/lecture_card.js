// here we will implement the lecture card component
// now we import icons from fontawesome
// we will use the star icon to favorite the lecture
// we will use the clock icon to show the duration of the lecture
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import {
  faStopwatch,
  faDollar,
  faCalendar,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
export default function LectureCard(props) {
  let lectureId = parseInt(props.id) + 1;
  lectureId = lectureId.toString();
  return (
    <Link to={"/lecture/" + lectureId}>
      <div className="lecture-card bg-white overflow-hidden flex w-10/12 gap-4 m-auto relative p-4 lg:w-8/12 rounded shadow cursor-pointer">
        <div className="lecture-image">
          <img src={props.image} alt="lecture" className="w-60" />
        </div>
        <div className="lecture-content flex flex-col gap-2 ">
          <div className="lecture-title text-xl font-bold text-gray-700">
            {props.title}
          </div>
          <div className="lecture-description text-gray-600">
            {props.description}
          </div>

          <div className="flex gap-8">
            <div className="lecture-date text-gray-600">
              <FontAwesomeIcon icon={faCalendar} className="mr-2 text-black" />
              {"Date: "}
              {props.date}
            </div>
            <div className="lecture-time text-gray-600">
              <FontAwesomeIcon icon={faClock} className="mr-2 text-black" />
              {"Time: "}
              {props.time}
            </div>
          </div>
          <div className="lecture-duration text-gray-600">
            <FontAwesomeIcon icon={faStopwatch} className="mr-2 text-black" />
            {"Duration: "}
            {props.duration}
          </div>
          <div className="lecture-price text-gray-700 font-semibold absolute top-0 right-5">
            <FontAwesomeIcon icon={faDollar} className="mr-2 text-black" />
            {props.price}
          </div>
        </div>
      </div>
    </Link>
  );
}
