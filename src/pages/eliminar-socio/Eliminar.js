import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../services/firebase";
import Swal from "sweetalert2";
import { Container } from "react-bootstrap";

const Eliminar = () => {
  const [dniaBorrar, setdniaBorrar] = useState("");

  const handleInputChange = (e) => {
    setdniaBorrar(e.target.value);
  };

  const handleClick = async () => {
    if (dniaBorrar === "" || dniaBorrar.length < 8) {
      Swal.fire({
        title: "Debe colocar un DNI válido",
        text: "No puedes dejar el campo vacio o tener menos de 8 digitos.",
        icon: "error",
        confirmButtonText: "Ok",
      });
    } else {
      const eliminar = await deleteDoc(doc(db, "socios", dniaBorrar));
      Swal.fire({
        title: "¡Se eliminó con éxito!",
        icon: "success",
        confirmButtonText: "Ok",
      });
    }
  };

  return (
    <Container>
      <div className="m-5 text-center">
        <h1>Eliminación de un Socio</h1>
      </div>
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Ingresar el DNI del Socio"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          maxLength="8"
          onChange={handleInputChange}
          onKeyPress={(event) => {
            if (!/[0-9]/.test(event.key)) {
              event.preventDefault();
            }
          }}
          minLength="8"
        />
        <Button variant="primary" id="button-addon2" onClick={handleClick}>
          Eliminar
        </Button>
      </InputGroup>
    </Container>
  );
};

export default Eliminar;
