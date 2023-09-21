// here we will implement the lecture card component
// now we import icons from fontawesome
// we will use the star icon to favorite the lecture
// we will use the clock icon to show the duration of the lecture
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Link, useNavigate} from "react-router-dom";
import {
  faStopwatch,
  faDollar,
  faCalendar,
  faClock, faTrash, faEdit,
} from "@fortawesome/free-solid-svg-icons";
import {defaultThumbnail} from "../constants";
import PromptDialog from "./delete_dialog";
import {deleteClass} from "../services/classesService";
import {withdrawPayment} from "../services/payment_service";
export default function LectureCard(props) {
  const history = useNavigate();
  const saveLectureId = () => {
    localStorage.setItem("current_lecture",props.id);
    history("/lecture");
  }
  return (
      <div onClick={saveLectureId} className="lecture-card bg-white flex w-10/12 gap-4 mx-auto my-1 relative px-5 py-4  lg:w-8/12 rounded shadow-md shadow-gray-400 cursor-pointer">
        <div className="lecture-image">
          <img src={defaultThumbnail} alt="lecture" className="h-40" />
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
          {!props.isStudent && props.isMyCourse && <div className="z-50 text-gray-700 font-semibold absolute bottom-4 right-5">
            <button onClick={(e)=>{
              e.stopPropagation();
            }} className="mr-3 bg-blue-600 transition delay-50 text-lg text-white px-3 py-1 font-semibold rounded"></button>
          </div>}
          {props.isStudent && props.isMyCourse && <div className="z-50 text-gray-700 font-semibold absolute bottom-4 right-5">
            <PromptDialog lectureId={props.id} title={"Withdraw Payment"} description={"Are you sure you want to withdraw from the lecture? This action can't be undone"} onPressFunction={withdrawPayment}/>
          </div>}
            {props.isMyCourse && !props.isStudent && <div className="z-50 text-gray-700 font-semibold absolute bottom-4 right-5">
            <button onClick={(e)=>{
              e.stopPropagation();
              localStorage.setItem("current_lecture",props.id);
              history("/enrolled-students");
            }} className="mr-3 bg-blue-600 transition delay-50 text-lg text-white px-3 py-1 font-semibold rounded">Enrolled Students</button>
            <button onClick={(e)=>{
              e.stopPropagation();
              localStorage.setItem("current_lecture",props.id);
              localStorage.setItem("is_edit","true");
              history("/create");
            }} className="mr-3 bg-blue-600 transition delay-50 text-lg text-white px-3 py-1 font-semibold rounded">Edit Course</button>
              <PromptDialog lectureId={props.id} title={"Delete Course"} description={"Are you sure you want to delete the lecture? This action can't be undone"} onPressFunction={deleteClass}/>
          </div>}
        </div>
      </div>
  );
}
