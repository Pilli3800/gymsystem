import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import "./Inicio.css";

const Inicio = () => {
  let navigate = useNavigate();
  const handleClick = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };
  return (
    <div className="inicio-container">
      <div className="text-container">
        <h1>Bienvenido a GymSystem</h1>
        <p>Versión 1.0</p>
      </div>
      <Button variant="danger" onClick={handleClick}>
        Cerrar Sesión
      </Button>
      <p>💡 Cualquier problema o duda, contactar: <a href="mailto:l.alvarezaguilar448@gmail.com">l.alvarezaguilar448@gmail.com</a> </p>
    </div>
  );
};

export default Inicio;
