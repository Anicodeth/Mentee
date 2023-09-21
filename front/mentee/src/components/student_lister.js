import LectureCard from "./lecture_card";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";
import InstructorProfile from "./instructor_profile";
import {Skeleton} from "@chakra-ui/react";

export function StudentLister(props){
    const getStudentsList = ()=>{
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
                var loading = [];
                for (let i = 0; i < 4; i++) {
                    loading.push(
                        <div className="w-full flex flex-col items-center justify-center">
                            <Skeleton width="60%" height="200px" fadeDuration={4}/>
                        </div>
                    );
                }
                return loading;
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
        {getStudentsList()}
    </div>
}