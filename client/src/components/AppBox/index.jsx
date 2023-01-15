import React from "react";
import { Container } from "react-bootstrap";
import Navbar from "../navbar";

const AppBox = ({ username, children }) => {
  return (
    <Container
      fluid
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        padding: 0,
        margin: 0,
      }}
    >
      <Navbar username={username} />
      {children}
    </Container>
  );
};

export default AppBox;
