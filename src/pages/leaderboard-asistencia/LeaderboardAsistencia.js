import React, { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { db } from "../../services/firebase";
import { query, limit } from "firebase/firestore";
import { getDocs, orderBy } from "firebase/firestore";
import { collection, where, onSnapshot } from "firebase/firestore";
import { MoonLoader } from "react-spinners";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import Swal from "sweetalert2";
import "./LeaderboardAsistencia.css";

const Reporte = () => {
  const WAIT_TIME = 5000;
  const getPostsFromFirebase = [];
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  let i = 1;

  const override = {
    display: "block",
    margin: "20% auto",
  };

  const fetchFirebase = async () => {
    setLoading(true);
    // const Socios = collection(db, "socios");
    // const response = query(
    //   Socios,
    //   orderBy("asistencia_puntos", "desc"),
    //   limit(20)
    // );

    // //const response = await getDocs(collection(db, "socios"), orderBy("asistencia_puntos"));
    // // if (response.docs.length === 0) {
    // //   setPosts([]);
    // //   setLoading(false);
    // //   Swal.fire({
    // //     title: "Error",
    // //     text: "No hay socios registrados en la base de datos.",
    // //     icon: "error",
    // //     confirmButtonText: "Ok",
    // //   });
    // // } else {
    // const querySnapshot = await getDocs(response);
    // querySnapshot.forEach((doc) => {
    //   getPostsFromFirebase.push({
    //     ...doc.data(),
    //     key: doc.id,
    //   });
    //   setPosts(getPostsFromFirebase);
    //   console.log(getPostsFromFirebase);
    //   setLoading(false);
    // });
    //}
    const q = query(
      collection(db, "socios"),
      orderBy("asistencia_puntos", "desc")
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const cities = [];
      querySnapshot.forEach((doc) => {
        getPostsFromFirebase.push({
          ...doc.data(),
          key: doc.id,
        });
        setPosts(getPostsFromFirebase);
        console.log(getPostsFromFirebase);
        setLoading(false);
      });
      console.log("Current cities in CA: ", getPostsFromFirebase);
    });
    setLoading(false);
  };

  // useEffect(() => {
  //   fetchFirebase();
  // }, [loading]);

  useEffect(() => {
    const id = setInterval(() => {
      fetchFirebase();
    }, WAIT_TIME);
    return () => clearInterval(id);
  }, [getPostsFromFirebase]);

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

  return (
    <>
      <div className="m-5 text-center">
        <h1 className="m-5">🏆 Leaderboard de Puntajes de Asistencia</h1>
        <div className="d-flex flex-row justify-content-center flex-wrap"></div>
        <hr></hr>

        <Table id="table-to-xls">
          <thead>
            <tr>
              <th></th>
              <th>DNI</th>
              <th>Nombres</th>
              <th>Apellidos</th>
              <th>Puntaje de Asistencia</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr>
                <td>{i++}</td>
                <td>{post.dni}</td>
                <td>{post.nombres}</td>
                <td>{post.apellidos}</td>
                <td>{post.asistencia_puntos}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <ReactHTMLTableToExcel
          id="test-table-xls-button"
          className="boton-excel"
          table="table-to-xls"
          filename="Leaderboard-puntaje"
          sheet="Leaderboard-puntaje"
          buttonText={<Button variant="success">Descargar Excel</Button>}
        />
      </div>
    </>
  );
};

export default Reporte;
