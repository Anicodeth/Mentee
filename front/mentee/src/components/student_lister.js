import LectureCard from "./lecture_card";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";
import InstructorProfile from "./instructor_profile";

export function StudentLister(props){
    const getClassesList = ()=>{
            if(props.students && props.students.length === 0){
                return (
                    <div className="text-2xl font-normal m-auto justify-center items-center ">
                        No enrolled students to show.
                    </div>
                )
            }
            else if(props.students && props.students.length > 0) return props.students.map((student) => {
                return (
                    <InstructorProfile name={student.name} email={student.email}  />
                );
            })

            else if(props.isLoading) {
                return <div className="lecture-detail mx-auto mt-40 flex justify-center">
                    <div className="text-2xl font-semibold m-auto justify-center items-center ">
                        <FontAwesomeIcon icon={faSpinner}/>
                    </div>
                </div>
            }
            else {
                return (
                    <div className="text-2xl font-normal m-auto justify-center items-center ">
                        An error occurred. Please try again.
                    </div>
                )
            }
    }
    return <div className="flex flex-col gap-2">
        {getClassesList()}

        {/*{!props.isLoading && !props.students && <div className="lecture-detail mx-auto my-40 flex justify-center">*/}
        {/*    <div className="text-2xl font-normal text-red-700 m-auto justify-center items-center ">*/}
        {/*        An error occurred. Please try again*/}
        {/*    </div>*/}
        {/*</div>}*/}
    </div>
}