import React, { useState } from "react";
import { Form, Dropdown, DropdownButton, Button } from "react-bootstrap";
//import { collection, addDoc } from "firebase/firestore";
import { db } from "../../services/firebase";
import { doc, setDoc } from "firebase/firestore";
import Swal from 'sweetalert2';

const RegistroSocio = () => {
  const [tipoPlanMostrar, settipoPlanMostrar] = useState(
    "No se ha seleccionado un plan."
  );
  const [fechaFinMostrar, setfechaFinMostrar] = useState(
    "No se ha seleccionado una fecha."
  );
  const planMensual = 1;
  const planBimestral = 2;
  const planTrimestral = 3;
  const planSemestral = 6;
  const planAnual = 12;

  const [values, setValues] = useState({
    nombres: "",
    apellidos: "",
    dni: "",
    fechaInicio: "",
    fechaFin: "",
    tipoPlan: "",
    monto: "",
  });

  const addSocio = async (linkObject) => {
    // const db = getDatabase();
    // set(ref(db, "socios/ " + linkObject.dni), linkObject);
    try {
      const docRef = await setDoc(doc(db, "socios/", linkObject.dni), {
        linkObject
      });
      console.log("Socio registrado con el ID: ", linkObject.dni);
      Swal.fire({
        title: '¡Socio Agregado!',
        text: 'El socio ha sido agregado.',
        icon: 'success',
        confirmButtonText: 'Cool'
      })
    } catch (e) {
      console.error("Error al registrar socio: ", e);
      Swal.fire({
        title: 'Error!',
        text: '¡El socio ya existe!',
        icon: 'error',
        confirmButtonText: 'Ok'
      })
    }
    console.log(linkObject);
    console.log("Nuevo Socio Agregado");
  };

  const handleInputChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  function addMonths(date, months) {
    var result = new Date(date);
    result.setMonth(result.getMonth() + months);
    return result;
  }

  function validateMonth() {
    let fechaFinaCambiar = "";
    switch (tipoPlanMostrar) {
      case "Mensual":
        fechaFinaCambiar = addMonths(values.fechaInicio, planMensual);
        fechaFinaCambiar = fechaFinaCambiar.toISOString().substring(0, 10);
        break;
      case "Bimestral":
        fechaFinaCambiar = addMonths(values.fechaInicio, planBimestral);
        fechaFinaCambiar = fechaFinaCambiar.toISOString().substring(0, 10);
        break;
      case "Trimestral":
        fechaFinaCambiar = addMonths(values.fechaInicio, planTrimestral);
        fechaFinaCambiar = fechaFinaCambiar.toISOString().substring(0, 10);
        break;
      case "Semestral":
        fechaFinaCambiar = addMonths(values.fechaInicio, planSemestral);
        fechaFinaCambiar = fechaFinaCambiar.toISOString().substring(0, 10);
        break;
      case "Anual":
        fechaFinaCambiar = addMonths(values.fechaInicio, planAnual);
        fechaFinaCambiar = fechaFinaCambiar.toISOString().substring(0, 10);
        break;
      default:
        break;
    }
    console.log("ESTA ES EL RESULTADO DE LA FUNCION" + fechaFinaCambiar);
    return fechaFinaCambiar;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
    console.log("Fecha de fin de plan: " + validateMonth(values.fechaInicio));
    values.fechaFin = validateMonth(values.fechaInicio);
    if (
      values.nombres === "" ||
      values.apellidos === "" ||
      values.dni === "" ||
      values.fechaInicio === "" ||
      values.tipoPlan === "" ||
      values.monto === "" ||
      values.fechaFin === ""
    ) {
      Swal.fire({
        title: 'Error!',
        text: '¡No dejes campos vacios!',
        icon: 'error',
        confirmButtonText: 'Ok'
      })
    } else {
      addSocio(values);
    }
  };

  const handleSelect = (e) => {
    console.log(e);
    values.tipoPlan = e;
    settipoPlanMostrar(e);
    setfechaFinMostrar(validateMonth(values.fechaInicio));
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
        <Dropdown.Item eventKey="Bimestral">Bimestral</Dropdown.Item>
        <Dropdown.Item eventKey="Trimestral">Trimestral</Dropdown.Item>
        <Dropdown.Item eventKey="Semestral">Semestral</Dropdown.Item>
        <Dropdown.Item eventKey="Anual">Anual</Dropdown.Item>
      </DropdownButton>
      <br></br>
      <h4>Plan seleccionado:</h4>
      <p>{tipoPlanMostrar}</p>
      <h4>Fecha de Fin de Plan:</h4>
      <p>{fechaFinMostrar}</p>
      <Form.Label>Monto del Plan (S/.)</Form.Label>
      <Form.Control
        type="number"
        id="inputMonto"
        name="monto"
        value={values.monto}
        onChange={handleInputChange}
      />
      <br></br>
      <Button variant="info" onClick={handleSubmit}>
        Registrar
      </Button>{" "}
      <h2>{}</h2>
    </>
  );
};
export default RegistroSocio;
