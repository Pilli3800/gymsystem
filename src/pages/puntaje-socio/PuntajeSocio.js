import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { collection, getDocs } from "firebase/firestore";
import { query, where } from "firebase/firestore";
import { db } from "../../services/firebase";
import Swal from "sweetalert2";

const AsistenciaSocioVer = () => {
  let getPostsFromFirebase = [];
  const [dniBuscar, setdniBuscar] = useState("");
  const [mostrarNombres, setmostrarNombres] = useState("");
  const [mostrarPuntajeAsistencia, setmostrarPuntajeAsistencia] = useState("");
  const handleInputChangeDNI = (e) => {
    setdniBuscar(e.target.value);
  };

  const handleClick = () => {
    fetchFirebasebyDNI(dniBuscar);
  };

  const fetchFirebasebyDNI = async (dniBuscar) => {
    if (dniBuscar !== "") {
      const q = query(collection(db, "socios"), where("dni", "==", dniBuscar));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        getPostsFromFirebase.push({
          ...doc.data(),
          key: doc.id,
        });
      });
      // if promise there response, update asistencia_puntos
      if (getPostsFromFirebase.length !== 0) {
        Swal.fire({
          title: "¡Socio Encontrado!\n",
          text: "Se ha cargado los puntajes del socio.",
          icon: "success",
          confirmButtonText: "Ok",
        });
        setmostrarNombres("Bienvenido " + getPostsFromFirebase[0].nombres);
        setmostrarPuntajeAsistencia(
          "Su puntaje de asistencias es de: " +
            getPostsFromFirebase[0].asistencia_puntos +
            " puntos."
        );
      } else {
        Swal.fire({
          title: "Error",
          text: "No se encontró el DNI del socio.",
          icon: "error",
          confirmButtonText: "Ok",
        });
      }
    } else {
      Swal.fire({
        title: "Error",
        text: "Debe ingresar un DNI para poder buscar.",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  return (
    <Container>
      <div className="m-5 text-center">
        <h1>Puntaje de Socios</h1>
      </div>
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Ingresar su DNI"
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
          <h3>{mostrarPuntajeAsistencia}</h3>
        </div>
        <p>💡 Recuerde acercarse al counter, para canjear sus puntajes. </p>
      </div>
    </Container>
  );
};

export default AsistenciaSocioVer;
