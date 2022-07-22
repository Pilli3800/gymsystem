import React, { useState } from "react";
import { Form, Dropdown, DropdownButton, Button } from "react-bootstrap";

const RegistroSocio = () => {
  const [tipoPlanMostrar, settipoPlanMostrar] = useState(
    "No se ha seleccionado."
  );
  const [values, setValues] = useState({
    nombres: "",
    apellidos: "",
    dni: "",
    fechaInicio: "",
    tipoPlan: "",
  });

  const handleInputChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
  };

  const handleSelect = (e) => {
    console.log(e);
    values.tipoPlan = e;
    settipoPlanMostrar(e);
  };

  return (
    <>
      <h1>Registro de Socio Nuevo</h1>
      <Form.Label>Nombre(s) del Socio</Form.Label>
      <Form.Control
        type="text"
        id="inputNombres"
        onChange={handleInputChange}
        name="nombres"
        value={values.nombres}
      />
      <br></br>
      <Form.Label>Apellidos del Socio</Form.Label>
      <Form.Control
        type="text"
        id="inputApellidos"
        name="apellidos"
        value={values.apellidos}
        onChange={handleInputChange}
      />
      <br></br>
      <Form.Label>DNI del Socio</Form.Label>
      <Form.Control
        type="text"
        id="inputDNI"
        name="dni"
        value={values.dni}
        onChange={handleInputChange}
      />
      <br></br>
      <Form.Label>Fecha de Inicio</Form.Label>
      <Form.Control
        type="date"
        onChange={handleInputChange}
        name="fechaInicio"
        value={values.fechaInicio}
      />
      <br></br>
      <DropdownButton
        id="dropdown-basic-button"
        title="Seleccionar Plan"
        onSelect={handleSelect}
        name="tipoPlan"
      >
        <Dropdown.Item eventKey="Mensual">Mensual</Dropdown.Item>
        <Dropdown.Item eventKey="Bimensual">Bimensual</Dropdown.Item>
        <Dropdown.Item eventKey="Trimestral">Trimestral</Dropdown.Item>
        <Dropdown.Item eventKey="Semestral">Semestral</Dropdown.Item>
        <Dropdown.Item eventKey="Anual">Anual</Dropdown.Item>
      </DropdownButton>
      <br></br>
      <h4>Plan seleccionado:</h4><p>{tipoPlanMostrar}</p>
      <br></br>
      <Button variant="info" onClick={handleSubmit}>
        Registrar
      </Button>{" "}
    </>
  );
};

export default RegistroSocio;
