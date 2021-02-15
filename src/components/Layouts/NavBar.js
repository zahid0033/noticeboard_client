import React from "react";
import { Nav, Navbar, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import logoutUser from "../../redux/actions/authActions";
export default function NavBar() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  return (
    <Navbar expand="lg">
      <Navbar.Brand as={Link} to="/">
        NoticeBee
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="m-l-auto">
          {isAuthenticated && (
            <>
              <Nav.Link as={Link} to="/notices">
                Notices
              </Nav.Link>
              <Nav.Link as={Link} to="/materials">
                Materials
              </Nav.Link>
              <Nav.Link as={Link} to="/settings">
                Settings
              </Nav.Link>
              <Nav.Link as={Button} onClick={() => dispatch(logoutUser())}>
                Logout
              </Nav.Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
