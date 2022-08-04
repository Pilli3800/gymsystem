import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate, Link } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../../services/firebase";
import { MoonLoader } from "react-spinners";
import "./Login.css";
import Swal from "sweetalert2";
import Gym from "../../resources/gimnasio.png";

const Login = () => {
  const [password, setpassword] = useState("");
  const [email, setemail] = useState("");
  const [loading, setLoading] = useState(false);

  let navigate = useNavigate();

  const override = {
    display: "block",
    margin: "20% auto",
  };

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

  const handleChangePassword = (e) => {
    console.log(e.target.value);
    setpassword(e.target.value);
  };

  const handleChangeEmail = (e) => {
    console.log(e.target.value);
    setemail(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const auth = getAuth(app);
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        localStorage.setItem("user", user.uid);
        navigate("/user/inicio", { replace: true });
        window.location.reload();
        setLoading(false);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Swal.fire({
          title: "No se puede iniciar sesión",
          text: `Se produjo el error: ${errorMessage}`,
          icon: "error",
          confirmButtonText: "Ok",
        });
        setLoading(false);
      });
  };

  return (
    <div className="login-container">
      <div className="login">
        <h3 className="text-center m-2">
          {" "}
          <img src={Gym} width="30" /> GymSystem
        </h3>
        <Form>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Dirección de Correo Electrónico</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              id="email"
              onChange={handleChangeEmail}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="Contraseña"
              id="password"
              onChange={handleChangePassword}
            />
          </Form.Group>
          <Button variant="primary" type="submit" onClick={submitHandler}>
            Entrar
          </Button>
          <Link className="link-recuperar" to="/recuperar">
            Recuperar Contraseña
          </Link>
        </Form>
      </div>
    </div>
  );
};

export default Login;
