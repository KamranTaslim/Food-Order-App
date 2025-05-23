import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import Add from "./pages/Add/Add";
import { Routes, Route } from "react-router-dom";
import List from "./pages/List/List";
import Orders from "./pages/Orders/Orders";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const App = () => {
 const url = "https://foodorderapp.live/";
  return (
    <div>
      <ToastContainer />
      <Navbar />
      <hr />
      <div className="app-content">
        <Sidebar />
       <Routes>
  <Route path="/" element={<List />} />  {/* Add this line */}
  <Route path="/add" element={<Add />} />
  <Route path="/list" element={<List />} />
  <Route path="/orders" element={<Orders url={url} />} />
</Routes>
      </div>
    </div>
  );
};

export default App;
