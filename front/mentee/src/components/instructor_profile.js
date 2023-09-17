import {defaultPersonProfile} from "../constants";


export default function InstructorProfile(props){
    return (
        <div className="lecture-instructor flex items-center gap-4 mt-4">
            <div className="instructor-image">
                <img src={defaultPersonProfile} alt="instructor" className="h-16" />
            </div>
            <div>
                <div className="instructor-name text-gray-700 font-semibold">
                    {props.name}
                </div>

                <div className="instructor-email text-gray-600 font-normal">
                    {props.email}
                </div>
            </div>
        </div>
    )
}