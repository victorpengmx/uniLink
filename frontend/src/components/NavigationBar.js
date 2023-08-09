import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';

function NavigationBar() {

  const location = useLocation()

  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
      logout();
  };

  // function to reload home page upon click, if user if already on home page
  const reloadPage = () => {
      if (location.pathname == '/') {
          window.location.reload();
      } 
  }
  return (
    <Navbar expand="lg" className="fixed-top">
      <Container className='navbar'>
        <Navbar.Brand href="/" onClick={reloadPage}>uniLink</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {user && <>
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/forumpostform">New Post</Nav.Link>
              {/* <Nav.Link as={Link} to="/viewmypost">My Posts</Nav.Link> */}
              <Nav.Link as={Link} to="/events">Events</Nav.Link>
            </Nav>

            <Nav className="ms-auto">
              <Button size="sm" onClick={handleClick}>Logout</Button>
            </Nav>
          </>}
          
          {!user && 
            <Nav className="ms-auto">
            <Nav.Link as={Link} to="/login">Login</Nav.Link>
            <Nav.Link as={Link} to="/signup">Signup</Nav.Link>
          </Nav>}
        </Navbar.Collapse>
        

      </Container>
    </Navbar>
  );
}

export default NavigationBar;
