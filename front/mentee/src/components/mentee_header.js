import {Link, useNavigate} from "react-router-dom";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Profile from "./profile";
import {PrimaryButton} from "./buttons";
import {useState, useEffect, useRef} from "react";
import {localIp} from "../constants";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import {getMe} from "../services/userService";

export default function MenteeHeader(props) {
    const [profileInfo,setProfileInfo] = useState({});
    const searchRef = useRef(null);
    const isLogged = !!window.localStorage.getItem("token");


    useEffect(() => {
        if(searchRef.current !== null){
            searchRef.current.value = "";
        }

        // getting user info
       getMe().then(userInfo => {
           setProfileInfo(userInfo);
       }).catch((e)=>{
           console.log(e);
       })
}, []);
  return (
    <div className="header flex h-24 items-center px-4 gap-8 shadow-lg lg:px-40 md:px-20 lg:gap-16 relative">
      <div className="logo text-3xl font-semibold text-gray-700">Mentee</div>
      {props.search && (
        <div className="search-bar flex gap-4">
          <input
              onKeyDown={(event)=>{
                  if(event.code==="Enter"){
                      // searchRef.current.value = "";
                      props.onSearch(searchRef.current.value);
              }}}
              ref={searchRef}
            className="focus:outline-none border-2 border-gray-400 px-8 py-2 rounded-3xl text-gray-600 bg-gray-100"
            type="text"
            placeholder="Search for a course"
          />
            <button onClick={()=>{
                props.onSearch(searchRef.current.value)
            }} className="text-green-600"><FontAwesomeIcon icon={faSearch} size="xl"/></button>
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
        {
            isLogged ? (
                <div className="profile flex gap-5 items-center absolute right-10 cursor-pointer ">
                   <div className="profile-info flex gap-3 mr-4 border border-gray-300 px-4 py-2 bg-gray-200 rounded-3xl hover:border-gray-400 transition delay-50">
                       <div className="profile-image">
                           <img className="w-12 h-12 rounded-full" src={!profileInfo.image_src?"./images/person.png":profileInfo.image_src} alt="profile"/>
                       </div>
                       <div className="profile-name text-gray-700 font-semibold text-lg">{profileInfo.name}
                           <div className="profile-email text-gray-500 font-semibold text-sm">{profileInfo.email}</div>
                       </div>
                   </div>

                    <PrimaryButton text={"Log Out"} />
                    {/*<div className="bg-red-500 px-4 py-2 rounded text-gray-100 font-medium cursor-pointer hover:bg-red-400">Log Out</div>*/}
                </div>
            ):
            (
                <div className="profile flex gap-4 items-center absolute right-10">
                    <div className="profile-image">
                        <img className="w-12 h-12 rounded-full" src="./images/person.png" alt="profile"/>
                    </div>
                    <div className="profile-name text-gray-700 font-semibold text-lg">Guest</div>
                    <PrimaryButton text={"Log in"} />/<PrimaryButton text={"Sign up"} />
                </div>
            )
        }
    </div>
  );
}


