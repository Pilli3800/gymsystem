import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <Nav fill variant="tabs" defaultActiveKey="/home">
      <Nav.Item>
        <Nav.Link eventKey="registro" as={NavLink} to="/registro">
          Registrar Socio
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link
          eventKey="editar"
          as={NavLink}
          to="/editar"
        >
          Editar/Eliminar Socio
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-2" as={NavLink} to="/asistencia" disabled>
          Asistencia
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-3" as={NavLink} to="/reporte">
          Reportes
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
}

export default Navbar;
