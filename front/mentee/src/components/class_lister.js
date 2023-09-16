import LectureCard from "./lecture_card";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";

export function ClassLister(props){
    const getClassesList = ()=>{
            if(props.lectures && props.lectures.length === 0){
                return (
                    <div className="text-2xl font-normal m-auto justify-center items-center ">
                        No Classes to show.
                    </div>
                )
            }
            else if(props.lectures && props.lectures.length > 0) return props.lectures.map((lecture) => {
                return (
                    <LectureCard
                        image={lecture.thumbnail}
                        title={lecture.name}
                        description={lecture.description}
                        price={lecture.price}
                        date={lecture.schedule.substring(0,10)}
                        duration={"2 hours"}
                        time={lecture.schedule.substring(11,19)}
                        id={lecture._id}
                    />
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

        {/*{!props.isLoading && !props.lectures && <div className="lecture-detail mx-auto my-40 flex justify-center">*/}
        {/*    <div className="text-2xl font-normal text-red-700 m-auto justify-center items-center ">*/}
        {/*        An error occurred. Please try again*/}
        {/*    </div>*/}
        {/*</div>}*/}
    </div>
}