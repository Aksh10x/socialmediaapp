import React from "react";
import {BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./pages/mainpage";
import Login from "./pages/login";
import Navbar from "./components/navbar";
import CreatPost from "./pages/create-post/createpost";

function App() {
  return (
  <div className="">
     <Router>
      <div className="flex justify-center items-center">
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
