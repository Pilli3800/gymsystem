import React from "react";
import {Form} from "react-bootstrap"
import {Outlet} from "react-router-dom"

const ActualizacionSocio = () => {
  return (
    <>
      <Form className="d-flex">
        <Form.Control
          type="search"
          placeholder="Buscar Socio por DNI"
          className="me-2"
          aria-label="Buscar"
        />
      </Form>
      <div>
        <Outlet/>
      </div>
    </>
  );
};

export default ActualizacionSocio;
