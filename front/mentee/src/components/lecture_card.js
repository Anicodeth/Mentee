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
  localStorage.setItem("current_lecture",props.id);
  return (
    <Link to={"/lecture"}>
      <div className="lecture-card bg-white flex w-10/12 gap-4 mx-auto my-1 relative px-5 py-12 lg:w-8/12 rounded shadow-md shadow-gray-400 cursor-pointer">
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
          <div className="lecture-price text-gray-700 font-semibold absolute top-4 right-5">
            <FontAwesomeIcon icon={faDollar} className="mr-2 text-black" />
            {props.price}
          </div>
        </div>
      </div>
    </Link>
  );
}
