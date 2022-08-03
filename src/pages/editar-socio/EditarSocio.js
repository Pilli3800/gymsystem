import React, { useState } from "react";
import {
  Form,
  Dropdown,
  DropdownButton,
  Button,
  InputGroup,
} from "react-bootstrap";
//import { collection, addDoc } from "firebase/firestore";
import { collection, getDocs, deleteDoc } from "firebase/firestore";
import { query, where } from "firebase/firestore";
import { db } from "../../services/firebase";
import { doc, setDoc } from "firebase/firestore";
import Swal from "sweetalert2";

export const blockInvalidChar = (e) =>
  ["e", "E", "+", "-"].includes(e.key) && e.preventDefault();
const EditarSocio = () => {
  const [tipoPlanMostrar, settipoPlanMostrar] = useState(
    "No se ha seleccionado un plan."
  );
  const [fechaFinMostrar, setfechaFinMostrar] = useState(
    "No se ha seleccionado una fecha."
  );
  let getPostsFromFirebase = [];

  const [dniBuscar, setdniBuscar] = useState();
  const handleInputChangeDNI = (e) => {
    setdniBuscar(e.target.value);
  };

  const planMensual = 1;
  const planBimestral = 2;
  const planTrimestral = 3;
  const planSemestral = 6;
  const planAnual = 12;

  const [values, setValues] = useState({
    nombres: "",
    apellidos: "",
    dni: "",
    celular: "",
    fechaInicio: "",
    fechaFin: "",
    tipoPlan: "",
    monto: "",
  });

  function getMonth(date) {
    let mes = new Date(date);
    let response = mes.getMonth() + 1;
    return response;
  }

  const handleClick = () => {
    if (dniBuscar === "" || dniBuscar.length < 8) {
      Swal.fire({
        title: "Debe colocar un DNI válido",
        text: "No puedes dejar el campo vacio o tener menos de 8 digitos.",
        icon: "error",
        confirmButtonText: "Ok",
      });
    } else {
      fetchFirebasebyDNI(dniBuscar);
    }
  };

  const fetchFirebasebyDNI = async (dniBuscar) => {
    console.log(typeof dniBuscar);
    const q = query(collection(db, "socios"), where("dni", "==", dniBuscar));
    const querySnapshot = await getDocs(q);
    console.log(querySnapshot);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      getPostsFromFirebase.push({
        ...doc.data(),
        key: doc.id,
      });
    });
    if (getPostsFromFirebase.length !== 0) {
      Swal.fire({
        title: "¡Socio Encontrado!",
        text: "Se ha cargado los datos del socio.",
        icon: "success",
        confirmButtonText: "Ok",
      });
      setValues(getPostsFromFirebase[0]);
      settipoPlanMostrar(getPostsFromFirebase[0].tipoPlan);
      setfechaFinMostrar(getPostsFromFirebase[0].fechaFin);
    } else {
      Swal.fire({
        title: "Error",
        text: "No se encontró el DNI del socio.",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  const deleteSocio = async () => {
    const eliminar = await deleteDoc(doc(db, "socios", dniBuscar));
    Swal.fire({
      title: "¡Se eliminó con éxito!",
      icon: "success",
      confirmButtonText: "Ok",
    });
  };

  const addSocio = async (linkObject) => {
    // const db = getDatabase();
    // set(ref(db, "socios/ " + linkObject.dni), linkObject);
    let mesCambiar = getMonth(values.fechaInicio);
    values.mes = mesCambiar;
    try {
      const docRef = await setDoc(doc(db, "socios/", values.dni), {
        nombres: values.nombres,
        apellidos: values.apellidos,
        dni: values.dni,
        celular: values.celular,
        fechaInicio: values.fechaInicio,
        fechaFin: values.fechaFin,
        tipoPlan: values.tipoPlan,
        mes: parseInt(mesCambiar),
        monto: values.monto,
      });
      console.log("Socio registrado con el ID: ", values.dni);
      Swal.fire({
        title: "¡Socio Editado!",
        text: "El socio ha sido editado con éxito.",
        icon: "success",
        confirmButtonText: "Ok",
      });
    } catch (e) {
      console.error("Error al registrar socio: ", e);
      Swal.fire({
        title: "Error!",
        text: "¡El socio ya existe!",
        icon: "error",
        confirmButtonText: "Ok",
      });
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
      values.celular === "" ||
      values.fechaInicio === "" ||
      values.tipoPlan === "" ||
      values.monto === "" ||
      values.fechaFin === ""
    ) {
      Swal.fire({
        title: "Error!",
        text: "¡No dejes campos vacios!",
        icon: "error",
        confirmButtonText: "Ok",
      });
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
      <h1>Editar socio</h1>
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Ingresar el DNI del Socio"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          maxLength="8"
          onChange={handleInputChangeDNI}
          onKeyPress={(event) => {
            if (!/[0-9]/.test(event.key)) {
              event.preventDefault();
            }
          }}
          minLength="8"
        />
        <Button variant="primary" id="button-addon2" onClick={handleClick}>
          Buscar
        </Button>
      </InputGroup>
      <Form.Label>Nombre(s) del Socio</Form.Label>
      <Form.Control
        type="text"
        id="inputNombres"
        onChange={handleInputChange}
        name="nombres"
        value={values.nombres}
        onKeyPress={(event) => {
          if (/[0-9]/.test(event.key)) {
            event.preventDefault();
          }
        }}
      />
      <br></br>
      <Form.Label>Apellidos del Socio</Form.Label>
      <Form.Control
        type="text"
        id="inputApellidos"
        name="apellidos"
        value={values.apellidos}
        onChange={handleInputChange}
        onKeyPress={(event) => {
          if (/[0-9]/.test(event.key)) {
            event.preventDefault();
          }
        }}
      />
      <br></br>
      <Form.Label>DNI del Socio</Form.Label>
      <Form.Control
        type="text"
        id="inputDNI"
        name="dni"
        value={values.dni}
        onChange={handleInputChange}
        maxLength="8"
        pattern="[0-9]*"
        onKeyPress={(event) => {
          if (!/[0-9]/.test(event.key)) {
            event.preventDefault();
          }
        }}
        minLength="8"
      />
      <br></br>
      <Form.Label>Teléfono del Socio</Form.Label>
      <Form.Control
        type="text"
        id="inputCelular"
        name="celular"
        value={values.celular}
        onChange={handleInputChange}
        maxLength="9"
        pattern="[0-9]*"
        onKeyPress={(event) => {
          if (!/[0-9]/.test(event.key)) {
            event.preventDefault();
          }
        }}
        minLength="1"
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
      <p>
        {" "}
        💡 Para ver la fecha de fin de plan correctamente, debe seleccionar el
        tipo de plan <strong>dos veces.</strong>
      </p>
      <h4>Fecha de Fin de Plan:</h4>
      <p>{fechaFinMostrar}</p>
      <Form.Label>Monto del Plan (S/.)</Form.Label>
      <Form.Control
        type="number"
        id="inputMonto"
        name="monto"
        value={values.monto}
        onChange={handleInputChange}
        onKeyDown={blockInvalidChar}
      />
      <br></br>
      <Button variant="info" onClick={handleSubmit}>
        Registrar
      </Button>{" "}
      <Button variant="danger" onClick={deleteSocio}>
        Eliminar Socio
      </Button>{" "}
      <h2>{}</h2>
    </>
  );
};
export default EditarSocio;
