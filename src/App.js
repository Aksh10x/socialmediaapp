import React from "react";
import {BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./pages/mainpage/mainpage";
import Login from "./pages/login";
import Navbar from "./components/navbar";
import CreatPost from "./pages/create-post/createpost";

function App() {
  return (
  <div className="bg-red-500 min-h-screen">
     <Router>
      <div className="flex justify-center items-center sticky top-0 z-10">
        <Navbar/>
      </div>
      
      <Routes>
        <Route path="/" element={<Main/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/post" element={<CreatPost/>} />
      </Routes>
     </Router>
  </div>
  );
}

export default App;
