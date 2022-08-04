import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import RegistroSocio from "./pages/registro-socio/RegistroSocio";
import Reporte from "./pages/reporte/Reporte";
import EditarSocio from "./pages/editar-socio/EditarSocio";
import AsistenciaSocio from "./pages/asistencia-socio/AsistenciaSocio";
import Login from "./pages/login/Login";
import { useState } from "react";
import UserRoutes from "./UserRoutes";
import PrivateRoutes from "./PrivateRoute";
import Recuperar from "./pages/recuperar/Recuperar";

function App() {
  const [user, setUser] = useState(null);

  return (
    <>
      <div className="App">
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/recuperar" element={<Recuperar/>} />
          <Route element={<PrivateRoutes />}>
            <Route exact path="/user/*" element={<UserRoutes />} />
          </Route>
          <Route path="*" element={<Navigate to="/login"/>}/>
        </Routes>
      </div>
    </>
  );
}

export default App;
