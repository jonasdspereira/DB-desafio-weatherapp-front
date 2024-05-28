import { useState } from "react";
import "./App.css";
import Form from "./components/Form";
import Navbar from "./components/Navbar/";
import Breadcrumb from "./components/Breadcrumb/";
import { ToastContainer } from "react-toastify";


function App() {
  return (
    <>
      <Navbar />
      <Breadcrumb />
      <ToastContainer />
      <Form />
    </>
  );
}

export default App;
