import "./App.css";
import {Routes, Route} from 'react-router-dom'
import RegistroSocio from "../src/pages/registro-socio/RegistroSocio"
import ActualizacionSocio from "./pages/actualizacion-socio/ActualizacionSocio";

function App() {
  return (
    <>
        <div className="App">
          <Routes>
            <Route exact path="/registro" element={<RegistroSocio/>} />
            <Route exact path="/actualizacion" element={<ActualizacionSocio/>} />
          </Routes>
        </div>
    </>
  );
}

export default App;
