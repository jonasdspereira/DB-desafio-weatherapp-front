import { Routes, Route } from "react-router-dom";
import "./App.css";
import Form from "./components/Form";
import Previsoes from "./components/Previsoes";
import Navbar from "./components/Navbar/";
import Breadcrumb from "./components/Breadcrumb/";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <Navbar />
      <Breadcrumb />
      <ToastContainer />
      <Routes>
        <Route path="/cadastro" element={<Form />} />
        <Route path="/previsoes" element={<Previsoes />} />
      </Routes>
    </>
  );
}

export default App;
