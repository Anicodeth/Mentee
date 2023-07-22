import { Link } from "react-router-dom";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function MenteeHeader(props) {
  return (
    <div className="header flex h-24 items-center px-4 gap-8 shadow-lg lg:px-40 md:px-20 lg:gap-16">
      <div className="logo text-3xl font-semibold text-gray-700">Mentee</div>
      {props.search && (
        <div className="search-bar">
          <input
            className="focus:outline-none border-2 border-gray-400 px-8 py-2 rounded-3xl text-gray-600 bg-gray-100"
            type="text"
            placeholder="Search for a course"
          />
        </div>
      )}
      {props.createLecture && (
        <div className="create-lecture-btn bg-green-600 text-white px-4 py-2 rounded-2xl flex items-center gap-2 hover:bg-green-700 cursor-pointer transition delay-50 font-semibold">
          <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
          <Link to={"/create"}>
            <div>Create a Lecture</div>
          </Link>
        </div>
      )}
    </div>
  );
}
