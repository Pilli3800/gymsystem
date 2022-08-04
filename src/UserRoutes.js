import "./UserRoutes.css";
import { Routes, Route, Navigate } from "react-router-dom";
import RegistroSocio from "./pages/registro-socio/RegistroSocio";
import Reporte from "./pages/reporte/Reporte";
import EditarSocio from "./pages/editar-socio/EditarSocio";
import AsistenciaSocio from "./pages/asistencia-socio/AsistenciaSocio";
import Login from "./pages/login/Login";
import { useState } from "react";
import Navbar from "./ui/components/navbar/Navbar";
import Inicio from "./pages/inicio/Inicio";

function App() {
  const [user, setUser] = useState(null);

  return (
    <>
      <Navbar />
      <div className="UserRoutes">
        <Routes>
          <Route exact path="inicio" element={<Inicio/>} />
          <Route exact path="registro" element={<RegistroSocio />} />
          <Route exact path="editar" element={<EditarSocio />} />
          <Route exact path="asistencia" element={<AsistenciaSocio />} />
          <Route exact path="reporte" element={<Reporte />} />
          <Route path="*" element={<Navigate replace to="inicio" />} /> 
        </Routes>
      </div>
    </>
  );
}

export default App;
