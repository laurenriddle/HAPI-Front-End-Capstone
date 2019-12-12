import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from "react"
import NavBar from 'react-bootstrap/navbar'
import { Link } from 'react-router-dom'
import { Nav } from "react-bootstrap"
import "./NavBar.css"


class Navbar extends Component {
  render() {
    if (this.props.user === true) {
      return (
        <>
        <div className="NavBar">
          <NavBar className="NavBarColor">
              <Link className="nav-link" to="/">
                <img src={require('./Logo.png')} width="100" height="40" alt="Hapi Logo"/>
              </Link>  
            <Nav className="nav-link" >
              {/* <Link className="nav-link" to="/">Home</Link> */}
              <Link className="nav-link" to="/projects">Projects</Link>
              <Link className="nav-link" to="/resources">Resources</Link>
              <Link className="nav-link" to="/apisearch">API Search</Link>
            </Nav>
            <Nav className="ml-auto">
              <Link className="nav-link nav-align-right" to="/Login" onClick={this.props.clearUser}>Logout</Link>
              </Nav>
          </NavBar>
          </div>
        </>
      )
    } else {
      return (
        <>
          <NavBar className="NavBarColor">
            <NavBar.Brand href="#home"> <img src={require('./Logo.png')} width="100" height="40" alt="Hapi Logo"/></NavBar.Brand>
            <Nav className="ml-auto nav-link">
              <Link className="nav-link" to="/login">Login</Link>
              <Link className="nav-link" to="/Register">Sign Up</Link>
            </Nav>
          </NavBar>
        </>
      )
    }
  }
}

export default Navbar