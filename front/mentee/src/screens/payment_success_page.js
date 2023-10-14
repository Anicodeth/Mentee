import MenteeHeader from "../components/mentee_header";
import Footer from "../components/footer";
import {SecondaryButton} from "../components/buttons";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {confirmEnrollment} from "../services/enrollmentService";

export default function PaymentSuccess(){
    const history = useNavigate();
    const textRef = localStorage.getItem("text_ref");
    void useEffect(()=>{
        if(textRef){
            confirmEnrollment(textRef).then(res=>{
                console.log(res);
            }).catch(e=>{
                console.log("Error while confirming enrollment",e);
            });
        }
    },[])
    return   <div className="bg-gray-200 min-h-screen flex flex-col justify-between">
        <MenteeHeader search={false} />
        <div className="flex justify-center items-center">
            <div className="mx-4 py-8 bg-white rounded-lg shadow-lg p-6 flex flex-col gap-4 items-center">
                <div className="text-2xl font-semibold text-green-500 mb-4">
                    Payment Successfully Completed
                </div>
                <div className="text-gray-600 text-lg mb-8">
                    You have successfully registered for the class.
                </div>
                <SecondaryButton text={"Go Back"} onPress={()=>{
                    history("/lecture");
                }} />
            </div>
        </div>
        <div>
            <Footer />
        </div>
    </div>
}