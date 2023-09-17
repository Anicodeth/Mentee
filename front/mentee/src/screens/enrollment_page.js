// this page is to complete the enrollment process including payment

import MenteeHeader from "../components/mentee_header";
import Footer from "../components/footer";

export default function EnrollmentPage(){
    return <div>
        <div className="bg-gray-200 min-h-screen">
            <MenteeHeader search={false} />
            <div className="w-full flex justify-center items-center">
                <div className="w-1/2 h-96 my-20  bg-white rounded-lg shadow-lg">
                </div>
            </div>
            <div className="">
                <Footer />
            </div>
        </div>
    </div>
}
