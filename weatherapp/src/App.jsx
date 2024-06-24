import { Routes, Route } from "react-router-dom";
import "./App.css";
import Form from "./components/Form";
import Previsoes from "./components/Previsoes";
import Navbar from "./components/Navbar/";
import Breadcrumb from "./components/Breadcrumb/";
import { ToastContainer } from "react-toastify";
import { ConfigProvider } from "antd";

function App() {
  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            fontFamily: "TT Supermolot",
          },
        }}
      >
        <Navbar />
        <Breadcrumb />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Previsoes />} />
          <Route path="/cadastrar" element={<Form />} />
          <Route path="/editar/:id" element={<Form />} />
        </Routes>
      </ConfigProvider>
    </>
  );
}

export default App;
