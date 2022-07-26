import React, { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { db } from "../../services/firebase";
import { collection, getDocs } from "firebase/firestore";

const Reporte = () => {
  const [values, setValues] = useState([]);

  const handleSubmit = async (e) => {
    const response = await getDocs(collection(db, "socios"));
    console.log(values);
    response.docs.forEach((item) => {
      values.push(item.data());
      console.log(item.data());
    });
    console.log(values);
    return response;
  };

  console.log(values);
  const map1 = values.map((linkObject) => linkObject);
  console.log(map1);

  return (
    <>
      <div>
        <Button variant="info" onClick={handleSubmit}>
          Generar Reporte
        </Button>
      </div>
      <div>{map1}</div>
    </>
  );
};

export default Reporte;
