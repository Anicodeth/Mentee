import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import "./index.css";

import Home from "./screens/home.js";
import LoginPage from "./screens/login_page.js";
import ClassPage from "./screens/class_page.js";
import ClassStatusPage from "./screens/class_status_page.js";
import LecturesHomePage from "./screens/lecture_home_page";
import LectureDetailPage from "./screens/lecture_detail_page";
import Dashboard from "./screens/dashboard";
import ProfilePage from "./screens/profile_page";
import CreateLecture from "./components/create_lecture";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="class/:id/:isteacher" element={<ClassPage />} />
        <Route path="status/:id" element={<ClassStatusPage />} />
        <Route path="lectures" element={<LecturesHomePage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="lecture/:id" element={<LectureDetailPage />} />
        <Route path="create" element={<CreateLecture />} />
        <Route path="*" element={<div>404</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
