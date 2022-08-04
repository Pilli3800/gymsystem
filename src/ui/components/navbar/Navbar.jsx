import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <Nav fill variant="tabs" defaultActiveKey="/inicio">
      <Nav.Item>
        <Nav.Link eventKey="inicio" as={NavLink} to="/user/inicio">
          Inicio
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="registro" as={NavLink} to="/user/registro">
          Registrar Socio
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="editar" as={NavLink} to="/user/editar">
          Editar/Eliminar Socio
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="asistencia" as={NavLink} to="/user/asistencia">
          Asistencia
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="reporte" as={NavLink} to="/user/reporte">
          Reportes
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
}

export default Navbar;
