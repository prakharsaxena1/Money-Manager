import React, { useContext } from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { UserContext } from "../../auth.context";
import { logout } from "../../services/auth.service";

const NavbarComponent = () => {
  const { username } = useContext(UserContext);
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Money manager
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <NavDropdown
              id="nav-dropdown-dark-example"
              title={`Hi, ${username}`}
              menuVariant="dark"
            >
              <NavDropdown.Item as={Link} to="/dashboard">
                Dashboard
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/transactions">
                Transaction history
              </NavDropdown.Item>
              <NavDropdown.Item to="/logout" as={Link} onClick={logout}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
