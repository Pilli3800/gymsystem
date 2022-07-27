import "./App.css";
import {Routes, Route} from 'react-router-dom'
import RegistroSocio from "./pages/registro-socio/RegistroSocio"
import Reporte from "./pages/reporte/Reporte";
import Eliminar from "./pages/eliminar-socio/Eliminar";

function App() {
  return (
    <>
      <div className="App">
        <Routes>
          <Route exact path="/registro" element={<RegistroSocio />} />
          <Route exact path="/eliminar" element={<Eliminar/>} />
          <Route exact path="/reporte" element={<Reporte />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
