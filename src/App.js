import "./App.css";
import {Routes, Route} from 'react-router-dom'
import RegistroSocio from "../src/pages/registro-socio/RegistroSocio"
import Reporte from "./pages/reporte/Reporte";

function App() {
  return (
    <>
        <div className="App">
          <Routes>
            <Route exact path="/registro" element={<RegistroSocio/>} />
            <Route exact path="/reporte" element={<Reporte/>} />
          </Routes>
        </div>
    </>
  );
}

export default App;
