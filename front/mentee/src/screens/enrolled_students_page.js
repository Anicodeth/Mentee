import MenteeHeader from "../components/mentee_header";
import {ClassLister} from "../components/class_lister";
import Footer from "../components/footer";
import {StudentLister} from "../components/student_lister";
import {getEnrolledStudents} from "../services/enrollmentService";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {checkLogin} from "../services/userService";

export default function EnrolledStudentsListerPage() {
    const [allStudents, setAllStudents] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading,setIsLoading] = useState(false);
    const [isError,setIsError] = useState(false);
    const [isSuccess,setIsSuccess] = useState(false);
    const history = useNavigate();
    const classId = localStorage.getItem("current_lecture");

    useEffect(() => {
        const isLoggedIn = checkLogin();
        if(!isLoggedIn){
            console.log("not logged in");
            history("/login");
            return
        }
            setIsLoading(true);
            setIsError(false);
            setIsSuccess(false);
            getEnrolledStudents(classId).then(allStudents=>{
                setIsLoading(false);
                setIsSuccess(true);
                setAllStudents(allStudents);
            }).catch(e=>{
                setIsLoading(false);
                setIsError(true);
                setErrorMessage(e.message.toString());
            });
    },[]);
    return (
        <div className="bg-gray-200 min-h-screen">
            <MenteeHeader />
            <div className="courses mt-4 ">
                <div className="flex flex-col gap-2">
                    <div className="title text-2xl font-semibold text-gray-700 px-12 py-8 flex gap-1 justify-center">
                        <div>Enrolled Students</div>
                    </div>
                    <StudentLister students={allStudents} isLoading={isLoading}/>
                </div>
            </div>
            <div className="footer w-full  ">
                <Footer />
            </div>
        </div>
    );
}