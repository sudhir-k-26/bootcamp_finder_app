import React, { Fragment } from 'react'
import { FaLaptopCode, FaSignInAlt, FaUser, FaUserPlus } from 'react-icons/fa';
import {Link} from 'react-router-dom';
import { useAuth, logout } from '../contexts/auth/AuthState';
import { Navbar, NavDropdown, Container, Nav } from 'react-bootstrap';

const Header = () => {
   
	 const [authState, authDispatch] = useAuth();
     const { isAuthenticated, loading, user} = authState;

     const onLogout = () =>{

        logout(authDispatch);

     }

	 const guestLinks = (
		 <Fragment>
         <Nav.Link  as={Link} to="/login"><FaSignInAlt /> Login</Nav.Link>
         <Nav.Link  as={Link} to="/register"> <FaUserPlus /> Register </Nav.Link>
		 </Fragment>
	 );
	 const  authLinks= (
		 <Fragment>
            <NavDropdown title={<span><FaUser /> Account </span>} id="collasible-nav-dropdown">
        <NavDropdown.Item as={Link} to="/bootcamps/manage-bootcamp">Manage Bootcamp</NavDropdown.Item>
       {user && user.data.role==='user' && <NavDropdown.Item as={Link} to="/bootcamps/manage-reviews">Manage Reviews</NavDropdown.Item>}
       {user && user.data.role==='admin' && <NavDropdown.Item as={Link} to="/bootcamps/manage-account">Manage Account</NavDropdown.Item>}
        <NavDropdown.Divider />
        <NavDropdown.Item as={Link}  to="/login" onClick={onLogout}>Logout</NavDropdown.Item>
      </NavDropdown>
		 </Fragment>
	 )

   

    return (
        <div>
			<Navbar className="bg-warning fixed-top" collapseOnSelect expand="lg"  variant="dark">
  <Container>
  <Navbar.Brand href="/"><FaLaptopCode /> DevCamper</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
  <Nav className="me-auto">
      
      
	  </Nav>
    <Nav>
      
	    {isAuthenticated  && !loading && authLinks }
		  {!isAuthenticated && !loading && guestLinks }
           
	  <Nav.Link  as={Link} to="/"> | </Nav.Link>
	  <Nav.Link  as={Link} to="/bootcamps"> Browse Bootcamps </Nav.Link>
    </Nav>
  </Navbar.Collapse>
  </Container>
</Navbar>
			
         
        </div>
    )
}
export default Header
