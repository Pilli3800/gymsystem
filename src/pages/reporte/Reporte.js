import React, { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { db } from "../../services/firebase";
import { collection, getDocs } from "firebase/firestore";

const Reporte = () => {
  const getPostsFromFirebase = [];
  const [posts, setPosts] = useState([]);

  const handleClick = async (e) => {
    const response = await getDocs(collection(db, "socios"));
    response.docs.forEach((doc) => {
      //console.log(item.id, "=>", item.data());
      getPostsFromFirebase.push({
        ...doc.data(),
        key: doc.id,
      });
      setPosts(getPostsFromFirebase);
    });
  };

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

  console.log(posts);
  return (
    <>
      <div>
        <Button variant="info" onClick={handleClick}>
          Generar Reporte
        </Button>
      </div>
      <Table>
        <thead>
          <tr>
            <th>Activo</th>
            <th>DNI</th>
            <th>Nombres</th>
            <th>Apellidos</th>
            <th>tipoPlan</th>
            <th>Monto Pagado</th>
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
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default Reporte;
