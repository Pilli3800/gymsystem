import React, { useState } from "react";
import "./Recuperar.css";
import { Form, Button } from "react-bootstrap";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import Swal from "sweetalert2";
import {Link} from "react-router-dom";

const Recuperar = () => {
  const [email, setemail] = useState("");

  const handleChangeEmail = (e) => {
    console.log(e.target.value);
    setemail(e.target.value);
  };

  const handleClick = (e) => {
    e.preventDefault();
    const auth = getAuth();
    if (email !== "") {
      sendPasswordResetEmail(auth, email)
        .then(() => {
          Swal.fire({
            title: "¡Recuperación exitosa!",
            text: "Se le envió un mensaje a su correo electrónico con los detalles para la recuperación.",
            icon: "success",
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          Swal.fire({
            title: "Algo pasó",
            text: `Se produjo el error: ${errorMessage}`,
            icon: "error",
            confirmButtonText: "Ok",
          });
        });
    } else {
      Swal.fire({
        title: "Campos Vacíos",
        text: `Debe colocar un correo electrónico.`,
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };
  return (
    <div className="recuperar-container">
      <div className="recuperar">
        <h3 className="text-center m-2">Recuperación/Cambio de Contraseña</h3>
        <Form>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Dirección de Correo Electrónico</Form.Label>
            <Form.Control
              type="email"
              placeholder="Ingrese su correo"
              id="email"
              onChange={handleChangeEmail}
            />
          </Form.Group>
          <Button variant="primary" type="submit" onClick={handleClick}>
            Recuperar
          </Button>
          <Link className="link-recuperar" to="/login">
            Atrás
          </Link>
        </Form>
      </div>
    </div>
  );
};

export default Recuperar;
