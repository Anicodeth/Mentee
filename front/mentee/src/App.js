import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import "./index.css";

import Home from "./screens/home.js";
import SignupPage from "./screens/signup_page.js";
import ClassPage from "./screens/class_page.js";
import ClassStatusPage from "./screens/class_status_page.js";
import LecturesHomePage from "./screens/lecture_home_page";
import LectureDetailPage from "./screens/lecture_detail_page";
import Dashboard from "./screens/dashboard";
import ProfilePage from "./screens/profile_page";
import CreateAndEditLecturePage from "./screens/create_and_edit_lecture";
import LoginPage from "./screens/login_page";
import EnrollmentPage from "./screens/enrollment_page";
import PaymentSuccess from "./screens/payment_success_page";
// 1. import `ChakraProvider` component
import { ChakraProvider } from '@chakra-ui/react'

function App() {
  return (
      <ChakraProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="signup" element={<SignupPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="class/:id/:isteacher" element={<ClassPage />} />
            <Route path="status/:id" element={<ClassStatusPage />} />
            <Route path="lectures" element={<LecturesHomePage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="lecture" element={<LectureDetailPage />} />
            <Route path="create" element={<CreateAndEditLecturePage />} />
            <Route path="enrollment" element={<EnrollmentPage />} />
            <Route path="success" element={<PaymentSuccess />} />
            <Route path="*" element={<div>404</div>} />
          </Routes>
        </BrowserRouter>
      </ChakraProvider>
  );
}

export default App;
