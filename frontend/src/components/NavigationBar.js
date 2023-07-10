import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { location } from 'react-router-dom'
// import SearchForm from '../pages/SearchForm';
// import ViewForumpost from "../pages/ViewForumpost";

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

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
              <Nav.Link as={Link} to="/viewmypost">My Posts</Nav.Link>
              <Nav.Link as={Link} to="/events">Events</Nav.Link>
            </Nav>

            <Nav className="ms-auto">
              <NavDropdown title="Profile" id="basic-nav-dropdown" placement='end'>
                <NavDropdown.Item as={Link} to="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="#action/3.2">action</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleClick}>Logout</NavDropdown.Item>
              </NavDropdown>
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

// const NavigationBar = () => {
//     const location = useLocation()

//     const { logout } = useLogout();
//     const { user } = useAuthContext();

//     const handleClick = () => {
//         logout();
//     };

//     // function to reload home page upon click, if user if already on home page
//     const reloadPage = () => {
//         if (location.pathname == '/') {
//             window.location.reload();
//         } 
//     }

//     return (
//         <header>
//             <div className="navbar">
//                 {/* reloads page upon click */}
//                 <Link to="/" onClick={reloadPage}>
//                     <h2>uniLink</h2>
//                 </Link>

//                 <nav className="navbar-user">
//                     {/* If user is logged in */}
//                     {user && (
//                         <div className = "navbarlinks">
                            
//                             {/* <nav className="navbar-links"> */}
//                                 <Link to="/">Home</Link>
//                             {/* </nav> */}
//                             {/* <nav className="navbar-links"> */}
//                                 <Link to="/forumpostform">New Post</Link> {/* New Post tab */}
//                             {/* </nav> */}

//                             {/* <nav className="navbar-links"> */}

//                                 <Link to="/viewmypost">My Post</Link> {}
//                             {/* </nav> */}
//                             {/* </span> */}
//                             <span>{user.email}</span>
//                             <button onClick={handleClick}>Log out</button>
//                         </div>
//                     )}

//                     {/* If user is not logged in */}
//                     {!user && (
//                         <div className ="navbarlinks">
//                             <Link to="/login">Login</Link>
//                             <Link to="/signup">Signup</Link>
//                         </div>
//                     )}
//                 </nav>
//             </div>
//         </header>
//     );
// };

// export default NavigationBar;