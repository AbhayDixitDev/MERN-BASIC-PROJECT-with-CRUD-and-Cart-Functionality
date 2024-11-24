import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function Topmenu() {
  return (
    <Navbar expand="lg" className="bg-dark navbar-dark">
      <Container>
        <Navbar.Brand href="#home">OnlineShopping</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="home">Home</Nav.Link>
            <Nav.Link as={Link} to="shop">Shop</Nav.Link>
            <NavDropdown title="Collections" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="menswear">Mens Collection</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="womenswear">Womens Collection</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="kidswear">Kids Collection</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={Link} to="cart">Cart</Nav.Link>
            <Nav.Link as={Link} to="contact">Contact us</Nav.Link>
            <Nav.Link as={Link} to="products">Products All Operations</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Topmenu;