import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { collection, getDocs, deleteDoc } from "firebase/firestore";
import { query, where } from "firebase/firestore";
import { db } from "../../services/firebase";
import { doc, setDoc } from "firebase/firestore";
import Swal from "sweetalert2";

const AsistenciaSocio = () => {
  let getPostsFromFirebase = [];
  let fechaEvaluar = "";
  const [dniBuscar, setdniBuscar] = useState();
  const [mostrarPermiso, setmostrarPermiso] = useState("");
  const [mostrarNombres, setmostrarNombres] = useState("");
  const handleInputChangeDNI = (e) => {
    setdniBuscar(e.target.value);
  };

  const handleClick = () => {
    fetchFirebasebyDNI(dniBuscar);
  };

  const fetchFirebasebyDNI = async (dniBuscar) => {
    console.log(typeof dniBuscar);
    const q = query(collection(db, "socios"), where("dni", "==", dniBuscar));
    const querySnapshot = await getDocs(q);
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
      console.log(getPostsFromFirebase[0].nombres);
      fechaEvaluar = getPostsFromFirebase[0].fechaFin;
      setmostrarNombres("Bienvenido " + getPostsFromFirebase[0].nombres);
      setmostrarPermiso(fechaEvaluar);
    } else {
      Swal.fire({
        title: "Error",
        text: "No se encontró el DNI del socio.",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  function compareDates(e) {
    let response = "";
    let q = new Date();
    var m = q.getMonth() + 1;
    var d = q.getDay();
    var y = q.getFullYear();
    var today = new Date(y, m, d);
    let toCompare = new Date(e);

    if (today <= toCompare) {
      response = true;
    } else {
      response = false;
    }
    return response;
  }

  return (
    <Container>
      <div className="m-5 text-center">
        <h1>Asistencia</h1>
      </div>
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
      <div className="d-flex flex-column justify-content-center align-items-center">
        <h3>{mostrarNombres}</h3>
        <div className="d-flex flex-column justify-content-center align-items-center text-center">
          <h3>
            {" "}
            Estado:
            {compareDates(mostrarPermiso) ? (
              <h2 className="text-success">Si puede ingresar</h2>
            ) : (
              <h2 className="text-danger">No puede ingresar</h2>
            )}
          </h3>
        </div>
      </div>
    </Container>
  );
};

export default AsistenciaSocio;
