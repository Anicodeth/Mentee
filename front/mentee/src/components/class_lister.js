import LectureCard from "./lecture_card";
import {Skeleton} from "@chakra-ui/react";

export function ClassLister(props){
    const getClassesList = ()=>{
            if(props.lectures && props.lectures.length === 0){
                return (
                    <div className="text-2xl font-normal m-auto justify-center items-center ">
                        No Classes to show.
                    </div>
                )
            }
            else if(props.lectures && props.lectures.length > 0) return <div className="flex flex-col">
                {props.lectures.map((lecture) => {
                    return (
                        <LectureCard
                            image={lecture.thumbnail}
                            title={lecture.name}
                            description={lecture.description}
                            price={lecture.price}
                            date={lecture.schedule.substring(0, 10)}
                            duration={"2 hours"}
                            time={lecture.schedule.substring(11, 19)}
                            id={lecture._id}
                            isMyCourse={props.isMyCourse}
                        />);
                })
    })
            </div>

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
        {getClassesList()}

        {/*{!props.isLoading && !props.lectures && <div className="lecture-detail mx-auto my-40 flex justify-center">*/}
        {/*    <div className="text-2xl font-normal text-red-700 m-auto justify-center items-center ">*/}
        {/*        An error occurred. Please try again*/}
        {/*    </div>*/}
        {/*</div>}*/}
    </div>
}