import {Table, Form, Button, Alert, Navbar, Nav } from 'react-bootstrap'
import {
    Link
  } from "react-router-dom"
import { useSelector } from 'react-redux'
const NavigationBar=({handleLogout})=>{
    const user=useSelector(state=>state.user)
     const padding = { padding: 5,color:"white"}
    return(
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <div className="container" style={{maxWidth:"98%"}}>
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="mr-auto">
    <Navbar.Brand> <Link style={{color:"white",fontSize:"4vh"}} to="/" ><b>TODO</b></Link></Navbar.Brand>
      </Nav>
      <Nav className="ml-auto">
      <Nav.Link href="#" as="span">
        {user?<Link style={padding} to={`/update/${user.username}`}>update profile</Link>:<Link style={{color:"white"}}  to="/register" className="btn">Sign Up</Link>}
      </Nav.Link>
      <Nav.Link href="#" as="span">
      {user
            ? <em><span style={{color:"silver"}}>{user.username} logged in</span> <Button onClick={handleLogout} size="sm" variant="danger">logout</Button></em>
            : <Link style={{color:"white"}} to="/login" className="btn btn-success">Sign In</Link>
          }
    </Nav.Link>
    </Nav>
  </Navbar.Collapse>
  </div>
</Navbar>
    )
}

export default NavigationBar