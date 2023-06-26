import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import "./index.css";

import Home from "./screens/home.js";
import LoginPage from "./screens/login_page.js";
import ClassPage from "./screens/class_page.js";
import ClassStatusPage from "./screens/class_status_page.js";
import ClassesList from "./screens/classes_list.js";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="class/:id/:isteacher" element={<ClassPage />} />
        <Route path="status/:id" element={<ClassStatusPage />} />
        <Route path="classes" element={<ClassesList />} />
        <Route path="*" element={<div>404</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
