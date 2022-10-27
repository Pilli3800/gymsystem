import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import PuntajeSocioVer from "./pages/puntaje-socio/PuntajeSocio";
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
          <Route exact path="/recuperar" element={<Recuperar />} />
          <Route element={<PrivateRoutes />}>
            <Route exact path="/user/*" element={<UserRoutes />} />
          </Route>
          <Route exact path="/ver-puntaje" element={<PuntajeSocioVer />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
