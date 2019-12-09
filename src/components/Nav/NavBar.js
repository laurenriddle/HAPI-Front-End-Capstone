import React, { Component } from "react"
import NavBar from 'react-bootstrap/navbar'
import { Link } from 'react-router-dom'
import { Nav } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';


class Navbar extends Component {
    render () {
        return (
<>
  <NavBar bg="light" variant="light">
    <NavBar.Brand href="#home"> <img src={require('./Logo.png')} width="125" height="55"/></NavBar.Brand>
    <Nav className="mr-auto">
     <Link className="nav-link" to="/">Home</Link>
     <Link className="nav-link" to="/resources">Resources</Link>
     <Link className="nav-link" to="/apisearch">API Search</Link>
     <Link className="nav-link" to="/login">Login</Link>
     <Link className="nav-link nav-align-right" to="/logout">Logout</Link>
    </Nav>
  </NavBar>
</>
) }
}

export default Navbar