import "./App.css";
import { Routes, Route } from "react-router-dom";
import RegistroSocio from "./pages/registro-socio/RegistroSocio";
import Reporte from "./pages/reporte/Reporte";
import Eliminar from "./pages/eliminar-socio/Eliminar";
import EditarSocio from "./pages/editar-socio/EditarSocio";
import AsistenciaSocio from "./pages/asistencia-socio/AsistenciaSocio";

function App() {
  return (
    <>
      <div className="App">
        <Routes>
          <Route
            exact
            path="/"
            element={
              <h1 className="d-flex justify-content-center align-items-center">
                Bienvenidos al GymSystem
              </h1>
            }
          />
          <Route exact path="/registro" element={<RegistroSocio />} />
          <Route exact path="/editar" element={<EditarSocio />} />
          <Route exact path="/asistencia" element={<AsistenciaSocio />} />
          <Route exact path="/reporte" element={<Reporte />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
