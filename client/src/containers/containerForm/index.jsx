import React from "react";
import { Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

function ContainerForm(props) {
  return (
    <>
      <Container fluid style={{ height: "7vh", paddingTop: "15px" }}>
        <Nav.Link as={Link} to="/" className="fs-4 text-dark w-100 text-center">
          Money Manager
        </Nav.Link>
      </Container>
      <Container fluid style={{
        height: "93vh",
        paddingTop: "120px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
      }}>
        <Container
          style={{
            maxWidth: "550px",
          }}
          className="rounded shadow-lg p-sm-5 p-4 bg-light"
        >
          {props.children}
        </Container>
        <Container
          style={{
            maxWidth: "550px",
            minHeight: "40px"
          }}
          className="py-2"
        >
          <h5 className="text-center text-muted fst-italic">
            Money Manager © 2023
          </h5>
        </Container>
      </Container>
    </>
  );
}

export default ContainerForm;
