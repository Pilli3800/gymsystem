import React, { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { db } from "../../services/firebase";
import { collection, getDocs } from "firebase/firestore";
import { MoonLoader } from "react-spinners";

const Reporte = () => {
  const getPostsFromFirebase = [];
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const override = {
    display: "block",
    margin: "20% auto"
  };
  

  const fetchFirebase = async () => {
    const response = await getDocs(collection(db, "socios"));
    response.docs.forEach((doc) => {
      //console.log(item.id, "=>", item.data());
      getPostsFromFirebase.push({
        ...doc.data(),
        key: doc.id,
      });
      setPosts(getPostsFromFirebase);
      setLoading(false);
    });
  };

  // useEffect(() => {
  //   fetchFirebase();
  // }, [loading]);

  useEffect(() => {
    fetchFirebase();
    return () => fetchFirebase();
  }, [loading]);

  if (loading) {
    return <MoonLoader speed={1} loading={loading} cssOverride={override} size={50} />;
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

  return (
    <>
      <div>
        <Button variant="info">Generar Reporte</Button>
      </div>
      <Table>
        <thead>
          <tr>
            <th>Activo</th>
            <th>DNI</th>
            <th>Nombres</th>
            <th>Apellidos</th>
            <th>Tipo de Plan</th>
            <th>Monto Pagado</th>
            <th>Fecha Inicio</th>
            <th>Fecha Fin</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr>
              <td>{compareDates(post.linkObject.fechaFin) ? "Si" : "No"}</td>
              <td>{post.linkObject.dni}</td>
              <td>{post.linkObject.nombres}</td>
              <td>{post.linkObject.apellidos}</td>
              <td>{post.linkObject.tipoPlan}</td>
              <td>S/. {post.linkObject.monto}</td>
              <td>{post.linkObject.fechaInicio}</td>
              <td>{post.linkObject.fechaFin}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default Reporte;
