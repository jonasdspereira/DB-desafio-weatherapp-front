import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Form from "./components/Form/Form";
import Previsoes from "./components/Previsoes/Previsoes";
import Navbar from "./components/Navbar/Navbar";
import Breadcrumb from "./components/Breadcrumb/Breadcrumb";
import { ToastContainer } from "react-toastify";
import { ConfigProvider } from "antd";

const App: React.FC = () => {
  return (
    <>
      <ConfigProvider
        theme={{
          components: {
            Select: {
              optionSelectedColor:"var(--primary-color-azul-medio)",
              optionActiveBg: "var(--secondary-color-azul-pastel)",
              colorBorder:"var(--primary-color-branco)",
              borderRadius:5,
            },
            Input: {
              activeBorderColor:"var(--primary-color-azul-medio)",
            },
            DatePicker: {
              activeBorderColor:"var(--primary-color-azul-medio)",
            },
          },
          token: {
            fontFamily: "TT Supermolot",
            colorBorder:"var(--primary-color-azul-medio)",
            colorPrimaryHover:"var(--primary-color-azul-medio)",
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
};

export default App;
