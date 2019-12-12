import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from "react"
import NavBar from 'react-bootstrap/navbar'
import { Link } from 'react-router-dom'
import { Nav, Navbar } from "react-bootstrap"
import "./NavBar.css"


class Navigation extends Component {
  render() {
    if (this.props.user === true) {
      return (
        <>
          <div className="NavBar">
          <Navbar collapseOnSelect expand="lg" className="NavBarColor">
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Link className="nav-link" to="/">
                  <img src={require('./Logo.png')} width="100" height="40" alt="Hapi Logo" />
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
              </Navbar.Collapse>

            </Navbar>
          </div>
        </>
      )
    } else {
      return (
        <>
          <Navbar collapseOnSelect expand="lg" className="NavBarColor">
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
            <NavBar.Brand href="#home"> <img src={require('./Logo.png')} width="100" height="40" alt="Hapi Logo" /></NavBar.Brand>
            <Nav className="ml-auto nav-link">
              <Link className="nav-link" to="/login">Login</Link>
              <Link className="nav-link" to="/Register">Sign Up</Link>
            </Nav>
            </Navbar.Collapse>
          </Navbar>
        </>
      )
    }
  }
}

export default Navigation