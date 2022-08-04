import React, { useState } from "react";
import { Button, Table, DropdownButton, Dropdown } from "react-bootstrap";
import { db } from "../../services/firebase";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { Form } from "react-bootstrap";
import { query, where } from "firebase/firestore";
import { MoonLoader } from "react-spinners";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import Swal from "sweetalert2";
import "./Reporte.css";
import Whatsapp from "../../resources/whatsapp.png";

const Reporte = () => {
  const getPostsFromFirebase = [];
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  let diaBuscar;
  let monthOpcion;

  const override = {
    display: "block",
    margin: "20% auto",
  };

  const fetchFirebase = async () => {
    setLoading(true);
    const response = await getDocs(collection(db, "socios"));
    if (response.docs.length === 0) {
      setPosts([]);
      setLoading(false);
      Swal.fire({
        title: "Error",
        text: "No hay socios registrados en la base de datos.",
        icon: "error",
        confirmButtonText: "Ok",
      });
    } else {
      response.docs.forEach((doc) => {
        //console.log(item.id, "=>", item.data());
        getPostsFromFirebase.push({
          ...doc.data(),
          key: doc.id,
        });
        setPosts(getPostsFromFirebase);
        setLoading(false);
      });
    }
  };

  const fetchFirebasebyMonth = async (mesOpcion) => {
    setLoading(true);
    const q = query(collection(db, "socios"), where("mes", "==", mesOpcion));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      getPostsFromFirebase.push({
        ...doc.data(),
        key: doc.id,
      });
    });
    if (getPostsFromFirebase.length !== 0) {
      setPosts(getPostsFromFirebase);
      console.log(getPostsFromFirebase);
    } else {
      setPosts([]);
      setLoading(false);
      Swal.fire({
        title: "Error",
        text: "No hay socios registrados en el mes seleccionado",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
    setLoading(false);
  };

  const fetchFirebaseToday = async () => {
    setLoading(true);
    let dateAux = new Date().toISOString().substring(0, 10);
    const q = query(
      collection(db, "socios"),
      where("fechaRegistro", "==", dateAux)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      getPostsFromFirebase.push({
        ...doc.data(),
        key: doc.id,
      });
    });
    if (getPostsFromFirebase.length !== 0) {
      setPosts(getPostsFromFirebase);
      console.log(getPostsFromFirebase);
    } else {
      setPosts([]);
      setLoading(false);
      Swal.fire({
        title: "Error",
        text: `No hay socios registrados: ${dateAux}`,
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
    setLoading(false);
  };

  const fetchFirebaseBuscarDia = async (diaBuscar) => {
    setLoading(true);
    if (diaBuscar !== undefined) {
      const q = query(
        collection(db, "socios"),
        where("fechaRegistro", "==", diaBuscar)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        getPostsFromFirebase.push({
          ...doc.data(),
          key: doc.id,
        });
      });
      if (getPostsFromFirebase.length !== 0) {
        setPosts(getPostsFromFirebase);
        console.log(getPostsFromFirebase);
      } else {
        setPosts([]);
        setLoading(false);
        Swal.fire({
          title: "Error",
          text: `No hay socios registrados: ${diaBuscar}`,
          icon: "error",
          confirmButtonText: "Ok",
        });
      }
      setLoading(false);
    } else {
      Swal.fire({
        title: "Error",
        text: `No haz seleccionado ninguna fecha.`,
        icon: "error",
        confirmButtonText: "Ok",
      });
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   fetchFirebase();
  // }, [loading]);

  if (loading) {
    return (
      <MoonLoader
        speed={1}
        loading={loading}
        cssOverride={override}
        size={50}
      />
    );
  }

  function compareDates(e) {
    let response = false;
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

  const handleSelect = (e) => {
    monthOpcion = e;
    console.log(monthOpcion);
    fetchFirebasebyMonth(parseInt(monthOpcion));
  };

  const handleClick = () => {
    fetchFirebase();
  };

  const handleClickDia = () => {
    fetchFirebaseToday();
  };

  const handleChangeDiaBuscar = (e) => {
    diaBuscar = e.target.value;
    console.log(diaBuscar);
  };

  const handleClickBuscarDia = () => {
    fetchFirebaseBuscarDia(diaBuscar);
  };

  return (
    <>
      <div className="m-5 text-center">
        <h1 className="m-5">Reporte</h1>
        <div className="d-flex flex-row justify-content-center flex-wrap">
          <Button className="boton" onClick={handleClick}>
            Reporte General
          </Button>
          <Button className="boton" variant="warning" onClick={handleClickDia}>
            Reporte del Día
          </Button>
          <DropdownButton
            id="dropdown-mes-reporte"
            title="Seleccionar Mes"
            name="mesReporte"
            onSelect={handleSelect}
            className="boton"
            variant="dark"
          >
            <Dropdown.Item eventKey="1">Enero</Dropdown.Item>
            <Dropdown.Item eventKey="2">Febrero</Dropdown.Item>
            <Dropdown.Item eventKey="3">Marzo</Dropdown.Item>
            <Dropdown.Item eventKey="4">Abril</Dropdown.Item>
            <Dropdown.Item eventKey="5">Mayo</Dropdown.Item>
            <Dropdown.Item eventKey="6">Junio</Dropdown.Item>
            <Dropdown.Item eventKey="7">Julio</Dropdown.Item>
            <Dropdown.Item eventKey="8">Agosto</Dropdown.Item>
            <Dropdown.Item eventKey="9">Setiembre</Dropdown.Item>
            <Dropdown.Item eventKey="10">Octubre</Dropdown.Item>
            <Dropdown.Item eventKey="11">Noviembre</Dropdown.Item>
            <Dropdown.Item eventKey="12">Diciembre</Dropdown.Item>
          </DropdownButton>

          <Form.Control
            className="boton"
            type="date"
            name="diaBuscar"
            onChange={handleChangeDiaBuscar}
          />
          <Button className="boton" onClick={handleClickBuscarDia}>
            Buscar Día
          </Button>
        </div>
        <hr></hr>
        <ReactHTMLTableToExcel
          id="test-table-xls-button"
          className="boton-excel"
          table="table-to-xls"
          filename="Socios"
          sheet="Socios"
          buttonText={<Button variant="success">Descargar Excel</Button>}
        />
      </div>
      <Table id="table-to-xls">
        <thead>
          <tr>
            <th>Activo</th>
            <th>DNI</th>
            <th>Nombres</th>
            <th>Apellidos</th>
            <th>Teléfono</th>
            <th>Whatsapp</th>
            <th>Tipo de Plan</th>
            <th>Monto Pagado</th>
            <th>Fecha Inicio</th>
            <th>Fecha Fin</th>
            <th>Fecha Registro</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr>
              <td>{compareDates(post.fechaFin) ? "Si" : "No"}</td>
              <td>{post.dni}</td>
              <td>{post.nombres}</td>
              <td>{post.apellidos}</td>
              <td>{post.celular}</td>
              <td>
                <a
                  href={`https://api.whatsapp.com/send?phone=51${post.celular}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <button className="button-whatsapp">
                    <img src={Whatsapp} alt="whatsapp" width="30"></img>
                  </button>
                </a>
              </td>
              <td>{post.tipoPlan}</td>
              <td>S/. {post.monto}</td>
              <td>{post.fechaInicio}</td>
              <td>{post.fechaFin}</td>
              <td>{post.fechaRegistro}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default Reporte;
