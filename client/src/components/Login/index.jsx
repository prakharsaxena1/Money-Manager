import React, { useState } from "react";
import ContainerForm from "../../containers/containerForm";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { Toast } from "react-bootstrap";
import { login } from "../../services/auth.service";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [toastData, setToastData] = useState(null);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      <ContainerForm>
        <h2 className="text-center mb-5">Sign-in to your account</h2>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <div className="text-center mb-5">
            <Button
              variant="primary"
              className="w-50"
              onClick={() => {
                login({ email, password }).then((res) => {
                  if (res.data.status === "success") {
                    return navigate("/dashboard");
                  }
                  setToastData(res.data.message);
                  setShow(true);
                });
              }}
            >
              Sign-in
            </Button>
          </div>
        </Form>
        <p className="text-center">
          New here? <Link to={"/register"}>Create</Link> an account here
        </p>
      </ContainerForm>
      {toastData !== null && (
        <div
          style={{
            position: "absolute",
            top: 10,
            right: 10,
          }}
        >
          <Toast show={show} onClose={() => setShow(false)} bg="danger">
            <Toast.Header>
              <img
                src="holder.js/20x20?text=%20"
                className="rounded me-2"
                alt=""
              />
              <strong className="me-auto">Failed to login</strong>
            </Toast.Header>
            <Toast.Body>{toastData}</Toast.Body>
          </Toast>
        </div>
      )}
    </>
  );
};

export default Login;
