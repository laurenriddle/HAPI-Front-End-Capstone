import React, { Component } from "react"
import APIManager from "../../modules/APIManager"
import { Link } from "react-router-dom"
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, InputGroup } from "react-bootstrap"
import "./Login.css"


class LogIn extends Component {

    // Set initial state
    state = {
        username: "",
        email: "",
        password: ""
    }

    // Update state whenever an input field is edited
    handleFieldChange = (evt) => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    handleLogin = (e) => {
        e.preventDefault()

        APIManager.searchUser(this.state.email)
            .then((existingUser) => {
                if (existingUser.length === 0) {
                    alert("User does not have an account")
                } else {
                    const user = existingUser[0]
                    if (user.password === this.state.password) {
                        this.props.setUser(user)
                        this.props.history.push("/projects")
                    } else {
                        alert("Incorrect Password, Try Again.")
                    }
                }
            })
    }

    render() {
        return (
            <>
                <div className="body-container">
                    <header className="body-element header-container">
                        {/* <div className="blob">
                            <svg xlink="http://www.w3.org/1999/xlink" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 310 350">
                                <path d="M156.4,339.5c31.8-2.5,59.4-26.8,80.2-48.5c28.3-29.5,40.5-47,56.1-85.1c14-34.3,20.7-75.6,2.3-111  c-18.1-34.8-55.7-58-90.4-72.3c-11.7-4.8-24.1-8.8-36.8-11.5l-0.9-0.9l-0.6,0.6c-27.7-5.8-56.6-6-82.4,3c-38.8,13.6-64,48.8-66.8,90.3c-3,43.9,17.8,88.3,33.7,128.8c5.3,13.5,10.4,27.1,14.9,40.9C77.5,309.9,111,343,156.4,339.5z" />
                            </svg>
                        </div> */}
                        {/* <img src={require('./Robot head.png')} className="robot" width="200" height="200" alt="Hapi Logo" /> */}

                        <p className="header">HAPI</p>
                        <h2 className="slogan">Your Project Organizantion Solution</h2>
                    </header>
                    <div className="formgrid body-element form-container">
                        <Form className="login-form" onSubmit={this.handleLogin}>
                            <Form.Group>
                                <h3 className="form-header">Sign In</h3><hr />

                                <InputGroup className="mb-3 input">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id="basic-addon1"><img width="15" alt="password symbol" src={require('./EmailIcon.png')}></img></InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control onChange={this.handleFieldChange} type="email"
                                        id="email"
                                        placeholder="Email address"
                                        required="" autoFocus="" />
                                </InputGroup>


                                <InputGroup className="mb-3 input">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id="basic-addon1"><img width="15" alt="password symbol" src={require('./baseline_lock_black_18dp.png')}></img></InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control onChange={this.handleFieldChange} type="password"
                                        id="password"
                                        placeholder="Password"
                                        required="" />
                                </InputGroup>

                                <div className="login-button-container"><hr />

                                    <button className="login-button" variant="light" type="submit">
                                        Login
                                </button>
                                    <Link className="nav-link register-link" to="/Register">Register a New Account</Link>
                                </div>
                            </Form.Group>
                        </Form>
                    </div>
                </div>
            </>
        )
    }

}

export default LogIn